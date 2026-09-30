// Se ejecuta tras `vite build` (ver "build" en package.json). Sin dependencias.
//
// 1. Comprueba que las rutas coinciden EXACTAMENTE en las cuatro fuentes:
//      src/App.tsx (<Route path>), src/seo/rutas.json, public/.htaccess (reescrituras y 301 de
//      barra final) y public/sitemap.xml (solo las indexables: sin /gracias ni la 404).
//    Si no coinciden, el build falla (código de salida 1).
// 2. A partir de dist/index.html genera un .html por ruta con su cabecera propia (title,
//    description, canonical/og:url o robots noindex, og:*, twitter:*): servicios.html,
//    gracias.html, 404.html... y reescribe la de la portada en index.html.
// 3. Verifica los archivos generados.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { aplicarBloque, archivoDeRuta, leerRutas, urlCanonica } from "./seo-cabecera.mjs";

const raiz = (rel) => fileURLToPath(new URL(`../${rel}`, import.meta.url));
const leer = (rel) => readFileSync(raiz(rel), "utf8");

const errores = [];
const fallar = (msg) => errores.push(msg);
const ordenar = (conjunto) => [...conjunto].sort();

function compararConjuntos(nombreA, a, nombreB, b) {
  const soloA = ordenar(a).filter((x) => !b.has(x));
  const soloB = ordenar(b).filter((x) => !a.has(x));
  if (soloA.length || soloB.length) {
    fallar(
      `Las rutas de ${nombreA} y ${nombreB} no coinciden.` +
        (soloA.length ? `\n     solo en ${nombreA}: ${soloA.join(", ")}` : "") +
        (soloB.length ? `\n     solo en ${nombreB}: ${soloB.join(", ")}` : ""),
    );
  }
}

function contarDuplicados(nombre, lista) {
  const vistos = new Set();
  for (const x of lista) {
    if (vistos.has(x)) fallar(`${nombre}: ruta repetida ${x}`);
    vistos.add(x);
  }
  return vistos;
}

// ---------------------------------------------------------------------------------------------
// 1. Coherencia de rutas
// ---------------------------------------------------------------------------------------------
const rutas = leerRutas();
const rutasJson = contarDuplicados("src/seo/rutas.json", rutas.map((r) => r.path));
if (!rutasJson.has("/")) fallar('src/seo/rutas.json no tiene la portada "/"');
if (!rutasJson.has("*")) fallar('src/seo/rutas.json no tiene la entrada "*" (página 404)');
for (const r of rutas) {
  if (!r.title || !r.description || typeof r.noindex !== "boolean") {
    fallar(`src/seo/rutas.json: la ruta ${r.path} necesita title, description y noindex (booleano)`);
  }
  if (r.path !== "*" && (!/^\/[a-z0-9-]*$/.test(r.path))) {
    fallar(`src/seo/rutas.json: la ruta ${r.path} debe ir en minúsculas, sin barra final`);
  }
}
if (rutas.find((r) => r.path === "*" && !r.noindex)) fallar('src/seo/rutas.json: la 404 ("*") debe ser noindex');

// Rutas de navegación reales (sin la 404 "*")
const deJson = new Set([...rutasJson].filter((p) => p !== "*"));

// App.tsx
const app = leer("src/App.tsx");
const deApp = contarDuplicados(
  "src/App.tsx",
  [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== "*"),
);
if (!/<Route\s+path="\*"/.test(app)) fallar('src/App.tsx no tiene la ruta comodín "*" (404)');

// .htaccess: reescrituras internas "RewriteRule ^x$ x.html [L,NC]" y 301 "^x/$ -> /x".
// La portada "/" no lleva regla (la sirve mod_dir con index.html), así que se añade aquí.
const htaccess = leer("public/.htaccess");
const lineasHt = htaccess.split(/\r?\n/).map((l) => l.trim());
const reescrituras = [];
const barras = [];
for (const [i, linea] of lineasHt.entries()) {
  let m = linea.match(/^RewriteRule\s+\^([a-z0-9-]+)\$\s+(\S+)\s+\[L,NC\]$/);
  if (m) {
    reescrituras.push(`/${m[1]}`);
    if (m[2] !== `${m[1]}.html`) fallar(`public/.htaccess: /${m[1]} debe reescribirse a ${m[1]}.html (tiene ${m[2]})`);
    continue;
  }
  m = linea.match(/^RewriteRule\s+\^([a-z0-9-]+)\/\$\s+(\S+)\s+\[R=301,L,NC\]$/);
  if (m) {
    barras.push(`/${m[1]}`);
    const destino = urlCanonica(`/${m[1]}`);
    if (m[2] !== destino) fallar(`public/.htaccess: /${m[1]}/ debe redirigir a ${destino} (tiene ${m[2]})`);
    continue;
  }
  // Las 301 de URLs antiguas (patrón ^algo\.html?$) deben ir precedidas de la condición
  // THE_REQUEST sobre la misma URL; si no, atraparían las reescrituras internas -> bucle.
  m = linea.match(/^RewriteRule\s+\^([a-z0-9-]+)\\\.html\?\$\s/);
  if (m) {
    const previa = lineasHt[i - 1] ?? "";
    const esperada = `RewriteCond %{THE_REQUEST} \\s/${m[1]}\\.html?[\\s?] [NC]`;
    if (previa !== esperada) {
      fallar(`public/.htaccess: la 301 de ${m[1]}.html debe ir precedida de\n     ${esperada}`);
    }
  }
}
if (/RewriteRule\s+\.\s+\/?index\.html/.test(htaccess) || /!-f/.test(htaccess)) {
  fallar("public/.htaccess: no debe quedar el fallback genérico de la SPA hacia index.html");
}
if (!/^ErrorDocument\s+404\s+\/404\.html$/m.test(htaccess)) {
  fallar("public/.htaccess: falta «ErrorDocument 404 /404.html»");
}
const deHtReescritura = contarDuplicados(".htaccess (reescrituras)", reescrituras);
const deHtBarra = contarDuplicados(".htaccess (301 de barra final)", barras);
deHtReescritura.add("/");
deHtBarra.add("/");

