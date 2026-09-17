# Plan de Desarrollo

Cómo se va a construir el sitio, en qué orden, y qué pasa con `/manual-marca/` en el camino. Este documento se actualiza a medida que se completan pasos (marcar checkboxes).

## Orden de construcción

- [x] **Paso 0 — Documentación base.** `docs/00-kickoff.md` a `docs/06-seguridad.md`: visión, marca, contenido, técnico, sitemap, seguridad.
- [x] **Paso 0.5 — Repo conectado.** `git init` local + remoto `origin` apuntando a `https://github.com/edzamo/naru-advancedAesthetics` (repo vacío, confirmado antes de conectar). `.gitignore` creado. Aún sin primer commit/push — se hace cuando el usuario lo apruebe.
- [x] **Paso 1 — Scaffolding del proyecto.** Astro instalado en `site/` (`astro@7`, template minimal, TypeScript strict). `npm install` + `sharp` OK, 0 vulnerabilidades (`npm audit`).
- [x] **Paso 2 — Design tokens y layout base.** `site/src/styles/tokens.css` (paleta 6/6 + tipografía) y `Layout.astro` (header con nav mobile-first tipo hamburguesa, footer) implementados.
- [x] **Paso 3 — Modelo de datos.** `site/src/data/services.json` con el catálogo real (5 categorías, 30 servicios) y `site/src/data/site.json` con datos de contacto reales (WhatsApp, dirección, Instagram, Facebook, mapa). Precios `null` se muestran como "Precio a consultar" — nunca se inventó un valor.
- [x] **Paso 4 — Páginas Fase 1.** Inicio, Nosotros (con el texto real de `01-marca.md`), Catálogo (agrupado por categoría, 30 tarjetas de servicio), Contacto — las 4 verificadas con `npm run build` + servidor dev (`curl`, HTTP 200 en las 4, sin errores).
- [x] **Paso 5 — Skills y agente de mantenimiento.** `.claude/skills/naru-servicio`, `.claude/skills/naru-foto`, `.claude/skills/naru-seguridad` y el agente `.claude/agents/naru-brand-guardian` (creados en paralelo a la documentación, no dependían del scaffolding).
- [ ] **Paso 6 — Conexión a Netlify.** Sitio conectado a Netlify apuntando al repo ya existente, `base directory = site/`, build de verificación, cabeceras de `netlify.toml` validadas.
- [~] **Paso 7 — Carga de contenido real.** Catálogo de servicios cargado (categorías/nombres/descripciones reales). Datos de contacto reales cargados: WhatsApp (`593999723667`), dirección ("Av. 113 y Calle 106, junto a Servientrega, Manta, Manabí"), Instagram y Facebook. **Sigue pendiente:** precios reales (todos `null` salvo 1), fotos reales de cada tratamiento (hoy usan un placeholder de marca, ver nota de diseño abajo), horario de atención.
- [ ] **Paso 8 — QR y lanzamiento Fase 1.** Correr `naru-seguridad` como checklist pre-lanzamiento, luego generar el QR apuntando a la URL de producción.
- [ ] **Paso 9 — Fase 2 (reservas).** CTA de WhatsApp en todas las páginas; si se agrega formulario/función serverless, aplicar los controles de `06-seguridad.md` (validación server-side, rate limiting, honeypot).
- [ ] **Paso 10 — Fase 3 (blog).** Cuando el negocio lo pida, no antes.

## Migración del manual de marca — ✅ completada (2026-09-16)

`/manual-marca/` (PDF + PNGs sueltos) se eliminó del repo. El usuario confirmó explícitamente que todo el contenido útil ya estaba absorbido antes de borrar la carpeta.

