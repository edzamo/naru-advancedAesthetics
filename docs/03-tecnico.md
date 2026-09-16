# Arquitectura Técnica

Decisiones de stack, estructura de carpetas del código y automatizaciones de mantenimiento.

## Stack

* **Framework:** [Astro](https://astro.build) — genera HTML estático por defecto, envía cero (o mínimo) JavaScript al cliente salvo donde se pida explícitamente ("islas"). Ideal para el objetivo mobile-first vía QR.
* **Hosting/CI-CD:** Netlify, build automático en cada push a `main`.
* **Imágenes:** `sharp` (Node) para el pipeline de optimización — estándar del ecosistema Astro, usado también internamente por `astro:assets`.
* **Datos del catálogo:** `services.json` estático, leído en build time (ver [`02-contenido.md`](./02-contenido.md)).

## Estructura de carpetas del sitio (`site/`)

```
site/
├── src/
│   ├── components/        # componentes reutilizables (Card de servicio, Header, Footer...)
│   ├── data/
│   │   └── services.json  # fuente de verdad del catálogo
│   ├── layouts/           # layout base (head, fuentes, colores de marca)
│   ├── pages/
│   │   ├── index.astro           # Inicio
│   │   ├── nosotros.astro        # Quiénes somos
│   │   ├── catalogo.astro        # Catálogo de servicios
│   │   └── contacto.astro        # Ubicación / Contacto
│   └── styles/
│       └── tokens.css     # variables CSS de marca (colores, tipografía)
├── public/
│   └── images/
│       └── servicios/     # fotos ya optimizadas (.webp, <150KB) — servidas tal cual
├── astro.config.mjs
└── package.json
```

## Design tokens (borrador, a partir de `01-marca.md`)

```css
:root {
  --color-verde-botanico: #274b1a;
  --color-terracota: #963417;
  --color-naranja: #f8c17a;
  --color-arena: #f1efef;        /* medido por muestreo de píxeles, ver 01-marca.md */
  --color-verde-bosque: #414729; /* medido por muestreo de píxeles, ver 01-marca.md */
  --color-verde-salvia: #6f6f4b; /* medido por muestreo de píxeles, ver 01-marca.md */

  --font-display: "Safira March", serif; /* títulos, wordmark */
  --font-body: /* pendiente: definir tipografía de párrafo */;
}
```

## Automatizaciones (`.claude/skills/`)

Dos skills locales al proyecto, para que el mantenimiento del catálogo no requiera tocar código a mano:

### `naru-servicio`
* **Entrada:** instrucción en lenguaje natural ("agrega un servicio de depilación láser en piernas a $45", "sube el precio de X a $40", "elimina el servicio Y").
* **Acción:** edita `site/src/data/services.json` respetando el esquema (slug único, categoría válida), sin romper el JSON.
* **Salida:** diff del archivo para que el usuario lo revise antes de commitear.

### `naru-foto`
* **Entrada:** ruta de una imagen original (cualquier tamaño/formato) + a qué servicio corresponde.
* **Acción:** corre un script Node con `sharp` que:
  1. Redimensiona a un ancho máximo razonable para catálogo web (ej. 1200px).
  2. Convierte a `.webp` con compresión iterativa hasta quedar bajo 150 KB.
  3. Guarda el resultado en `site/public/images/servicios/{id}.webp`.
  4. Actualiza el campo `imagen` del servicio correspondiente en `services.json`.
* **Salida:** confirma tamaño final del archivo generado.

## Flujo Git / Netlify

1. Repo Git único (aún no inicializado en este workspace — **pendiente**: correr `git init` cuando se arranque a construir).
2. Conectado a Netlify: cada `git push origin main` dispara un build.
3. La URL de producción permanece fija → el QR físico nunca se invalida.
4. Reglas de repo liviano: sin imágenes pesadas commiteadas (ver `02-contenido.md`), catálogo desacoplado del código vía `services.json`.

## Pendientes de este documento

- [ ] Definir el ancho máximo de imagen (1200px es un valor por defecto razonable para catálogo, a confirmar).
- [ ] Decidir si el repo se sube a GitHub/GitLab antes o después de conectar Netlify.
- [ ] Definir dominio propio para producción (o usar subdominio `*.netlify.app` en el QR inicialmente).
