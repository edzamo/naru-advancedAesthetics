---
name: naru-seguridad
description: Audita el proyecto del sitio de Naru contra el checklist de seguridad de docs/06-seguridad.md (mapeo de OWASP Top 10 para un sitio Jamstack estático). Úsalo antes de cada deploy importante, cuando se agreguen dependencias nuevas, cuando se construya el formulario de reservas de Fase 2, o cuando el usuario pida explícitamente una revisión de seguridad.
---

# naru-seguridad

Corre la parte automatizable del checklist de seguridad de `docs/06-seguridad.md`. No reemplaza las acciones humanas (activar 2FA, poner el repo en privado) — esas se listan al final como recordatorio, no se pueden ejecutar desde código.

## Pasos

### 1. Buscar secretos filtrados
```bash
git log --all -p | grep -iE "(api[_-]?key|secret|token|password|-----BEGIN)" | head -50
grep -rniE "(api[_-]?key|secret|token|password)\s*=\s*['\"][a-z0-9]" --include="*.{js,ts,astro,json,toml,env}" . 2>/dev/null | grep -v "node_modules\|\.env\.example"
```
Si aparece algo real (no un placeholder tipo `YOUR_API_KEY_HERE`), avisar de inmediato al usuario — un secreto commiteado en git history requiere rotarlo, no solo borrarlo del archivo.

### 2. Verificar `.gitignore` cubre lo esencial
Confirmar que existen entradas para: `node_modules/`, `.env` y variantes, `dist/`/`.astro/` (build output). Si falta alguna, agregarla.

### 3. Auditoría de dependencias (una vez exista `site/package.json`)
```bash
cd site && npm audit --audit-level=high
```
Reportar vulnerabilidades altas/críticas. No correr `npm audit fix --force` automáticamente — eso puede romper versiones sin que el usuario lo sepa; proponer el fix y dejar que decida.

### 4. Verificar cabeceras de seguridad
Confirmar que `site/netlify.toml` existe y no fue borrado/debilitado (compara contra las cabeceras documentadas en `docs/06-seguridad.md`: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP).

### 5. Revisar `services.json` en busca de datos que no deberían estar ahí
El catálogo es público (se sirve al cliente). Verificar que no se haya colado ningún dato interno (notas de costo/margen, proveedores, información de clientas) en un campo que termine renderizado en el sitio.

### 6. Si el cambio auditado toca un formulario o función serverless (Fase 2)
Verificar explícitamente:
- Validación de input del lado servidor (no solo del cliente).
- Algún mecanismo anti-spam (honeypot como mínimo).
- Que no se exponga ningún token/credencial en el bundle del cliente (buscar en el código del componente si hay algo que debería ser una env var de servidor y no lo es).

## Reporte

Al terminar, resumir en una lista corta: qué se revisó, qué está bien, qué requiere acción — separando claramente lo que este skill ya corrigió de lo que necesita que el usuario haga manualmente (2FA, visibilidad del repo, rotar un secreto filtrado). Referenciar el checklist de `docs/06-seguridad.md` para lo que quede pendiente.