| Qué | Estado | Dónde queda |
|---|---|---|
| Texto completo del manual (misión, visión, historia, personalidad, tono, reglas de logo) | ✅ Transcrito | `docs/01-marca.md` |
| Paleta de colores (6/6) | ✅ Transcrita — 3 con hex explícito del PDF + 3 medidos por muestreo de píxeles | `docs/01-marca.md` → se traslada a `site/src/styles/tokens.css` en el Paso 2 |
| Imágenes del logo (3 variantes PNG) | ✅ Copiadas antes de borrar | `site/src/assets/brand/` |
| Logo en SVG vectorial | ⏳ Sigue pendiente — no venía en el manual (solo PNG/mockups), no se pudo recuperar de la carpeta eliminada. Hay que solicitarlo directamente al diseñador. | — |
| Tipografía de cuerpo de texto | ⏳ Pendiente de aprobación — recomendación ya propuesta en `07-diseno-ui.md` (Jost + Work Sans) | — |
| Mockups de producto/tarjetas (no reutilizables como contenido real) | Descritos en texto en `01-marca.md`, no se extrajeron como archivos individuales — no hacía falta, no son assets de uso real en el sitio | — |

**Nota:** el repo aún no tenía ningún commit cuando se borró la carpeta, así que esta eliminación no es recuperable vía git. Fue una decisión explícita del usuario, tomada con el inventario de arriba ya verificado.

## Notas de proceso

* Cada paso de este plan se implementa en un cambio revisable (el usuario ve el diff antes de que se commitee).
* Los skills (`naru-servicio`, `naru-foto`) se documentan y crean ahora mismo, aunque `site/` todavía no sea un proyecto Astro completo — no dependen del scaffolding para existir, solo lo necesitan para tener dónde escribir (`services.json`, `public/images/servicios/`).

## Segunda pasada de diseño: calidez + foto de fondo en el hero (2026-09-16)

El usuario comparó la primera versión rediseñada contra los mockups del manual y contra `clinicamilano.it` — pidió más "vida" en los colores y usar imagen de fondo como esa referencia.

* **Calidez:** se introdujo un color derivado `--color-oro` (`#c27344`, mezcla Terracota/Naranja — no es uno de los 6 hex del manual, documentado como tal) para glows y acentos decorativos. La sección "Por qué elegirnos" pasó de bloque Verde Salvia plano a un degradado cálido (`--color-arena-calida`, derivado Arena/Naranja) — rompe la monotonía de tener 4 secciones seguidas en verde sólido. El placeholder de `ServiceCard` ahora degrada de verde a oro en vez de verde a verde.
* **Hero fotográfico:** se aplicó la misma técnica que usa `clinicamilano.it` (imagen a pantalla completa + `background-size: cover` + degradado oscuro encima para legibilidad). La imagen es el mockup de recepción del manual de marca (pág. 23 del PDF) — un render 3D con el logo real de Naru, **no una foto real del local**. Se optimizó de PNG (6000×3375, ~1MB) a `.webp` 1920px de ancho, 127KB (`site/public/images/hero-recepcion.webp`), con el mismo criterio de compresión ya documentado.
* **Importante — honestidad del contenido:** este render es material de marca (mockup), no una fotografía documental del espacio físico. Se usa como fondo atmosférico del hero, igual que otras marcas usan renders/ilustraciones estilizadas — la sección "Visítanos"/Contacto sigue usando datos reales (mapa de Google Maps real, dirección real) para no generar ninguna confusión sobre cuál es la ubicación real. Si el usuario más adelante tiene fotos reales del local ya construido, esta imagen se reemplaza 1:1.

## Tercera pasada: hero anclado abajo + overlay real de marca (2026-09-16)

El usuario comparó de nuevo contra `clinicamilano.it` y señaló dos cosas concretas: (1) el contenido del hero estaba centrado/arriba en vez de anclado abajo-izquierda como la referencia, y (2) el overlay verde tan oscuro tapaba los tonos cálidos reales de la propia foto de marca (madera, dorado) — por eso "no se relacionaba con la marca" a pesar de ser literalmente la imagen del manual.

