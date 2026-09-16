---
name: naru-foto
description: Optimiza una foto de un tratamiento de Naru (cualquier tamaño/formato original) a .webp comprimido bajo 150KB, la guarda en site/public/images/servicios/ con el nombre correcto, y la enlaza al servicio correspondiente en services.json. Úsalo cuando el usuario pase o mencione una foto para subir al catálogo.
---

# naru-foto

Convierte una foto pesada en un asset liviano listo para el sitio, siguiendo la regla de `docs/02-contenido.md` y `docs/03-tecnico.md`: **`.webp`, máximo 150 KB por archivo**, en `site/public/images/servicios/`.

## Cuándo usarlo

El usuario menciona o adjunta una foto de un tratamiento y quiere que quede disponible en el catálogo — ej. "sube esta foto para el servicio de limpieza facial".

## Pasos

1. **Identificar la imagen original** (ruta que dio el usuario) y a qué servicio corresponde (por nombre o `id` en `site/src/data/services.json`). Si el servicio no existe todavía en el catálogo, avisa y ofrece crearlo primero con el skill `naru-servicio`.
2. **Verificar que `sharp-cli` esté disponible** para la conversión:
   ```bash
   npx --yes sharp-cli --version
   ```
   Si el comando o sus flags no responden como se espera, correr `npx --yes sharp-cli --help` para confirmar la sintaxis exacta antes de continuar (las versiones cambian flags con el tiempo).
3. **Redimensionar + convertir a webp**, ancho máximo 1200px (catálogo web, no necesita más resolución), manteniendo proporción:
   ```bash
   npx --yes sharp-cli -i "<ruta-original>" -o /tmp/naru-foto-tmp.webp resize 1200 --withoutEnlargement
   ```
4. **Comprimir iterativamente hasta quedar bajo 150 KB.** Empezar en calidad ~80 y bajar de a 10 puntos (mínimo razonable: 40 — si a esa calidad sigue pesando más de 150KB, avisar al usuario en vez de seguir degradando la imagen sin sentido):
   ```bash
   for q in 80 70 60 50 40; do
     npx --yes sharp-cli -i "<ruta-original>" -o /tmp/naru-foto-tmp.webp resize 1200 --withoutEnlargement -- toFormat webp -q $q
     size=$(stat -f%z /tmp/naru-foto-tmp.webp 2>/dev/null || stat -c%s /tmp/naru-foto-tmp.webp)
     echo "calidad $q -> $size bytes"
     if [ "$size" -le 153600 ]; then break; fi
   done
   ```
   (153600 bytes = 150 KB. Ajustar el comando de `toFormat`/`-q` según lo que confirme `--help` en el paso 2 si difiere.)
5. **Guardar en destino final** con el nombre correcto (slug del servicio, coincide con el campo `imagen` esperado):
   ```bash
   mkdir -p site/public/images/servicios
   mv /tmp/naru-foto-tmp.webp "site/public/images/servicios/<id-del-servicio>.webp"
   ```
6. **Actualizar `services.json`** si el campo `imagen` del servicio no apuntaba ya a `<id-del-servicio>.webp` (usar la lógica del skill `naru-servicio` para esta edición puntual).
7. **Confirmar al usuario:** tamaño final del archivo, calidad usada, y ruta donde quedó.

## Qué NO hacer

* No commitear imágenes originales pesadas al repo — solo el resultado ya optimizado.
* No subir el archivo si después de bajar a calidad 40 sigue por encima de 150KB con el ancho de 1200px — en ese caso, probar reducir el ancho (ej. 900px) antes de forzar más la compresión, y avisar al usuario del trade-off de calidad visual.
* No sobreescribir una foto existente de otro servicio por error de nombre — confirmar el `id` del servicio antes de guardar.
