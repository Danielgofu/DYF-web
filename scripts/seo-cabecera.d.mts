// Tipos de scripts/seo-cabecera.mjs (lo importa vite.config.ts).
export interface RutaSeo {
  path: string;
  title: string;
  description: string;
  noindex: boolean;
}
export const SITE_ORIGIN: string;
export const MARCA_INICIO: string;
export const MARCA_FIN: string;
export function leerRutas(): RutaSeo[];
export function archivoDeRuta(path: string): string;
export function urlCanonica(path: string): string;
export function bloqueCabecera(ruta: RutaSeo): string;
export function aplicarBloque(html: string, ruta: RutaSeo): string;
