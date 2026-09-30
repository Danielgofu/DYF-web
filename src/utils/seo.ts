import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import rutas from "../seo/rutas.json";

const SITE_ORIGIN = "https://www.dyfservicios.com";

export interface RutaSeo {
  path: string;
  title: string;
  description: string;
  noindex: boolean;
}

// Fuente única de title/description/noindex: src/seo/rutas.json. La usan estas páginas en el
// navegador y scripts/generar-cabeceras.mjs para escribir el HTML estático de cada ruta.
const RUTAS = rutas as RutaSeo[];

function rutaSeo(path: string): RutaSeo {
  const ruta = RUTAS.find((r) => r.path === path);
  if (!ruta) throw new Error(`usePageMeta: la ruta "${path}" no está en src/seo/rutas.json`);
  return ruta;
}

/** Crea (si falta) o actualiza una etiqueta <meta>/<link> del head; con valor null la elimina. */
function setHeadTag(selector: string, create: () => HTMLElement, attr: string, value: string | null) {
  let el = document.head.querySelector(selector);
  if (value === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", name: string) => () => {
  const el = document.createElement("meta");
  el.setAttribute(key, name);
  return el;
};

/**
 * Aplica en el navegador el head de la ruta indicada ("*" para la página 404).
 * El HTML inicial de cada ruta ya lo trae generado desde el build; esto lo mantiene
 * correcto al navegar entre páginas sin recargar.
 */
export function usePageMeta(path: string) {
  const location = useLocation();
  const { title, description, noindex } = rutaSeo(path);

  useEffect(() => {
    document.title = title;
    setHeadTag('meta[name="description"]', meta("name", "description"), "content", description);
    setHeadTag('meta[name="robots"]', meta("name", "robots"), "content", noindex ? "noindex" : null);

    // Canonical y og:url en minúsculas y sin barra final (React Router no distingue
    // mayúsculas, así que /SERVICIOS muestra la misma página que /servicios). Las páginas
    // noindex (/gracias, 404) no llevan ninguno de los dos.
    const pathname = location.pathname.toLowerCase();
    const canonicalUrl = `${SITE_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;
    const linkCanonical = () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    };
    setHeadTag('link[rel="canonical"]', linkCanonical, "href", noindex ? null : canonicalUrl);
    setHeadTag('meta[property="og:url"]', meta("property", "og:url"), "content", noindex ? null : canonicalUrl);

    setHeadTag('meta[property="og:title"]', meta("property", "og:title"), "content", title);
    setHeadTag('meta[property="og:description"]', meta("property", "og:description"), "content", description);
    setHeadTag('meta[name="twitter:title"]', meta("name", "twitter:title"), "content", title);
    setHeadTag('meta[name="twitter:description"]', meta("name", "twitter:description"), "content", description);
  }, [title, description, noindex, location.pathname]);
}
