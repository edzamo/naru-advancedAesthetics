---
name: naru-servicio
description: Agrega, edita o elimina servicios/tratamientos en el catálogo del sitio de Naru (site/src/data/services.json) a partir de una instrucción en lenguaje natural. Úsalo cuando el usuario pida agregar un tratamiento nuevo, cambiar un precio, actualizar una descripción, agregar/quitar una categoría, o eliminar/desactivar un servicio.
---

# naru-servicio

Mantiene `site/src/data/services.json` — el catálogo de servicios del sitio de Naru Estética Avanzada — sin que el usuario tenga que editar JSON a mano. El usuario describe el cambio en lenguaje natural; este skill lo traduce a una edición correcta del archivo.

## Esquema de referencia

```json
{
  "categorias": [
    { "id": "facial", "nombre": "Tratamientos Faciales" }
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

Documentado en detalle en `docs/02-contenido.md`.

## Pasos

1. **Ubicar el archivo.** `site/src/data/services.json`. Si no existe todavía (proyecto aún no scaffoldeado), créalo con `{"categorias": [], "servicios": []}` como base antes de aplicar el cambio.
2. **Interpretar la instrucción del usuario:**
   - *Agregar servicio nuevo:* genera un `id` en slug (minúsculas, sin tildes, guiones en vez de espacios) a partir del nombre. Verifica que no exista ya ese `id`. Si el usuario no da todos los campos (duración, descripción), pregúntale solo lo que sea imprescindible para no dejar el catálogo con datos inventados — nunca inventes precios.
   - *Editar servicio existente:* ubícalo por nombre o `id` (búsqueda flexible, tolerante a mayúsculas/tildes). Si hay ambigüedad entre dos servicios parecidos, pregunta cuál antes de tocar nada.
   - *Eliminar servicio:* por defecto, prefiere poner `"activo": false` en vez de borrar la entrada (conserva histórico e imagen asociada). Si el usuario pide explícitamente borrarlo del todo, bórralo y avisa que también puede querer eliminar la imagen asociada en `public/images/servicios/`.
   - *Categoría nueva:* agrégala a `categorias` con un `id` slug antes de asignar servicios a ella.
3. **Validar antes de guardar:**
   - `id` de servicio único.
   - `categoria` referenciada existe en el array `categorias`.
   - `precio` es número, no string.
   - El JSON resultante es válido (formatea con 2 espacios de indentación, igual que el resto del archivo).
4. **Mostrar el diff** del archivo al usuario después de editar, para que lo revise antes de commitear.
5. Si el servicio menciona una foto que todavía no existe en `public/images/servicios/`, dejar el campo `imagen` con el nombre esperado (`{id}.webp`) e informar al usuario que puede agregar la foto con el skill `naru-foto`.

## Qué NO hacer

* No inventar precios, duraciones ni descripciones que el usuario no dio.
* No borrar servicios sin confirmar si el usuario solo pidió "editar" o "desactivar".
* No commitear/pushear automáticamente — solo edita el archivo, el usuario decide cuándo commitear.