* **Layout:** hero pasó a `min-height` grande (78vh mobile / 88vh desktop), contenido con `align-items: flex-end` + texto alineado a la izquierda, igual que la referencia italiana.
* **Overlay:** de un scrim verde uniforme y muy oscuro (0.6–0.88 en toda la imagen) a un degradado liviano arriba / concentrado abajo (0.1–0.85), en tono neutro-cálido en vez de verde saturado — deja ver el logo dorado y la madera reales de la foto, solo oscurece donde hace falta para que el texto se lea.
* **Bug encontrado en el camino:** en mobile, el recorte de `background-size: cover` deja el wordmark "NARU estética avanzada" de la propia foto justo donde cae el `<h1>` — competían visualmente. Se agregó un degradado mobile-only más oscuro (vía `max-width`/mobile-first, con override en `min-width: 768px` para la versión liviana de desktop) para que el texto real gane legibilidad sin tapar la foto por completo.

## Homogeneización de encabezados + hero de Contacto + precio oculto (2026-09-16)

Tres pedidos del usuario en una misma pasada:

1. **Homogeneizar encabezados internos.** Nosotros y Catálogo tenían paddings distintos (uno con descripción, otro sin) y terminaban con alturas diferentes. Se creó `site/src/components/PageHero.astro` — un componente único con `min-height` fijo (280px mobile / 320px desktop) que ambas páginas ahora comparten, con o sin texto de descripción.
2. **Hero fotográfico en Contacto**, inspirado en la sección "Escríbenos/Contáctanos" de `clinicamilano.it` que el usuario mandó de referencia. Se usó el mockup de la tarjeta de presentación del manual (pág. 26 del PDF), optimizado a `.webp` (128KB) en `site/public/images/hero-contacto.webp`. Mismo criterio ya documentado: es un render de marca, no una foto real del local.
3. **"Precio a consultar" eliminado.** El usuario no quiere ver ese texto mientras no haya precios reales — `ServiceCard.astro` ahora omite la línea de precio por completo cuando `precio` es `null`, en vez de mostrar un placeholder de texto.

## Contacto rediseñado: sin formulario, con redes reales (2026-09-16)

Cuarta vuelta sobre Contacto, ahora con la referencia de `clinicamilano.it` bien entendida (su sección "Escríbenos/Contáctanos" con foto de fondo y, en su caso, un formulario con nombre/correo/teléfono). Como Naru no usa correo electrónico para esto, se adaptó la misma estructura visual sin formulario:

* **Ubicación simplificada:** se sacó el iframe de Google Maps embebido (Street View, pesado y poco útil en este contexto) — ahora la dirección es un link directo a `google_maps_link` (el mismo que compartió el usuario), abre Google Maps real en una pestaña nueva con un "Abrir en Google Maps →" visible.
* **Nueva sección "Escríbenos":** segundo mockup de marca (cajas de producto, pág. 24 del PDF) como fondo, mismo tratamiento de foto+overlay que el resto del sitio. En vez de un formulario con campos, tres botones directos: WhatsApp, Instagram, Facebook — apuntando a los links reales de `site.json`. Es cómo la gente realmente contacta al negocio, sin fricción de un formulario que nadie va a llenar.

## Mapa de ubicación (2026-09-16)

El usuario compartió el embed de Google Maps (Street View) y el link corto de la ubicación real del local. Se integró como dato configurable en `site/src/data/site.json` (`google_maps_embed_url`, `google_maps_link`), no hardcodeado en la página — mismo criterio que el resto del contenido. `contacto.astro` lo renderiza en un contenedor responsivo (`aspect-ratio`, 4:3 en mobile → 16:7 en desktop). El propio embed de Google reveló la dirección real ("330 Av. 113, Manta, Manabí"), que se usó para completar el campo `direccion` que estaba pendiente. Se abrió el CSP de `netlify.toml` específicamente con `frame-src https://www.google.com` — ningún otro dominio, siguiendo la regla ya documentada en `06-seguridad.md` de agregar excepciones una por una y explícitas.

## Rediseño visual (2026-09-16)

