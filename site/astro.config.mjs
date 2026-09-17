// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO: una vez que el dominio esté conectado en Netlify, poner acá la URL real
	// (ej. "https://naruesteticaavanzada.com"). Sin esto, las meta og:url/og:image y el
	// <link rel="canonical"> usan localhost en vez del dominio real — no rompe nada en
	// local, pero hay que setearlo antes de generar el QR/compartir el link en redes.
	// site: "https://tu-dominio.com",
});
