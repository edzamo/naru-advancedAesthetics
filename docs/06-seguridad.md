# Arquitectura de Seguridad

Qué se protege, qué tan expuesto está el sitio realmente, y qué controles concretos se aplican. Escrito para que las decisiones de seguridad sean proporcionales al riesgo real — un sitio Jamstack estático no tiene la misma superficie de ataque que una aplicación con backend, y tratarlo como si la tuviera generaría trabajo innecesario sin agregar protección real.

## Qué estamos protegiendo

1. **La marca y su reputación** — que nadie pueda desfigurar el sitio (*defacement*), suplantar a Naru, o inyectar contenido/enlaces maliciosos que dañen la confianza de las clientas.
2. **La disponibilidad del sitio** — el QR físico del local depende de que la URL siempre resuelva a algo legítimo. Un sitio caído o secuestrado inutiliza el QR impreso.
3. **La integridad del catálogo** — que nadie no autorizado pueda modificar `services.json` (precios, servicios) fuera del flujo controlado por los skills.
4. **Las credenciales de las cuentas de infraestructura** — GitHub, Netlify, y cualquier servicio que se sume después (Google Business, WhatsApp Business API si se automatiza en Fase 2).
5. **Datos de clientas (a futuro)** — en Fase 2, si se implementa un formulario de reservas, cualquier dato que ingrese una clienta (nombre, teléfono) pasa a ser dato personal a proteger.

## Superficie de ataque real, por fase

**Fase 1 (actual) — sitio estático sin backend:** Astro genera HTML/CSS/JS estático, servido por Netlify. No hay base de datos, no hay autenticación de usuarios, no hay lógica de servidor propia. Esto reduce drásticamente la superficie de ataque tradicional (no hay SQL injection posible porque no hay SQL; no hay auth que romper porque no hay login).

**Fase 2 (reservas) — aparece la primera superficie real:** en el momento en que se agregue un formulario (aunque sea uno simple, o una Netlify Function), ahí sí entran en juego validación de inputs, rate limiting y protección anti-spam.

Por eso el mapeo de OWASP de abajo distingue explícitamente qué aplica **hoy** y qué aplica **cuando se construya Fase 2**.

## OWASP Top 10 (2021) aplicado a este proyecto

| # | Categoría | ¿Aplica hoy (Fase 1, sitio estático)? | Mitigación |
|---|---|---|---|
| A01 | Broken Access Control | No hay áreas privadas ni roles todavía. Aplica al **repo** (quién puede escribir en `main`) y a Netlify (quién tiene acceso al equipo/deploy). | Branch protection en `main`, revisar quién tiene acceso al repo de GitHub y al team de Netlify. |
| A02 | Cryptographic Failures | Bajo riesgo — no se manejan datos sensibles en Fase 1. | HTTPS forzado (automático en Netlify), ningún secreto en el repo. |
| A03 | Injection | No aplica en Fase 1 (no hay backend que procese input). **Aplicará en Fase 2** si se agrega un formulario de reservas. | En Fase 2: validar y sanitizar cualquier input de formulario antes de procesarlo, usar la Netlify Function como única puerta de entrada. |
| A04 | Insecure Design | Aplica de forma transversal — ya cubierto por el enfoque de "solo lo que se necesita" (sin backend innecesario, sin admin panel expuesto). | El catálogo se edita vía skills locales de Claude Code, nunca vía un panel web público — elimina toda una clase de riesgo. |
| A05 | Security Misconfiguration | **Sí aplica.** Cabeceras HTTP faltantes, `netlify.toml` mal configurado, o el repo público exponiendo de más. | Cabeceras de seguridad vía `netlify.toml` (ver abajo), revisar visibilidad del repo. |
| A06 | Vulnerable and Outdated Components | **Sí aplica** — cualquier dependencia npm del proyecto Astro. | `npm audit` antes de cada deploy importante, lockfile commiteado, Dependabot activado en GitHub. |
| A07 | Identification and Authentication Failures | No aplica en Fase 1 (no hay login de usuarios finales). Aplica a **las cuentas del equipo** (GitHub, Netlify). | 2FA obligatorio en la cuenta de GitHub y en Netlify. |
| A08 | Software and Data Integrity Failures | Aplica al pipeline de CI/CD. | Solo instalar dependencias de fuentes oficiales (npm registry), revisar el `package-lock.json` en cada PR con cambios de dependencias. |
| A09 | Security Logging and Monitoring Failures | Bajo riesgo en Fase 1. Netlify ya da logs de deploy y de acceso básicos. | Revisar el panel de Netlify periódicamente; en Fase 2, loggear intentos fallidos del formulario de reservas. |
| A10 | Server-Side Request Forgery (SSRF) | No aplica — no hay backend que haga requests salientes en Fase 1. | Reevaluar si Fase 2 integra APIs externas (ej. Calendly, WhatsApp Business API). |