Primera versión del sitio (hero solo texto, tarjetas con borde de caja) fue rechazada por el usuario — comparada contra `skinsolutionsaesthetics.com` y el propio manual de marca, se veía a nivel wireframe, no de marca. Se rehizo la capa visual completa:

* **Tipografía de display:** Safira March sigue sin archivo (pendiente, ver migración del manual). Mientras tanto se usa **Playfair Display** (Google Fonts) como stand-in editorial — evita el fallback genérico a la fuente serif del sistema, que era buena parte del problema de "se ve barato".
* **Motivo de marca (`FlowerMotif.astro`):** interpretación propia en SVG del isotipo (flor de 6 pétalos), ya que no tenemos el vectorial oficial. Se usa como ornamento — header, hero (marca de agua grande), tarjetas de servicio, cita de "Quiénes somos" y footer — para que la marca esté presente incluso sin fotografía real todavía. **No reemplaza** al logo oficial en contextos donde se necesite la marca exacta.
* **Hero a pantalla completa:** gradiente radial con los verdes reales de marca + el motivo de flor grande de fondo, tipografía grande, CTA dobles (sólido + outline), como el hero de la referencia.
* **Tarjetas de servicio:** se quitó el borde de caja; ahora es una imagen-placeholder con esquinas redondeadas + sombra (gradiente de marca + flor), sin recuadro blanco alrededor — más editorial, menos formulario.
* **Bug de accesibilidad encontrado y corregido en el proceso:** el tagline del footer (Verde Salvia sobre Verde Botánico) daba 1.92:1 de contraste — muy por debajo de WCAG AA. Se corrigió a Arena con opacidad reducida (5.69:1). Se revisaron también los otros usos de Verde Salvia como fondo y se ajustaron a texto de contraste completo donde el texto era pequeño.
* **Verificación:** `npm run build` limpio + capturas de pantalla reales con Playwright (mobile 390px y desktop 1440px) en las 4 páginas, no solo curl/HTML.

## Analítica (GA4), SEO social y tracking de eventos (2026-09-17)

Se implementó la capa de medición a partir de un prompt que el usuario trajo de otra fuente (pensado para HTML plano + Tailwind, no para Astro) — se adaptó al stack real:

* **GA4 apagado por defecto:** el script solo se carga si existe `PUBLIC_GA_MEASUREMENT_ID` (ver `Layout.astro`), para no medir tráfico falso en desarrollo/preview. Falta que el usuario cree la propiedad en analytics.google.com y pase el Measurement ID.
* **CSP actualizada** en `netlify.toml` — sin esto, GA4 quedaba bloqueado en silencio por la política existente (`script-src 'self'` no permitía `googletagmanager.com`).
* **Meta tags SEO + Open Graph + Twitter Card** agregados a `Layout.astro` (título, descripción, imagen, URL canónica) por página, usando los props `title`/`description` que ya existían más un `image` opcional. Imagen de vista previa (`og-default.jpg`) generada del mockup de recepción del manual, en JPG (más compatible con el crawler de WhatsApp que .webp).
* **Tracking de eventos por delegación:** un solo listener en `Layout.astro` (no uno por página) clasifica clics reales según el `href`: `click_whatsapp`, `click_instagram`, `click_facebook`, `click_maps`, `click_ver_catalogo`, `click_reservar`. Se descartó trackear "selección de categoría" del catálogo (lo pedía el prompt original) porque esa función no existe en el sitio — no hay filtro por categoría, se listan todas seguidas.
* **`astro.config.mjs`** con TODO explícito para setear `site: "https://..."` una vez exista dominio — sin esto, `og:url`/canonical caen a `localhost` en el build.
* Nuevo skill `.claude/skills/naru-analytics/` — audita que la implementación esté bien conectada (variable de entorno, CSP, script) y guía dónde mirar cada métrica en el panel de GA4. No tiene acceso a la API de Google, no lee datos en vivo.

## Checklist: deploy → analítica → QR (2026-09-17)

Orden acordado con el usuario. Cada fase depende de que la anterior esté cerrada.

