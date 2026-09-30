// Bloque de cabecera SEO por ruta. Lo usan:
//  - vite.config.ts (plugin) para escribir la cabecera de la portada en index.html,
//    tanto en `npm run dev` como en `vite build`;
//  - scripts/generar-cabeceras.mjs para escribir un .html por ruta tras el build.
// Así el formato de las etiquetas vive en un solo sitio y los textos en src/seo/rutas.json.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const SITE_ORIGIN = "https://www.dyfservicios.com";
export const MARCA_INICIO = "<!-- seo:inicio -->";
export const MARCA_FIN = "<!-- seo:fin -->";

export function leerRutas() {
  const url = new URL("../src/seo/rutas.json", import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8"));
}

/** "/" -> "index.html", "/servicios" -> "servicios.html", "*" (404) -> "404.html" */
export function archivoDeRuta(path) {
  if (path === "/") return "index.html";
  if (path === "*") return "404.html";
  return `${path.replace(/^\//, "")}.html`;
}

export function urlCanonica(path) {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path.toLowerCase()}`;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Etiquetas del head que cambian por ruta. Las páginas noindex no llevan canonical ni og:url. */
export function bloqueCabecera(ruta) {
  const url = urlCanonica(ruta.path);
  const lineas = [
    `<title>${esc(ruta.title)}</title>`,
    `<meta name="description" content="${esc(ruta.description)}" />`,
    ...(ruta.noindex
      ? [`<meta name="robots" content="noindex" />`]
      : [`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`]),
    `<meta property="og:title" content="${esc(ruta.title)}" />`,
    `<meta property="og:description" content="${esc(ruta.description)}" />`,
    `<meta name="twitter:title" content="${esc(ruta.title)}" />`,
    `<meta name="twitter:description" content="${esc(ruta.description)}" />`,
  ];
  return lineas.join("\n    ");
}

/** Sustituye lo que haya entre las marcas seo:inicio / seo:fin por el bloque de la ruta. */
export function aplicarBloque(html, ruta) {
  const i = html.indexOf(MARCA_INICIO);
  const f = html.indexOf(MARCA_FIN);
  if (i === -1 || f === -1 || f < i || html.indexOf(MARCA_INICIO, i + 1) !== -1) {
    throw new Error("index.html debe contener una sola pareja de marcas <!-- seo:inicio --> / <!-- seo:fin -->");
  }
  return `${html.slice(0, i + MARCA_INICIO.length)}\n    ${bloqueCabecera(ruta)}\n    ${html.slice(f)}`;
}