## Controles concretos (Fase 1)

### 1. Gestión de secretos
* Ningún token, API key o credencial se commitea al repo — `.gitignore` ya excluye `.env*`.
* Variables sensibles (si las hay, ej. un token de analítica) se configuran como **environment variables en el panel de Netlify**, nunca hardcodeadas en el código.
* Cuidado especial: en Astro, cualquier variable expuesta al cliente debe llevar el prefijo `PUBLIC_` explícitamente — todo lo demás se queda en build time y no llega al navegador.

### 2. Cabeceras de seguridad HTTP
Plantilla ya creada en `site/netlify.toml` (se activa cuando Netlify conecte ese directorio como `base`): `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `Strict-Transport-Security`.

### 3. Repositorio (`github.com/edzamo/naru-advancedAesthetics`)
* **Recomendación:** mantener el repo **privado** al menos hasta el lanzamiento — contiene el manual de marca completo y (eventualmente) precios reales, que no tienen por qué ser públicos antes de tiempo.
* Activar **branch protection** en `main` cuando haya más de una persona escribiendo al repo (requiere PR + revisión antes de mergear).
* Activar **Dependabot alerts** en la configuración del repo de GitHub.

### 4. Dependencias
* `npm audit` como parte del checklist antes de cada deploy con cambios de dependencias (documentado también en `04-desarrollo.md`).
* Mantener el `package-lock.json` commiteado (reproducibilidad + detección de cambios sospechosos en un PR).

### 5. Protección de marca / anti-scraping básico
* `robots.txt` y metadatos correctos (no evita scraping agresivo, pero desalienta bots básicos e indica claramente qué se puede indexar).
* Marca de agua o atribución en fotos de alta calidad si en algún momento se publican en redes desde el mismo repo — fuera de alcance de la Fase 1, se evalúa si aplica.

## Controles a implementar en Fase 2 (cuando se construya el formulario de reservas)

* Validación de input en servidor (Netlify Function), nunca confiar solo en validación del cliente.
* Rate limiting en el endpoint del formulario (evitar spam/flood).
* Campo honeypot invisible + validación de tiempo mínimo de llenado (anti-bot simple, sin depender de un CAPTCHA que dañe la experiencia mobile).
* Si se almacenan datos de clientas (nombre/teléfono), definir por cuánto tiempo se retienen y quién tiene acceso — mínimo indispensable.

## Checklist de seguridad pre-lanzamiento (Fase 1)

- [ ] Repo configurado como privado (o decisión consciente de hacerlo público).
- [ ] 2FA activado en GitHub y Netlify.
- [ ] `netlify.toml` con cabeceras de seguridad desplegado y verificado (ej. con [securityheaders.com](https://securityheaders.com) una vez el sitio esté en producción).
- [ ] `npm audit` sin vulnerabilidades altas/críticas sin resolver.
- [ ] Ninguna variable sensible hardcodeada — búsqueda final de secretos antes del primer push (`git log -p` y `grep` sobre el working tree).
- [ ] Dependabot activado.

## Herramienta de auditoría

El skill `.claude/skills/naru-seguridad` corre esta lista de verificación bajo demanda — ver su documentación para el detalle de qué revisa automáticamente y qué queda como paso manual (ej. activar 2FA es una acción humana, no automatizable desde el código).
