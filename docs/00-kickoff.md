# Kickoff: Sitio Web Naru Estética Avanzada

Blueprint vivo del proyecto. Versión mejorada del `kickoof.md` original — este documento es el punto de entrada; el resto de decisiones detalladas viven en los documentos hermanos de `/docs`.

**Estado:** en definición. Última actualización: 2026-09-16.

---

## 1. Visión general

Sitio web **mobile-first**, pensado para ser escaneado vía **código QR** en el local físico de Naru (Manta, Ecuador). Debe ser ultrarrápido en redes móviles, liviano (para no saturar el repo Git) y desplegarse en **Netlify** con CI/CD, de forma que el contenido pueda actualizarse sin que la URL cambie — el QR impreso nunca debe quedar obsoleto.

El detalle de marca (misión, visión, paleta, tipografía, tono) vive en [`01-marca.md`](./01-marca.md).

## 2. Alcance del proyecto — enfoque por fases

Se definió construir de forma incremental en vez de todo de una vez. Cada fase es desplegable de forma independiente sobre la misma base técnica.

| Fase | Contenido | Objetivo |
|---|---|---|
| **Fase 1 — MVP** | Landing informativa (inicio, quiénes somos, ubicación/contacto, redes sociales) + Catálogo de servicios (tratamientos, descripciones, precios) | Tener algo real detrás del QR lo antes posible |
| **Fase 2** | Reservas/citas (formulario propio o integración con WhatsApp/Calendly) | Convertir visitas en citas agendadas |
| **Fase 3** | Blog / contenido educativo (cuidado de piel, tratamientos, tips) | SEO orgánico a mediano plazo |

El detalle de páginas, secciones y estructura de contenido de cada fase vive en [`02-contenido.md`](./02-contenido.md). El sitemap y las páginas concretas por fase viven en [`05-sitio.md`](./05-sitio.md). El sistema de diseño UX/UI (color, tipografía, layout, componentes) vive en [`07-diseno-ui.md`](./07-diseno-ui.md).

## 3. Arquitectura técnica

* **Framework:** Astro (elegido por ser ideal para sitios mayormente estáticos, generar HTML mínimo y cargar ultrarrápido en móvil — ver [`03-tecnico.md`](./03-tecnico.md)).
* **Hosting/CI-CD:** Netlify. Cada push a `main` dispara build automático; la URL de producción se mantiene constante para no invalidar el QR físico.
* **Gestión de datos del catálogo:** desacoplada del código — un archivo `services.json` (o colección de contenido de Astro) en vez de hardcodear tratamientos, para poder actualizar precios/servicios sin tocar componentes.

### Gestión ligera de recursos (evitar saturar el repo)

* Prohibido commitear imágenes `.png`/`.jpg` en alta resolución.
* Todo el catálogo usa `.webp` o `.avif` comprimidas, **máx. 150 KB por archivo**.
* Evaluar si las imágenes de producción se sirven desde Git o desde un servicio externo (Cloudinary/Netlify Large Media/similar) — a definir en `03-tecnico.md`.

El plan de construcción paso a paso (y qué pasa con `/manual-marca/` en el camino) vive en [`04-desarrollo.md`](./04-desarrollo.md).

## 4. Recursos y entornos de trabajo

* **Netlify:** `https://app.netlify.com/teams/edzamo13/projects`
* **Repositorio Git:** `https://github.com/edzamo/naru-advancedAesthetics` (conectado como `origin`, aún sin primer push)
* **Google Drive (marca y archivos):** `https://drive.google.com/drive/folders/12c4x10sMav4MFWt2g5H0y9uf9bPu2krX`
* **Manual de marca:** absorbido y transcrito por completo a [`01-marca.md`](./01-marca.md); assets del logo migrados a `site/src/assets/brand/`. La carpeta `/manual-marca/` original ya se eliminó (2026-09-16) — ver historial de decisiones.
* **Referencias UI/UX internacionales:** ver [`01-marca.md`](./01-marca.md#referencias-uiux-ya-recopiladas-del-kickoff-original)
* **Seguridad:** ver [`06-seguridad.md`](./06-seguridad.md) — arquitectura de seguridad y mapeo de OWASP Top 10 para este proyecto.

## 5. Pendientes abiertos (a resolver antes de empezar a construir)

- [ ] Confirmar contenido real: textos, fotos de tratamientos y precios — están dispersos en este workspace / Drive / WhatsApp, falta consolidarlos en `services.json`.
- [ ] Conseguir el logo en formato vectorial (SVG) — el manual solo trae PNG.
- [x] Hex de Arena, Verde Bosque y Verde Salvia — medidos por muestreo de píxeles sobre el PDF renderizado (no venían como texto en el manual): Arena `#f1efef`, Verde Bosque `#414729`, Verde Salvia `#6f6f4b`. Ver `01-marca.md` — recomendable confirmar con el diseñador original antes de darlos por definitivos al 100%.
- [ ] Definir tipografía de cuerpo de texto (Safira March es de display, no para párrafos largos).
- [ ] Definir dominio propio (¿ya existe uno, o se usará el subdominio de Netlify?).
- [ ] Definir método de reservas para la Fase 2 (formulario propio vs. WhatsApp vs. Calendly).
- [ ] SEO/analítica: ¿Google Analytics, Meta Pixel, Google Business Profile ya existen?
- [ ] Decidir visibilidad del repo de GitHub (privado recomendado hasta el lanzamiento — ver `06-seguridad.md`).

---

## Historial de decisiones

* **2026-09-16:** se define stack Astro, alcance por fases (landing+catálogo → reservas → blog), y que el contenido se irá consolidando dentro de este workspace de trabajo.
* **2026-09-16:** se conecta el repo `github.com/edzamo/naru-advancedAesthetics` como `origin` y se define la arquitectura de seguridad (`06-seguridad.md`).
* **2026-09-16:** se elimina `/manual-marca/` (PDF + PNGs originales) al confirmar que todo su contenido útil ya estaba transcrito a `docs/` y sus assets de logo migrados a `site/src/assets/brand/`.
