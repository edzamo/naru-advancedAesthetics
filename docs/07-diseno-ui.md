# Sistema de Diseño UX/UI

Traducción de la identidad de marca (`01-marca.md`) a decisiones de diseño concretas y accionables para construir el sitio. Todo lo que está aquí es lo que `naru-brand-guardian` verifica que se respete.

## Principios de diseño (derivados de la personalidad de marca)

La marca se define como *auténtica, segura, cercana, moderna, pero firme en sus valores* — "la belleza no debe sentirse inaccesible ni superficial, sino cómoda, honesta y bien cuidada". Esto se traduce a:

1. **Espacio en blanco generoso.** Nada de layouts saturados — cada sección respira, como el isotipo de la flor (trazo limpio, simetría, espacio de seguridad alrededor).
2. **Mobile-first real, no adaptado.** El 100% de las visitas llegan desde un QR escaneado con el celular en la mano — se diseña primero para 375-430px de ancho, la versión desktop es la adaptación, no al revés.
3. **Fotografía > ilustración.** Tratamientos reales, ambiente real del local — nunca stock genérico de belleza (evitar el cliché de modelos sonriendo sin contexto).
4. **Precio visible, sin vergüenza.** La misión habla de "precio justo" como diferenciador — los precios del catálogo se muestran claros, no escondidos detrás de un "consultar".
5. **Tono visual cálido-natural, no clínico-frío.** Aunque sea "estética avanzada"/tecnología, la paleta botánica y la tipografía orgánica deben evitar la estética de clínica genérica azul/blanco que usan la mayoría de competidores.

## Color — reglas de uso (no solo la paleta)

| Color | Hex | Rol en la UI |
|---|---|---|
| Verde Botánico Profundo | `#274b1a` | Color primario. Texto principal, header/footer, CTA primario. |
| Arena | `#f1efef` | Fondo base de todo el sitio (no blanco puro — mantiene la calidez del manual). |
| Terracota Tierra | `#963417` | Acento secundario — precios, badges de categoría, hover states. Usar con moderación (10-15% de la superficie visual, no como color dominante). |
| Naranja Cálido | `#f8c17a` | Solo como **fondo** de bloques destacados (ej. tarjeta de servicio "destacado") — nunca como color de texto sobre fondo claro (falla contraste, ver tabla de abajo). |
| Verde Bosque | `#414729` | Alternativa de texto sobre fondos claros cuando se quiere menos contraste que el Verde Botánico (ej. texto secundario/metadatos). |
| Verde Salvia | `#6f6f4b` | Fondos de sección alternos (para separar visualmente secciones de la home sin salir de la paleta) — no usar como texto de cuerpo, contraste límite. |

### Verificación de accesibilidad (WCAG 2.1)

Calculado sobre los hex reales de la marca — combinaciones aprobadas para texto:

| Combinación | Contraste | Uso permitido |
|---|---|---|
| Verde Botánico sobre Arena | 8.70:1 | ✅ Texto de cualquier tamaño |
| Terracota sobre Arena | 6.55:1 | ✅ Texto de cualquier tamaño |
| Verde Bosque sobre Arena | 8.50:1 | ✅ Texto de cualquier tamaño |
| Verde Botánico sobre Naranja Cálido | 6.12:1 | ✅ Texto de cualquier tamaño (para badges/CTA sobre fondo naranja) |
| Verde Salvia sobre Arena | 4.53:1 | ⚠️ Solo texto grande (≥18px bold o ≥24px regular) o elementos de UI — no párrafos de cuerpo |
| Naranja Cálido como texto sobre Arena | — | ❌ No usar — contraste insuficiente, el naranja es solo color de fondo/acento gráfico |

**Regla de oro:** ante la duda, texto de cuerpo siempre en Verde Botánico o Verde Bosque sobre Arena. El Naranja y el Verde Salvia son colores de *soporte*, no de *lectura*.

