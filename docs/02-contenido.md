# Arquitectura de Contenido y Flujo de Trabajo

Cómo se estructura el contenido del sitio y cómo se mantiene actualizado día a día, sin que el dueño del negocio tenga que tocar código ni editar archivos a mano.

## Flujo de trabajo elegido

El catálogo **no lo edita el usuario directamente**. El flujo es conversacional:

1. El usuario le dice a Claude Code (en este mismo workspace) qué servicio agregar/editar/eliminar, o le pasa una foto nueva.
2. Claude usa los **skills** de `.claude/skills/` para aplicar el cambio: edita `services.json` y/o procesa la imagen.
3. El usuario revisa el resultado (`git diff` / preview local) y, cuando está conforme, se hace push → Netlify redeploya automáticamente.

Esto evita pedirle al dueño que aprenda YAML/CSV/JSON — solo describe el cambio en lenguaje natural.

## Modelo de datos: `services.json`

Un único archivo JSON clave-valor como fuente de verdad del catálogo (vive en `site/src/data/services.json`, se lee en build-time por Astro).

```json
{
  "categorias": [
    { "id": "facial", "nombre": "Tratamientos Faciales" },
    { "id": "corporal", "nombre": "Tratamientos Corporales" },
    { "id": "laser", "nombre": "Depilación Láser" }
  ],
  "servicios": [
    {
      "id": "limpieza-facial-profunda",
      "nombre": "Limpieza Facial Profunda",
      "categoria": "facial",
      "precio": 35,
      "moneda": "USD",
      "duracion_min": 60,
      "descripcion": "Texto corto para la tarjeta del catálogo.",
      "imagen": "limpieza-facial-profunda.webp",
      "destacado": false,
      "activo": true
    }
  ]
}
```

* `id`: slug único, se usa también como nombre base de la imagen.
* `activo`: permite ocultar un servicio del sitio sin borrar su historial (útil para promociones de temporada).
* `destacado`: para resaltarlo en la home.
* Categorías inspiradas en la referencia de *Skin Solutions* (catálogo organizado por tecnología/tipo de tratamiento) — ver [`01-marca.md`](./01-marca.md).

## Imágenes de tratamientos

* Carpeta destino: `site/public/images/servicios/`.
* Convención de nombre: `{id-del-servicio}.webp` (coincide con el campo `imagen` del JSON).
* Límite: **150 KB por archivo**, formato `.webp` (o `.avif` si comprime mejor).
* Las fotos originales (pesadas) **no se commitean** — solo entra al repo el resultado ya optimizado.

## Skills de Claude Code para mantenimiento

Se crearán dos skills en `.claude/skills/`:

1. **`naru-servicio`** — agrega, edita o elimina un servicio en `services.json` a partir de una instrucción en lenguaje natural. Valida que el `id` sea único, que la categoría exista, y mantiene el archivo bien formado.
2. **`naru-foto`** — recibe la ruta de una foto original (de cualquier tamaño/formato), la redimensiona y comprime a `.webp` bajo 150 KB, la guarda en `public/images/servicios/` con el nombre correcto, y la enlaza al servicio correspondiente en `services.json`.

El detalle técnico de implementación (librería de procesamiento de imágenes, validaciones) vive en [`03-tecnico.md`](./03-tecnico.md).

## Páginas del sitio (Fase 1 — MVP)

| Página | Contenido | Fuente de datos |
|---|---|---|
| Inicio | Hero con marca, propuesta de valor, destacados (`destacado: true`), CTA a catálogo/contacto | `services.json` (filtrado) + textos fijos |
| Quiénes somos | Historia, misión, visión (ver `01-marca.md`) | Texto fijo en el componente/página |
| Catálogo | Listado de servicios agrupado por categoría, con precio y foto | `services.json` completo |
| Ubicación / Contacto | Mapa, dirección, teléfono/WhatsApp, redes sociales | Texto fijo + config de sitio |

Fase 2 (reservas) y Fase 3 (blog) se detallan cuando se aborden esas fases — no bloquean el MVP.

## Pendientes de este documento

- [ ] Confirmar categorías reales de servicios que ofrece Naru (las de la tabla son un placeholder basado en la referencia de Skin Solutions).
- [ ] Confirmar textos definitivos de "Quiénes somos" (se puede reutilizar la sección *Introducción/Historia* del manual de marca como borrador).
