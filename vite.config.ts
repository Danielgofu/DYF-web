import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';
import {aplicarBloque, leerRutas} from './scripts/seo-cabecera.mjs';

// Escribe en index.html la cabecera SEO de la portada (title, description, canonical,
// og:*, twitter:*) desde src/seo/rutas.json, en desarrollo y en el build.
function cabeceraPortada(): Plugin {
  return {
    name: 'dyf-cabecera-portada',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const portada = leerRutas().find((r) => r.path === '/');
        if (!portada) throw new Error('src/seo/rutas.json no tiene la ruta "/"');
        return aplicarBloque(html, portada);
      },
    },
  };
}

// Precarga la fuente del texto principal (Manrope, subconjunto latino): sin ella el
// navegador no la pide hasta tener el CSS y el DOM. Medido: FCP y LCP ~0,15 s antes en
// móvil. Solo Manrope: precargar también Space Grotesk e Inter empeoraba FCP y LCP.
function precargaFuentePrincipal(): Plugin {
  return {
    name: 'dyf-precarga-fuente',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const fuente = Object.keys(ctx.bundle ?? {}).find((f) => /\/manrope-latin-wght-normal-[\w-]+\.woff2$/.test(f));
        if (!fuente) throw new Error('No se encuentra la fuente manrope-latin-wght-normal en el bundle');
        return [{tag: 'link', attrs: {rel: 'preload', href: `/${fuente}`, as: 'font', type: 'font/woff2', crossorigin: ''}, injectTo: 'head-prepend'}];
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cabeceraPortada(), precargaFuentePrincipal()],
  // El manifiesto lo usa scripts/generar-cabeceras.mjs para precargar el chunk de cada
  // página en su .html; el propio script lo borra de dist/ después.
  build: {
    manifest: true,
    // Las fuentes nunca se incrustan en el CSS como data: (Vite lo hace con los archivos de
    // menos de 4 KB, p. ej. el subconjunto cirílico de Manrope). Chrome carga las fuentes data:
    // aunque la página no use esos caracteres, y la CSP (font-src 'self') las bloquearía.
    assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
  },
});
