---
name: naru-analytics
description: Audita y explica la configuración de Google Analytics 4 (GA4) del sitio de Naru — verifica que el script esté bien conectado, que el CSP lo permita, y lista dónde ver cada métrica en el panel de GA4. Úsalo cuando el usuario pregunte cómo ver las visitas/métricas, pida agregar un nuevo evento de tracking, quiera confirmar que la analítica está funcionando antes o después de un deploy, o pregunte por el rendimiento de los links con UTM (QR, redes sociales).
---

# naru-analytics

GA4 en este sitio se activa solo si existe la variable de entorno `PUBLIC_GA_MEASUREMENT_ID` (ver `site/src/layouts/Layout.astro`). Sin esa variable no se carga ningún script — es intencional, para no medir tráfico falso en desarrollo. Este skill no tiene acceso a la API de Google Analytics (no hay credenciales configuradas); su trabajo es auditar que la implementación en el código esté correcta y guiar al usuario a dónde mirar los datos reales en el panel de GA4.

## Pasos de auditoría

### 1. Confirmar que el ID está configurado
```bash
# Local:
grep -q "PUBLIC_GA_MEASUREMENT_ID" site/.env 2>/dev/null && echo "configurado en .env local" || echo "falta en .env local (o no existe .env)"
```
En producción (Netlify) esto se revisa en el dashboard: **Site settings → Environment variables → `PUBLIC_GA_MEASUREMENT_ID`**. No se puede leer desde acá — pedirle confirmación al usuario si hace falta.

### 2. Confirmar que el script está bien conectado
```bash
grep -n "gaId\|googletagmanager" site/src/layouts/Layout.astro
```
Debe existir el `<script>` condicional (`{gaId && (...)}`) que carga `gtag.js` y llama `gtag("config", gaId)`.

### 3. Confirmar que la CSP no lo bloquea
```bash
grep -n "googletagmanager\|google-analytics" site/netlify.toml
```
Si falta `googletagmanager.com` en `script-src` o `google-analytics.com` en `connect-src`, el navegador bloquea GA4 en silencio (sin error visible) — hay que agregarlo a la línea `Content-Security-Policy` de `site/netlify.toml`.

### 4. Listar los eventos personalizados activos
```bash
grep -A2 'gtag("event"' site/src/layouts/Layout.astro
```
Eventos actuales y qué significan:
- `click_whatsapp` — clic en cualquier link `wa.me` (Contacto).
- `click_instagram` / `click_facebook` — clic en los íconos de redes de Contacto.
- `click_maps` — clic en "Ubicación Google Maps".
- `click_ver_catalogo` / `click_reservar` — clics en los botones CTA de Inicio.

Para agregar un evento nuevo: sumar un `else if` en el listener delegado de `Layout.astro` (busca `document.addEventListener("click"`), no hace falta tocar cada página.

## Dónde ver los datos en GA4 (guiar al usuario, no se puede automatizar)

- **Tiempo real** (¿está funcionando ahora mismo?): GA4 → Informes → Tiempo real. Útil justo después de un deploy: abrir el sitio en el celular y confirmar que aparece una visita.
- **Origen del tráfico (QR vs. redes vs. directo)**: GA4 → Informes → Ciclo de vida → Adquisición → Adquisición de tráfico. Ahí se filtra por `Source / Medium` — así se distingue `qr_local / print` de `instagram / social` etc. (ver la tabla de links con UTM en `docs/04-desarrollo.md`).
- **Eventos de conversión** (WhatsApp, catálogo, reservar): GA4 → Informes → Ciclo de vida → Interacción → Eventos.
- **Reporte por campaña específica**: GA4 → Anuncios → Todas las campañas (lee `utm_campaign`).

## Qué NO hace este skill

No crea la propiedad de GA4 (eso requiere una cuenta de Google del negocio, se hace una sola vez en analytics.google.com). No lee métricas en vivo ni genera reportes con números reales — no hay integración con la API de Google Analytics en este proyecto.
