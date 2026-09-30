import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_ORIGIN = "https://www.dyfservicios.com";

export function usePageMeta(title: string, description: string, options: { noindex?: boolean } = {}) {
  const location = useLocation();
  const { noindex = false } = options;

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex");
    } else if (robots) {
      robots.remove();
    }
  }, [noindex]);

  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Canonical: index.html no lo trae (se sirve igual para todas las rutas), así que se
    // crea aquí con la URL propia de cada ruta. Las páginas noindex (/gracias, 404) no
    // llevan canonical: no deben proponerse como URL de referencia de nada.
    const canonicalUrl = `${SITE_ORIGIN}${location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "")}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (noindex) {
      canonicalLink?.remove();
    } else {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    // Open Graph / Twitter: solo lo ven herramientas que ejecutan JavaScript; las
    // previsualizaciones de WhatsApp, Facebook o LinkedIn leen los valores de index.html.
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", description);
  }, [title, description, location.pathname, noindex]);
}
