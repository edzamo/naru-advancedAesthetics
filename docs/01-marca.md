# Identidad de Marca: Naru Estética Avanzada

Transcripción completa (26/26 diapositivas) del manual de marca original en PDF (`Manual de marca Naru (3).pdf`). **Este documento es ahora la única fuente de verdad de marca** — el PDF y la carpeta `/manual-marca/` ya se eliminaron (2026-09-16) una vez confirmada la migración completa de texto y assets. Ver [`04-desarrollo.md`](./04-desarrollo.md#migración-del-manual-de-marca).

## Esencia

* **Nombre:** Naru Estética Avanzada
* **Origen:** Manta, Ecuador
* **Misión:** Ofrecer servicios de belleza de calidad real con tecnología moderna, atención personalizada y un ambiente cuidado, a un precio justo. Que cada clienta salga sintiéndose la mejor versión de sí misma.
* **Visión:** Ser el studio de referencia en Manta — el lugar al que las mujeres regresan porque confían, recomiendan porque les funciona y eligen porque saben que ahí las cosas se hacen bien.
* **Personalidad de marca:** auténtica, segura, cercana y moderna, pero firme en sus valores. La belleza no debe sentirse inaccesible ni superficial, sino cómoda, honesta y bien cuidada.
* **Tono de comunicación:** seguro y coherente; lenguaje moderno, limpio y accesible. Evita lo excesivamente comercial; prioriza mensajes reales, estéticos y fáciles de conectar. Habla desde la experiencia — profesionalismo + cercanía.

## Historia e introducción (texto original del manual)

> Un studio de belleza nace cuando alguien decide que las cosas se pueden hacer mejor. Mejor trato, mejor resultado, mejor experiencia. Eso es exactamente lo que somos — un espacio creado con intención, donde cada detalle existe por una razón y cada clienta importa desde que entra hasta que sale.
> No somos un salón cualquiera ni un centro de descuentos. Somos el punto medio que siempre faltó: calidad real, ambiente cuidado y un precio que respeta a quien nos elige.

> Todo empezó con una convicción simple: que las mujeres de Manta merecían algo mejor. Con más de cuatro años dedicados al mundo de la belleza, nuestra fundadora conocía el mercado por dentro. Sabía lo que funcionaba, lo que faltaba y lo que las clientas realmente buscaban sin encontrar. Un lugar que combinara calidad, calidez y un precio honesto.
> Con esa claridad construyó el studio. Un espacio donde nada es casualidad — desde el ambiente hasta el trato, desde los productos hasta los resultados.
> *"Quería un lugar del que estar orgullosa. Uno que las clientas recuerden no solo por el resultado, sino por cómo las hicieron sentir."*

Este texto es material de copywriting reutilizable tal cual para la sección "Quiénes somos" del sitio (ver [`02-contenido.md`](./02-contenido.md)).

## Isotipo

Flor de 6 pétalos en apertura (trazo lineal, uniforme, inspirada en una flor en apertura). Representa crecimiento, transformación y cuidado constante. Sus trazos uniformes transmiten precisión y confianza; su simetría refleja una experiencia equilibrada: verse bien, sentirse bien y pagar un precio justo.

El logotipo completo (isotipo + wordmark "NARU estética avanzada") tiene trazo orgánico y expresivo — tipografía fluida con terminaciones suaves que aportan cercanía, calidez y personalidad.

### Construcción y reglas de uso

* **Proporciones:** caja de 82×82px con el isotipo ocupando 45×45px y el wordmark 63×30px (escala de referencia: 100px).
* **Área de seguridad:** el margen de protección mínimo alrededor del logo completo = mitad de la altura del isotipo (8x en la unidad de la grilla del manual).
* **Tamaño mínimo:** 12mm de alto en impresos, 60px de alto en formato digital.
* **Uso correcto:** aplicar siempre las versiones autorizadas de color (positivo sobre fondo oscuro, oscuro sobre fondo claro), respetando tamaño y espaciado — mantiene la percepción unificada como entidad profesional.
* **Usos incorrectos a evitar:**
  1. Aplicar el logo sobre una base de la misma tonalidad (pierde contraste).
  2. Redistribuir isotipo/wordmark fuera de la composición aprobada.
  3. Aplicar sobre fondos fotográficos que entorpezcan la legibilidad.
  4. Distorsionar o estirar el logo.

### Assets

Disponibles hoy en `/manual-marca/` (`1.png`, `2.png`, `3.png` — variantes de color sobre fondo verde oscuro, verde oliva y blanco/gris). Copiados a `site/src/assets/brand/` como parte de la migración (ver `04-desarrollo.md`).

**Pendiente:** el manual solo trae PNG/mockups — falta pedir el paquete de logo en **SVG vectorial**, que es lo que se necesita para producción web nítida en cualquier resolución.

## Paleta de colores

| Color | Hex | Significado |
|---|---|---|
| Verde Botánico Profundo | `#274b1a` | Naturaleza & vida — elegancia y profundidad |
| Terracota Tierra | `#963417` | Origen & cultura |
| Naranja Cálido | `#f8c17a` | Energía & expresión |
| Arena | `#f1efef` * | Calidez y luminosidad |
| Verde Bosque | `#414729` * | Elegancia y profundidad |
| Verde Salvia | `#6f6f4b` * | Equilibrio y tranquilidad |

\* Estos tres no venían como texto en el PDF (a diferencia de los tres primeros, que sí traían el hex explícito) — se obtuvieron **midiendo los píxeles del PDF renderizado** con un script (muestreo de la región de cada swatch de color, altísima consistencia interna: 94-98% de los píxeles muestreados en cada región coincidían exactamente). Son una medición fiable pero no la fuente oficial — si en algún momento se consigue el archivo fuente (Figma/Canva) del manual, confirmar contra esos valores antes de considerarlos 100% definitivos.

Inspirada en Manta: el tono claro evoca la luminosidad de la playa, el verde medio la vegetación, el verde oscuro la profundidad del océano Pacífico.

## Tipografía

* **Familia:** Safira March (display, orgánica, con terminaciones suaves — usada en el wordmark y probablemente títulos).
* Soporta mayúsculas, minúsculas, tildes y Ñ.
* **Pendiente:** el manual no especifica la tipografía de uso para cuerpo de texto (párrafos largos) — Safira March por su estilo expresivo normalmente no se usa en párrafos extensos. Hay que definir una segunda tipografía (sans-serif neutra) para textos de lectura, o confirmar si el manual la define en páginas no revisadas.

## Mockups del manual (nota importante)

El manual incluye renders de empaques de producto (cajas, cremas, tarjetas de presentación) para demostrar la aplicación del logo. **Son mockups genéricos de branding, no fotos reales del local ni de productos que Naru venda** — no deben usarse como contenido real del sitio (ni en "Quiénes somos" ni en el catálogo). Sirven solo como referencia de cómo se ve el logo aplicado a piezas físicas.

## Referencias UI/UX ya recopiladas (del kickoff original)

* [Skin Solutions Medical Aesthetics](https://skinsolutionsaesthetics.com/) — estructura de catálogo por tecnología.
* Atelier Aesthetica / Aurélle MedSpa — diseño minimalista y botánico.
* [TISS Laser Cosmetology Center](https://centrtiss.ru/) — presentación de tratamientos de rejuvenecimiento láser.

El análisis detallado de estas referencias y el sitemap propuesto para Naru viven en [`05-sitio.md`](./05-sitio.md).
