---
name: naru-deploy
description: Aplica el flujo de Git acordado para publicar cambios en el sitio de Naru — rama feature, nunca directo a main. Úsalo cada vez que un cambio de código (páginas, componentes, estilos, datos) esté listo para guardarse/subirse, o cuando el usuario pida "publicá esto", "subilo", "hagamos deploy" o similar.
---

# naru-deploy

Naru se publica solo. Cada push a `main` en GitHub dispara un deploy automático a producción en Netlify (`naru-advanced-aesthetics.netlify.app`, público). Por eso **nunca se commitea directo a `main`** — el dueño del proyecto tiene que poder revisar un preview antes de que algo llegue a la web pública. Acordado el 2026-09-17, ver `docs/04-desarrollo.md`.

## Flujo

1. **Rama nueva desde `main` actualizado:**
   ```bash
   git checkout main && git pull
   git checkout -b feat/<nombre-corto-del-cambio>
   ```
   Nombre de rama descriptivo y corto (ej. `feat/precios-catalogo`, `feat/hero-contacto`), no genérico tipo `feat/cambios`.

2. **Commit** con mensaje que explique el *por qué*, no solo el qué (mismo criterio que cualquier commit de este proyecto). Cerrar con la línea de atribución que use la sesión actual.

3. **Push de la rama:**
   ```bash
   git push -u origin feat/<nombre-corto-del-cambio>
   ```
   GitHub devuelve un link para abrir el Pull Request — dárselo al usuario tal cual, no inventar la URL.

4. **Avisar al usuario:**
   - El link del PR.
   - Que Netlify va a generar automáticamente una Deploy Preview de esa rama, protegida con su login de equipo (no es pública — solo él puede verla, por el `sso_login_context: non_production` configurado en Netlify).
   - Que el merge a `main` lo aprueba él — no mergear por cuenta propia salvo que lo pida explícitamente.

5. **Volver a `main` localmente** (`git checkout main`) para dejar el working tree limpio mientras se espera el merge.

## Cuándo NO aplica

- Cambios que el usuario pide explícitamente que vayan directo a `main` (excepción, no default).
- Documentación pura que no afecta el sitio publicado (a criterio — si hay duda, aplicar igual el flujo, es más seguro).
- Auditorías/lecturas (`naru-seguridad`, `naru-analytics`) que no modifican archivos.

## Relación con otros skills

Este skill es el paso final después de `naru-servicio`, `naru-foto`, o cualquier edición manual de código — una vez que el cambio está listo para guardarse, se aplica este flujo en vez de commitear directo.
