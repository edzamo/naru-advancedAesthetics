# Redes Sociales — Estrategia de Contenido y Conexión con el Sitio

Cómo Instagram, Facebook y (a futuro) TikTok/Google Reseñas se relacionan con el sitio web. No es documentación técnica del código — es la decisión de negocio detrás de por qué la sección "Contacto" del sitio está estructurada como está. Acordado con el usuario el 2026-09-17.

## El problema que resuelve

Antes de esto, la sección "¿Por dónde prefieres escribirnos?" de `/contacto` trataba WhatsApp, Instagram y Facebook como el mismo tipo de link — un ícono, sin ninguna razón para hacer clic más allá de "está ahí". Eso funciona para WhatsApp (la gente ya sabe para qué es: escribir). No funciona para Instagram/Facebook, porque ahí la persona no va a "resolver un trámite", va a "ver contenido" — y si no hay una razón concreta para verlo, no hace clic.

## Principio: separar utilidad de descubrimiento

- **Utilidad** (WhatsApp, Google Maps): la persona ya sabe qué quiere (agendar, llegar). El link solo tiene que ser fácil de encontrar.
- **Descubrimiento** (Instagram, Facebook, TikTok, Google Reseñas): la persona no tiene una necesidad puntual todavía — hay que darle una razón. Cada red necesita su propia promesa corta, no alcanza con el ícono.

## Rol de cada canal

| Canal | Qué muestra | Por qué seguirlo (la frase que va en el sitio) |
|---|---|---|
| **Instagram** | Portafolio real: antes/después, procesos de tratamientos | "Mirá los resultados reales de nuestras clientas" — es el lugar donde SÍ hay evidencia visual, algo que el sitio todavía no tiene (las fotos de tratamientos siguen siendo el placeholder de marca hasta que haya fotos reales vía `naru-foto`) |
| **Facebook** | Comunidad, promociones, avisos locales | Audiencia más local/recomendación de barrio — funciona mejor para promos y reseñas que para portafolio visual puro |
| **Google Reseñas** | Prueba social de terceros, no controlada por la marca | Pesa más que Instagram/Facebook en la decisión de agendar de alguien que todavía no conoce a Naru. Pendiente: obtener el link directo de reseña (Place ID) — hoy el código ya tiene el lugar reservado (`googleReviewsHref` en `contacto.astro`), oculto hasta tener el link correcto |
| **TikTok** (futuro) | Detrás de cámara, contenido de proceso en video | Mismo criterio que Instagram — no agregar el ícono hasta tener una promesa concreta de qué se va a ver ahí |

## Puente Catálogo → Instagram

Una vez que existan fotos reales de tratamientos, la recomendación es agregar un link chico debajo de cada categoría del catálogo (`/catalogo`) tipo "Mirá más resultados en Instagram →", apuntando al perfil. El catálogo del sitio explica el tratamiento en texto; Instagram muestra el resultado. Son complementarios, no compiten — el sitio empuja tráfico a la red en vez de intentar reemplazarla.

## Por qué esto no es un skill

Se evaluó documentar esto como un skill de Claude Code (`.claude/skills/`) y se descartó: los skills de este proyecto son procedimientos que se **ejecutan** (cargar un servicio al catálogo, optimizar una foto, auditar seguridad). Esto es una decisión de **contenido/estrategia** del dueño del negocio, no un procedimiento repetible con pasos técnicos. Vive mejor como documentación de referencia.

Sobre la preocupación de que un competidor "copie" esta estrategia: no aplica acá. La estrategia en sí (fotos de antes/después en Instagram, reseñas de Google como prueba social, etc.) es práctica estándar de la industria de estética — cualquier competidor la puede inferir con solo mirar tu perfil de Instagram una vez implementada, sin necesitar ver este documento. Lo que sí sería sensible (precios de proveedores, montos de pauta paga, datos de clientas) no está ni va a estar documentado acá.