**Corrección de campo (2026-09-16):** al maquetar la home real, el texto en Arena con opacidad reducida (`opacity: 0.8`) sobre fondo Verde Salvia bajaba a ~3.5:1 — falla WCAG AA para texto normal aunque el par "a máxima opacidad" mida 4.53:1. Regla práctica: **sobre fondo Verde Salvia, el texto va siempre en Arena a opacidad completa (100%)**, nunca atenuado — 4.53:1 ya es un margen ajustado como para encima restarle opacidad.

## Tipografía

* **Display (títulos, wordmark, hero):** Safira March — como define el manual, por su carácter orgánico y distintivo.
* **Cuerpo de texto (recomendación, pendiente de confirmar con el usuario):** una sans-serif humanista, geométrica pero cálida, que no compita con Safira March. Candidatas (todas gratuitas en Google Fonts, con buen soporte de tildes/Ñ):
  1. **Jost** — geométrica con toques Art Déco, dialoga bien con el carácter fluido de Safira March sin sentirse fría.
  2. **Work Sans** — más neutra/segura, excelente legibilidad en pantallas pequeñas (prioridad mobile-first).
  3. **Fraunces (variante sans/soft)** — si se quiere algo con más personalidad, aunque compite un poco más con el display.

  **Recomendación:** Jost para títulos de sección/subtítulos donde se quiere algo de carácter, y Work Sans para párrafos largos (descripciones de tratamientos, "Quiénes somos") donde la legibilidad manda. Queda pendiente de aprobación del usuario antes de fijarlo en `tokens.css`.

* **Escala tipográfica (mobile-first, rem):** `--text-xs: 0.75rem`, `--text-sm: 0.875rem`, `--text-base: 1rem`, `--text-lg: 1.25rem`, `--text-xl: 1.75rem`, `--text-2xl: 2.5rem` (hero, solo desktop — en mobile cae a `--text-xl`).

## Layout y espaciado

* **Grid mobile-first:** columna única, márgenes laterales de 16-20px, máximo 600px de ancho de lectura incluso en desktop para bloques de texto largo.
* **Escala de espaciado (múltiplos de 4px):** `--space-1: 4px` ... `--space-6: 24px`, `--space-8: 32px`, `--space-12: 48px` entre secciones de la home.
* **Breakpoints:** `--bp-sm: 480px` (móviles grandes), `--bp-md: 768px` (tablet), `--bp-lg: 1024px` (desktop) — desktop es la excepción, no el diseño base.

## Componentes clave

* **Header:** logo (variante según fondo — ver reglas de `01-marca.md`) + menú corto (Inicio · Nosotros · Catálogo · Contacto) colapsado a hamburguesa en mobile.
* **Tarjeta de servicio (catálogo):** foto (ratio 4:3, `.webp` optimizada), nombre, precio en Terracota, descripción corta en Verde Bosque, badge de categoría.
* **CTA primario:** botón sólido Verde Botánico con texto Arena, esquinas redondeadas suaves (coherente con el trazo orgánico del isotipo — nunca esquinas 100% rectas ni 100% pill, un punto intermedio ~8px de radio).
* **CTA de WhatsApp (Fase 2):** botón flotante inferior derecho en mobile, ícono + "Reservar por WhatsApp", color Terracota para diferenciarlo del CTA primario.
* **Footer:** fondo Verde Botánico, texto Arena, íconos de redes sociales, ubicación, horario.

## Fotografía y assets visuales

* Fotos reales del local/tratamientos — no se usan los mockups de producto del manual como contenido real (ver nota en `01-marca.md`).
* Tratamiento de imagen: sin filtros agresivos, luz natural, consistente entre todas las fotos del catálogo (mismo estilo de edición) para que el catálogo se vea como un set coherente, no fotos sueltas de distinta calidad.
* El isotipo (flor) puede usarse como elemento decorativo sutil (ej. watermark muy tenue en secciones vacías, o como bullet point en vez de un punto genérico) — sin abusar, sigue siendo un elemento de marca, no un patrón decorativo libre.

## Pendiente de aprobación del usuario

- [ ] Confirmar tipografía de cuerpo (Jost + Work Sans es la recomendación de este documento, no una decisión cerrada).
- [x] Validado el uso de Verde Salvia como fondo de sección alterna — se encontró y corrigió un bug real de contraste en el proceso (ver `04-desarrollo.md`).
