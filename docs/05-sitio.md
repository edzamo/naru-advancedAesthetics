# Estructura del Sitio (Sitemap)

Propuesta de arquitectura de navegación, construida a partir de las dos referencias UI/UX que se pasaron en el kickoff original, adaptadas al enfoque por fases definido en [`00-kickoff.md`](./00-kickoff.md).

## Lo que se rescató de las referencias

**[Skin Solutions Aesthetics](https://skinsolutionsaesthetics.com/)**
* Menú corto y claro: Home · About · Services · Book Online · Prices · Contact.
* Servicios agrupados en categorías amplias (cosmetic / esthetician / skincare) y luego por tratamiento específico.
* Home con galería de antes/después y CTA directo a reservar.

**[TISS Laser Cosmetology Center](https://centrtiss.ru/)**
* Servicios organizados tanto por categoría de tecnología (láser, corrección corporal, inyectables) como por problema a resolver (acné, celulitis, rejuvenecimiento) — dos formas de navegar el mismo catálogo.
* Reservas vía canal de mensajería directa (Telegram en su caso) en vez de un formulario propio.
* Home con sección de "ventajas" (equipos, especialistas) y testimonios.

**Adaptación para Naru:** catálogo agrupado por categoría de tratamiento (como Skin Solutions, más simple para el volumen inicial de servicios), reservas vía **WhatsApp** en vez de formulario propio (más natural para el contexto de Manta, Ecuador — equivalente local al Telegram de TISS), y un bloque de "por qué elegirnos" en la home inspirado en la sección de ventajas de TISS.

## Sitemap por fase

### Fase 1 — MVP (landing + catálogo)

```
/                    Inicio
├── /nosotros         Quiénes somos (historia, misión, visión — texto ya disponible en 01-marca.md)
├── /catalogo          Catálogo de servicios, agrupado por categoría
│   └── /catalogo/[categoria]   (opcional si el volumen de servicios lo justifica)
└── /contacto          Ubicación, horario, WhatsApp, redes sociales
```

**Secciones de la home (inspiradas en las referencias):**
1. Hero — logo, propuesta de valor ("calidad real, precio justo"), CTA a catálogo/WhatsApp.
2. Servicios destacados (`destacado: true` en `services.json`).
3. "Por qué elegirnos" — 3-4 puntos cortos (tecnología moderna, atención personalizada, ambiente cuidado, precio justo) tomados de la misión/personalidad de marca.
4. Extracto de "Quiénes somos" con CTA a la página completa.
5. Ubicación + CTA de contacto por WhatsApp.

### Fase 2 — Reservas

* Botón/CTA de "Reservar" presente en toda página (header o flotante), enlazando a WhatsApp con mensaje prellenado (`https://wa.me/<numero>?text=...`).
* Si el volumen lo justifica más adelante: página `/reservar` con integración a Calendly o similar — no bloquea el MVP.

### Fase 3 — Blog / contenido educativo

```
/blog                 Índice de artículos
└── /blog/[slug]       Artículo individual
```

* Fin: SEO orgánico (cuidado de piel, explicación de tratamientos, tips) — se aborda una vez que el catálogo y las reservas ya estén funcionando.

## Notas de navegación

* Menú principal (Fase 1): **Inicio · Nosotros · Catálogo · Contacto** — corto, como Skin Solutions, para no sobrecargar la experiencia mobile-first vía QR.
* El QR físico del local debe apuntar a `/` (home) — desde ahí, dos taps máximo a cualquier sección clave (catálogo o WhatsApp).
