export function formatPrecio(precio: number | null, moneda: string): string {
	if (precio === null || precio === undefined) return "Precio a consultar";
	return `${moneda} $${precio}`;
}

/** Iniciales para el placeholder visual mientras no hay foto real del servicio. */
export function iniciales(nombre: string): string {
	return nombre
		.split(/\s+/)
		.filter((w) => w.length > 0)
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();
}
