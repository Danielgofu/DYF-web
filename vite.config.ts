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

export default defineConfig({
  plugins: [react(), tailwindcss(), cabeceraPortada()],
});