// sitemap.xml: solo URLs canónicas de las rutas indexables
const sitemap = leer("public/sitemap.xml");
const deSitemap = contarDuplicados(
  "public/sitemap.xml",
  [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]),
);
const indexables = new Set(rutas.filter((r) => !r.noindex).map((r) => urlCanonica(r.path)));

compararConjuntos("src/App.tsx", deApp, "src/seo/rutas.json", deJson);
compararConjuntos("src/seo/rutas.json", deJson, "public/.htaccess (reescrituras)", deHtReescritura);
compararConjuntos("src/seo/rutas.json", deJson, "public/.htaccess (301 de barra final)", deHtBarra);
compararConjuntos("src/seo/rutas.json (indexables)", indexables, "public/sitemap.xml", deSitemap);

if (errores.length) terminar();

// ---------------------------------------------------------------------------------------------
// 2. Generación de los .html por ruta
// ---------------------------------------------------------------------------------------------
const plantilla = leer("dist/index.html");
const generados = [];
for (const ruta of rutas) {
  const archivo = archivoDeRuta(ruta.path);
  writeFileSync(raiz(`dist/${archivo}`), aplicarBloque(plantilla, ruta));
  generados.push({ ruta, archivo });
}

// ---------------------------------------------------------------------------------------------
// 3. Verificación de lo generado
// ---------------------------------------------------------------------------------------------
const contar = (html, re) => (html.match(re) ?? []).length;
for (const { ruta, archivo } of generados) {
  const html = leer(`dist/${archivo}`);
  const titulos = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
  if (titulos.length !== 1) fallar(`dist/${archivo}: debe tener un solo <title> (tiene ${titulos.length})`);
  for (const [re, nombre] of [
    [/<meta name="description"/g, "description"],
    [/<meta property="og:title"/g, "og:title"],
    [/<meta property="og:description"/g, "og:description"],
    [/<meta name="twitter:title"/g, "twitter:title"],
    [/<meta name="twitter:description"/g, "twitter:description"],
  ]) {
    if (contar(html, re) !== 1) fallar(`dist/${archivo}: debe tener exactamente un ${nombre}`);
  }
  const canonicals = contar(html, /<link rel="canonical"/g);
  const ogUrls = contar(html, /<meta property="og:url"/g);
  const robots = contar(html, /<meta name="robots" content="noindex"/g);
  if (ruta.noindex) {
    if (canonicals || ogUrls || robots !== 1) fallar(`dist/${archivo}: debe llevar noindex y no llevar canonical ni og:url`);
  } else {
    const url = urlCanonica(ruta.path);
    if (canonicals !== 1 || !html.includes(`<link rel="canonical" href="${url}" />`)) {
      fallar(`dist/${archivo}: debe llevar un canonical ${url}`);
    }
    if (ogUrls !== 1 || !html.includes(`<meta property="og:url" content="${url}" />`)) {
      fallar(`dist/${archivo}: debe llevar og:url ${url}`);
    }
    if (robots) fallar(`dist/${archivo}: no debe llevar noindex`);
  }
  if (!html.includes('<script type="module"')) fallar(`dist/${archivo}: falta el script de la aplicación`);
}

terminar();

function terminar() {
  if (errores.length) {
    console.error(`\n✗ generar-cabeceras: ${errores.length} error(es)\n`);
    for (const e of errores) console.error(`  - ${e}`);
    console.error("");
    process.exit(1);
  }
  console.log(`\n✓ generar-cabeceras: rutas coherentes en App.tsx, rutas.json, .htaccess y sitemap.xml`);
  for (const { ruta, archivo } of generados) {
    console.log(`  dist/${archivo.padEnd(26)} ${ruta.noindex ? "noindex" : urlCanonica(ruta.path)}`);
  }
  process.exit(0);
}
