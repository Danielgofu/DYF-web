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
// Además (1b) comprueba que el año de fundación y el horario del JSON-LD coinciden con
// src/utils/empresa.json.
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
const reglasHtml = {};
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
  m = linea.match(/^RewriteRule\s+\^([a-z0-9-]+)\\\.html\?\$\s+(\S+)\s+\[([^\]]+)\]$/);
  if (m) {
    const previa = lineasHt[i - 1] ?? "";
    const esperada = `RewriteCond %{THE_REQUEST} \\s/${m[1]}\\.html?[\\s?] [NC]`;
    if (previa !== esperada) {
      fallar(`public/.htaccess: la regla de ${m[1]}.html debe ir precedida de\n     ${esperada}`);
    }
    reglasHtml[m[1]] = { destino: m[2], flags: m[3], antes: lineasHt[i - 2] ?? "" };
  }
}

// Los .html generados no deben ser accesibles con su nombre: cada ruta redirige (301) de
// /ruta.html a su URL limpia, y /404.html pedido directamente da un 404 real. La regla del
// 404 necesita además REDIRECT_STATUS vacío: el ErrorDocument sirve /404.html con una
// redirección interna en la que THE_REQUEST sigue siendo "/404.html".
for (const ruta of rutas) {
  if (ruta.path === "/") continue;
  const nombre = archivoDeRuta(ruta.path).replace(/\.html$/, "");
  const regla = reglasHtml[nombre];
  if (ruta.path === "*") {
    if (!regla || regla.destino !== "-" || !/^R=404,L/.test(regla.flags) || regla.antes !== "RewriteCond %{ENV:REDIRECT_STATUS} ^$") {
      fallar("public/.htaccess: falta la regla que da 404 a /404.html pedido directamente:\n" +
        "     RewriteCond %{ENV:REDIRECT_STATUS} ^$\n     RewriteCond %{THE_REQUEST} \\s/404\\.html?[\\s?] [NC]\n     RewriteRule ^404\\.html?$ - [R=404,L,NC]");
    }
  } else if (!regla || regla.destino !== urlCanonica(ruta.path) || !/^R=301,L/.test(regla.flags)) {
    fallar(`public/.htaccess: /${nombre}.html debe redirigir con 301 a ${urlCanonica(ruta.path)}`);
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

// ---------------------------------------------------------------------------------------------
// 1b. Datos de empresa: el año de fundación y el horario del JSON-LD de index.html (y los años
//     que aparezcan en las descripciones de rutas.json como "desde AAAA") deben coincidir con
//     src/utils/empresa.json, que es lo que usa la web (src/utils/contact.ts).
// ---------------------------------------------------------------------------------------------
const empresa = JSON.parse(leer("src/utils/empresa.json"));
const jsonLdTexto = (leer("index.html").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
let jsonLd = null;
try {
  jsonLd = JSON.parse(jsonLdTexto);
} catch {
  fallar("index.html: el bloque JSON-LD falta o no es JSON válido");
}
if (jsonLd) {
  if (jsonLd.foundingDate !== String(empresa.foundingYear)) {
    fallar(`index.html (JSON-LD): foundingDate es ${JSON.stringify(jsonLd.foundingDate)} y en src/utils/empresa.json el año es ${empresa.foundingYear}`);
  }
  const esperado = empresa.openingHours.slots.map((s) => ({
    dias: empresa.openingHours.dayOfWeek.map((d) => `https://schema.org/${d}`).join(","),
    opens: s.opens,
    closes: s.closes,
  }));
  const actual = (jsonLd.openingHoursSpecification ?? []).map((o) => ({
    dias: (o.dayOfWeek ?? []).join(","),
    opens: o.opens,
    closes: o.closes,
  }));
  if (JSON.stringify(actual) !== JSON.stringify(esperado)) {
    fallar(
      "index.html (JSON-LD): openingHoursSpecification no coincide con src/utils/empresa.json" +
        `\n     JSON-LD:      ${actual.map((a) => `${a.opens}-${a.closes}`).join(", ") || "(vacío)"}` +
        `\n     empresa.json: ${esperado.map((a) => `${a.opens}-${a.closes}`).join(", ")} (${empresa.openingHours.dayOfWeek.join(", ")})`,
    );
  }
}
for (const r of rutas) {
  for (const m of `${r.title} ${r.description}`.matchAll(/desde (\d{4})/gi)) {
    if (+m[1] !== empresa.foundingYear) {
      fallar(`src/seo/rutas.json (${r.path}): dice "${m[0]}" y el año de fundación es ${empresa.foundingYear}`);
    }
  }
}

if (errores.length) terminar();

// ---------------------------------------------------------------------------------------------
// 2. Generación de los .html por ruta
// ---------------------------------------------------------------------------------------------
const plantilla = leer("dist/index.html");

// Rendimiento: las páginas lazy (React.lazy en App.tsx) solo se piden cuando el bundle
// principal ya se ha ejecutado. Cada .html declara con <link rel="modulepreload"> el chunk
// de su página y sus dependencias, para que se descarguen en paralelo con el bundle
// principal. Los nombres con hash salen del manifiesto de Vite (build.manifest en
// vite.config.ts), que se borra al terminar para no publicarlo.
const manifiesto = JSON.parse(leer("dist/.vite/manifest.json"));
const lazyModulos = Object.fromEntries(
  [...app.matchAll(/const (\w+) = lazy\(\(\) => import\("\.\/([^"]+)"\)/g)].map((m) => [m[1], `src/${m[2]}.tsx`]),
);
const componenteDeRuta = Object.fromEntries(
  [...app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g)].map((m) => [m[1], m[2]]),
);
const yaEnPlantilla = new Set([...plantilla.matchAll(/(?:src|href)="\/([^"]+\.js)"/g)].map((m) => m[1]));
function chunksDe(clave, vistos = new Set()) {
  const entrada = manifiesto[clave];
  if (!entrada || vistos.has(clave)) return [];
  vistos.add(clave);
  return [entrada.file, ...(entrada.imports ?? []).flatMap((c) => chunksDe(c, vistos))];
}
function precargas(ruta) {
  const modulo = lazyModulos[componenteDeRuta[ruta.path]];
  if (!modulo) return []; // la portada (Inicio) va en el bundle principal
  if (!manifiesto[modulo]) {
    fallar(`dist/.vite/manifest.json no tiene ${modulo} (ruta ${ruta.path})`);
    return [];
  }
  return [...new Set(chunksDe(modulo))].filter((f) => !yaEnPlantilla.has(f));
}

const generados = [];
for (const ruta of rutas) {
  const archivo = archivoDeRuta(ruta.path);
  const chunks = precargas(ruta);
  const enlaces = chunks.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`).join("\n    ");
  let html = aplicarBloque(plantilla, ruta);
  if (enlaces) html = html.replace("</head>", `  ${enlaces}\n  </head>`);
  writeFileSync(raiz(`dist/${archivo}`), html);
  generados.push({ ruta, archivo, chunks });
}
rmSync(raiz("dist/.vite"), { recursive: true, force: true });

// ---------------------------------------------------------------------------------------------
// 3. Verificación de lo generado
// ---------------------------------------------------------------------------------------------
const contar = (html, re) => (html.match(re) ?? []).length;
for (const { ruta, archivo, chunks } of generados) {
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
  for (const f of chunks) {
    if (!existsSync(raiz(`dist/${f}`))) fallar(`dist/${archivo}: precarga /${f}, que no existe`);
  }
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
  for (const { ruta, archivo, chunks = [] } of generados) {
    console.log(`  dist/${archivo.padEnd(26)} ${(ruta.noindex ? "noindex" : urlCanonica(ruta.path)).padEnd(50)} ${chunks.length ? `precarga ${chunks.length} chunk(s)` : ""}`);
  }
  process.exit(0);
}