**Fase 1 — Deploy**
- [x] Commit + push del trabajo pendiente a `main` en GitHub (`edzamo/naru-advancedAesthetics`).
- [x] Conectar el repo a Netlify (`app.netlify.com/teams/edzamo13` → proyecto `naru-advanced-aesthetics`).
- [x] Corregir configuración de build en Netlify: **Base directory = `site`**, **Build command = `npm run build`**, **Publish directory = `dist`** — el import inicial había quedado sin estos valores (Netlify publicaba los archivos crudos del repo en vez de compilar el sitio).
- [x] Corregir acceso público: el sitio había quedado con `sso_login: all` (pedía login de Netlify hasta para la página pública, por eso daba 401 a cualquier visitante). Se ajustó a `sso_login_context: non_production` — igual que `edwin-zamora-ec` y `devmentor-ec`: producción pública, deploy previews (de PRs) protegidos con login del team.
- [x] Primer deploy correcto — las 4 páginas cargan en **https://naru-advanced-aesthetics.netlify.app**.
- [x] Confirmado: el team de Netlify (`edzamo13`) tiene un solo miembro (Owner, `edzamo13@gmail.com`) — nadie más puede publicar cambios desde el dashboard.
- [ ] Decidir dominio propio o quedarse con el subdominio gratuito de Netlify por ahora.
- [ ] Si hay dominio propio: conectarlo en Netlify y actualizar `site` en `astro.config.mjs` con la URL real.

**Flujo de trabajo Git (acordado 2026-09-17):** de ahora en adelante, cambios nuevos van en una rama `feat/<nombre-corto>` en vez de directo a `main`. Al abrir un Pull Request contra `main`, Netlify genera automáticamente una Deploy Preview protegida por login del team (gracias al `non_production` de arriba) — se revisa ahí antes de mergear. `main` sigue siendo la rama de producción: todo lo que llega ahí se publica automáticamente y en público. `allowed_branches` en Netlify sigue restringido a `main` (no se generan URLs públicas de ramas sueltas sin PR).

**Fase 2 — Analítica**
- [ ] Usuario crea la propiedad GA4 en analytics.google.com (instrucciones en el skill `naru-analytics` y en el resumen que se le dio en chat).
- [ ] Usuario pasa el Measurement ID (`G-XXXXXXXXXX`).
- [ ] Agregar `PUBLIC_GA_MEASUREMENT_ID` en Netlify (Site settings → Environment variables) y redeploy.
- [ ] Verificar en GA4 → Tiempo real que una visita de prueba aparece.
- [ ] Verificar que los eventos (`click_whatsapp`, etc.) aparecen en GA4 → Eventos después de probarlos a mano.

**Fase 3 — QR y links con UTM**
- [ ] Confirmar destino del QR (Inicio, por defecto acordado) y si va a haber variantes por canal (local / tarjeta / redes).
- [ ] Generar las URLs con UTM una vez exista dominio final.
- [ ] Generar las imágenes de QR (uno por canal) listas para imprimir/publicar.
- [ ] Confirmar en GA4 → Adquisición de tráfico que cada `utm_source` aparece separado.

## Nota sobre las fotos del catálogo (2026-09-16)

El usuario compartió el catálogo real de 30 servicios y autorizó cubrir las fotos faltantes con imágenes de internet mientras tanto. Se optó por **no** hacerlo así — en su lugar, cada `ServiceCard` muestra un placeholder de marca (gradiente Verde Bosque → Verde Salvia con las iniciales del servicio). Motivo: scrapear fotos sueltas de internet para ~30 tratamientos implica (a) riesgo de derechos de autor en un sitio comercial, y (b) rompe la regla ya documentada en `07-diseno-ui.md` de que el catálogo debe verse como un set fotográfico coherente, no imágenes de estilos/calidades distintas. El placeholder es honesto (no pretende ser una foto real) y queda listo para reemplazarse 1:1 por fotos reales vía el skill `naru-foto` en cuanto estén disponibles.
