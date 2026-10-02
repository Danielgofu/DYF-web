# Guía de despliegue en Nominalia

Documento interno: está en la raíz del repositorio, fuera de `public/`, así que **no se publica**.
Pensado para hacerlo por primera vez, paso a paso.

---

## 0. Resumen en una línea

Instalar y comprobar el certificado SSL con la web antigua → copia de seguridad de la web antigua →
`npm run build` → subir el **contenido** de `dist/` (incluido `.htaccess`) → pruebas con `curl` →
Search Console. Después, cuando todo funcione unos días: HSTS y email definitivo de los formularios.

---

## 1. Qué hay que subir

1. En el ordenador, dentro de la carpeta del proyecto:

   ```
   npm install
   npm run build
   ```

   El build termina con `✓ generar-cabeceras: rutas coherentes…`. Si en vez de eso aparece `✗`,
   **no subas nada**: el mensaje dice qué no cuadra.

2. Se sube **el contenido** de la carpeta `dist/`, no la carpeta en sí, a la carpeta pública del
   dominio en Nominalia (normalmente `public_html/` o `httpdocs/`). Es decir, en el hosting debe
   quedar `public_html/index.html`, no `public_html/dist/index.html`.

3. **El archivo `.htaccess` es obligatorio.** Empieza por un punto, y por eso muchos programas lo
   esconden:
   - **FileZilla:** menú *Servidor → Forzar mostrar archivos ocultos*.
   - **WinSCP:** *Opciones → Preferencias → Panel → Mostrar archivos ocultos* (o `Ctrl+Alt+H`).
   - **Explorador de Windows** (para verlo en tu ordenador): pestaña *Vista → Mostrar → Elementos ocultos*.
   - **Administrador de archivos del panel de Nominalia:** suele haber una casilla "mostrar archivos ocultos".

   Sin `.htaccess` la web parece funcionar en la portada, pero fallan las redirecciones de la web
   antigua, el paso a https, las rutas (`/servicios` daría error), la página 404, la seguridad
   (CSP) y la caché.

4. Lo que contiene `dist/` (todo se sube): `.htaccess`, los `.html` de cada ruta (`index.html`,
   `equipo.html`, `servicios.html`, `contacto.html`, `mantenimiento.html`, `gracias.html`,
   `aviso-legal.html`, `politica-privacidad.html`, `404.html`), `assets/`, `images/`, `logos/`,
   iconos, `og-image.jpg`, `robots.txt`, `sitemap.xml` y `site.webmanifest`.

---

## 2. Antes de subir: copia de seguridad de la web antigua

1. Con el cliente FTP (con los archivos ocultos visibles), descarga **todo** el contenido actual de
   la carpeta pública a una carpeta de tu ordenador con la fecha, por ejemplo
   `copia-web-antigua-2026-10-02/`.
2. Comprueba que la copia incluye su `.htaccess` si lo tenía.
3. Si el panel de Nominalia ofrece "copia de seguridad" o "backup", haz también una.
4. No borres la copia hasta que la web nueva lleve varias semanas funcionando.

---

## 3. Orden recomendado

1. **Certificado SSL (ZeroSSL) instalado y comprobado con la web antigua.** Antes de subir nada:
   `https://dyfservicios.com` y `https://www.dyfservicios.com` deben abrir sin aviso de
   seguridad en el navegador. Comprobación:

   ```
   curl -sI https://www.dyfservicios.com/
   curl -sI https://dyfservicios.com/
   ```

   Ninguno debe dar error de certificado (`SSL certificate problem`). Si lo da, **no sigas**:
   la web nueva redirige todo a https y quedaría inaccesible.
2. **Subir la web nueva** (apartado 1), con la copia de seguridad ya hecha (apartado 2).
3. **Pruebas** (apartado 4) inmediatamente después de subir.

---

## 4. Pruebas con curl después de subir

> **Windows:** en PowerShell escribe `curl.exe` (no `curl`, que en PowerShell es otro comando).
> `-I` pide solo las cabeceras; `-s` quita la barra de progreso.

### 4.1 Redirecciones de la web antigua (un solo salto, 301)

| Comando | Resultado esperado |
|---|---|
| `curl -sI http://dyfservicios.com/index.html` | `301` y `location: https://www.dyfservicios.com/` |
| `curl -sI http://dyfservicios.com/nosotros.html` | `301` y `location: https://www.dyfservicios.com/equipo` |
| `curl -sI http://dyfservicios.com/servicios.html` | `301` y `location: https://www.dyfservicios.com/servicios` |
| `curl -sI http://dyfservicios.com/comunidades.html` | `301` y `location: https://www.dyfservicios.com/mantenimiento` |
| `curl -sI http://dyfservicios.com/contacto.html` | `301` y `location: https://www.dyfservicios.com/contacto` |

### 4.2 http → https y sin www → www

| Comando | Resultado esperado |
|---|---|
| `curl -sI http://dyfservicios.com/` | `301` y `location: https://www.dyfservicios.com/` |
| `curl -sI http://www.dyfservicios.com/servicios` | `301` y `location: https://www.dyfservicios.com/servicios` |
| `curl -sI https://dyfservicios.com/contacto` | `301` y `location: https://www.dyfservicios.com/contacto` |
| `curl -sI https://www.dyfservicios.com/servicios/` | `301` y `location: https://www.dyfservicios.com/servicios` (quita la barra final) |
| `curl -sI https://www.dyfservicios.com/equipo.html` | `301` y `location: https://www.dyfservicios.com/equipo` (igual con `mantenimiento.html`, `gracias.html`, `aviso-legal.html`, `politica-privacidad.html`) |

### 4.3 Rutas (200) y 404 real

| Comando | Resultado esperado |
|---|---|
| `curl -sI https://www.dyfservicios.com/` | `200` |
| `curl -sI https://www.dyfservicios.com/equipo` | `200` (igual con `/servicios`, `/contacto`, `/mantenimiento`, `/gracias`, `/aviso-legal`, `/politica-privacidad`) |
| `curl -s https://www.dyfservicios.com/servicios \| findstr canonical` (Windows) o `\| grep canonical` | `<link rel="canonical" href="https://www.dyfservicios.com/servicios" />` |
| `curl -sI https://www.dyfservicios.com/no-existe` | `404` (no 200) |
| `curl -sI https://www.dyfservicios.com/404.html` | `404` |
| `curl -s https://www.dyfservicios.com/no-existe \| findstr title` | `<title>Página no encontrada - 404 \| DYF Telecomunicaciones</title>` |

### 4.4 Cabeceras de seguridad

```
curl -sI https://www.dyfservicios.com/
```

Deben aparecer **una sola vez** cada una:

- `content-security-policy: default-src 'self'; script-src 'self'; …`
- `x-content-type-options: nosniff`
- `x-frame-options: DENY`
- `referrer-policy: strict-origin-when-cross-origin`
- `permissions-policy: geolocation=(), microphone=(), camera=()`
- `cross-origin-opener-policy: same-origin`

Y **no** deben aparecer `x-xss-protection` ni (de momento) `strict-transport-security`.
Repite con `https://www.dyfservicios.com/no-existe`: la 404 también debe llevarlas.

### 4.5 Compresión y caché

| Comando | Resultado esperado |
|---|---|
| `curl -s -o NUL -D - -H "Accept-Encoding: br, gzip" https://www.dyfservicios.com/` (en Linux/Mac, `-o /dev/null`) | `content-encoding: br` o `content-encoding: gzip` y `cache-control: no-cache` |
| Abre la web en el navegador → F12 → pestaña *Red* → pulsa un archivo `index-….js` | Cabecera `cache-control: public, max-age=31536000, immutable` y `content-encoding: br` o `gzip` |
| `curl -sI https://www.dyfservicios.com/DyfLogo.webp` | `cache-control: public, max-age=604800` |
| `curl -sI https://www.dyfservicios.com/site.webmanifest` | `cache-control: public, max-age=86400` |

### 4.6 En el navegador

1. Abre las 9 páginas (portada, equipo, servicios, contacto, mantenimiento, gracias, aviso legal,
   política de privacidad y una que no exista) con F12 abierto en la pestaña *Consola*: **no debe
   haber errores en rojo** (ni mensajes de "Content Security Policy").
2. En Contacto, pulsa "Cargar mapa de Google Maps": el mapa debe aparecer.
3. Envía **un** formulario de prueba de Contacto y comprueba que llega al correo de destino.

---

## 5. Problemas posibles en Nominalia y cómo volver atrás

Los números de línea se refieren a `public/.htaccess` (el mismo archivo que se sube dentro de `dist/`).
Si cambias algo, hazlo en `public/.htaccess`, ejecuta `npm run build` y vuelve a subir `dist/.htaccess`
(o edítalo directamente en el hosting si es una prueba rápida, y luego pasa el cambio al repositorio).

| Síntoma | Cómo detectarlo | Qué cambiar |
|---|---|---|
| **Error 500 en todas las páginas** | Registro de errores del panel de Nominalia: `Options not allowed here` | Línea 8, `Options -Indexes -MultiViews`. Prueba primero `Options -Indexes`. Si sigue el 500, borra la línea entera. |
| **Error 403 Prohibido en todas las páginas** | Registro de errores: `Options FollowSymLinks or SymLinksIfOwnerMatch is off` | Línea 8: añade `+SymLinksIfOwnerMatch` → `Options -Indexes -MultiViews +SymLinksIfOwnerMatch`. |
| **El navegador dice "demasiadas redirecciones"** (`ERR_TOO_MANY_REDIRECTS`) | `curl -sI https://www.dyfservicios.com/` devuelve `301` con `location` a esa misma dirección | El hosting usa un proxy y `%{HTTPS}` siempre vale "off". Debajo de la línea 57 (`RewriteCond %{HTTPS} off`) añade: `RewriteCond %{HTTP:X-Forwarded-Proto} !https`. Si tampoco funciona, pregunta a Nominalia qué variable indica HTTPS (a veces `%{ENV:HTTPS}`). |
| **Error 500 y en el registro `ErrorDocument not allowed here`** | Registro de errores | Línea 12, `ErrorDocument 404 /404.html`: bórrala. Se pierde la página 404 propia, pero la web funciona. |
| **Faltan las cabeceras de seguridad** (apartado 4.4) | `curl -sI` no muestra `content-security-policy` | Falta el módulo `mod_headers` en el servidor. No se arregla en el archivo: pide a Nominalia que lo active. |
| **Cabeceras repetidas** (dos `content-security-policy`, dos `x-frame-options`…) | `curl -sI` | El hosting añade las suyas. Con dos CSP el navegador aplica las dos a la vez y puede bloquear cosas. Borra la línea repetida del bloque `<IfModule mod_headers.c>` (desde la línea 112) o pide a Nominalia que quite la suya. |
| **Sin compresión** (no aparece `content-encoding`) | Apartado 4.5 | Faltan `mod_deflate`/`mod_brotli`/`mod_filter`. No da error; la web va más lenta. Pide a Nominalia que activen la compresión. |
| **`/servicios` da 404** pero la portada funciona | Navegador o `curl -sI` | `mod_rewrite` no está activo o el `.htaccess` no se ha subido. Comprueba que `.htaccess` está en la carpeta pública (con los ocultos visibles). |

### Volver atrás rápido

- **Si la web da error 500 o 403 en todas las páginas:** renombra en el hosting `.htaccess` a
  `htaccess-desactivado` (sin el punto). La web volverá a cargar en segundos (sin redirecciones ni
  seguridad, pero accesible) mientras buscas la línea que falla con la tabla de arriba.
- **Si hay que volver a la web antigua:** borra el contenido de la carpeta pública y sube la copia
  del apartado 2 (incluido su `.htaccess`).
- Mientras HSTS **no** esté activado (apartado 6), volver atrás no tiene efectos secundarios en los
  navegadores de los visitantes.

---

## 6. Activar HSTS (después, no el primer día)

HSTS obliga a los navegadores a usar siempre https. Una vez activado **no se puede deshacer desde el
servidor**: si el certificado falla o caduca, quien ya visitó la web no podrá entrar.

Actívalo solo cuando:
1. `https://www.dyfservicios.com` y `https://dyfservicios.com` funcionan con certificado válido, y
2. la renovación del certificado (apartado 8) está hecha al menos una vez sin problemas, o
   tienes claro el procedimiento y el aviso en el calendario.

Pasos (están también en los comentarios del `.htaccess`, líneas 138–150):

1. **Paso 1 (1 día):** quita la `#` del principio de la línea 148:
   `Header always set Strict-Transport-Security "max-age=86400"`.
   Sube el `.htaccess`, comprueba con `curl -sI https://www.dyfservicios.com/` que aparece
   `strict-transport-security: max-age=86400` y que todo sigue funcionando unos días.
2. **Paso 2 (1 año):** vuelve a comentar la línea 148 y quita la `#` de la línea 150:
   `Header always set Strict-Transport-Security "max-age=31536000"`.

No añadas `includeSubDomains` ni `preload` salvo que **todos** los subdominios (correo, webmail…)
funcionen por https.

---

## 7. Email definitivo de los formularios (FormSubmit)

Ahora mismo los dos formularios envían a un email **de prueba** (a propósito). Para pasar al definitivo:

1. **Cambiar el email** en los dos archivos (busca `formsubmit.co/ajax/`):
   - `src/components/forms/ContactForm.tsx`, línea 101
   - `src/components/forms/PlanForm.tsx`, línea 81

   Sustituye `danielgofu8@gmail.com` por el definitivo (por ejemplo `info@dyfservicios.com`),
   ejecuta `npm run build` y sube `dist/`.
2. **Activarlo desde el dominio de producción:** desde `https://www.dyfservicios.com/contacto`
   envía un formulario. FormSubmit manda un correo de activación al email nuevo: pulsa *Activate
   Form*. Hazlo desde el dominio real, no desde el ordenador ni desde una vista previa: la
   activación queda ligada al dominio desde el que se envía.
3. **Pasar al alias aleatorio**, para que el email no se vea en el código público: el correo de
   confirmación de FormSubmit incluye una cadena aleatoria. Sustituye en los dos archivos
   `https://formsubmit.co/ajax/info@dyfservicios.com` por `https://formsubmit.co/ajax/<cadena>`,
   ejecuta `npm run build`, sube `dist/` y envía otra prueba. (La CSP no necesita cambios: sigue
   siendo `formsubmit.co`.)
4. **Actualizar la Política de Privacidad**: en el apartado "04. Destinatarios y encargados del
   tratamiento" (`src/components/pages/PoliticaPrivacidad.tsx`, líneas 144–146) añade el proveedor
   del buzón que recibe los correos (por ejemplo, Nominalia si el correo está en Nominalia, o Google
   si es Google Workspace/Gmail) y, si está fuera de la UE, revisa el apartado 05 de transferencias
   internacionales.

---

## 8. Renovación del certificado ZeroSSL (cada 90 días)

Los certificados gratuitos de ZeroSSL caducan a los **90 días**. Pon un aviso en el calendario a los
**75 días** de cada instalación.

Pasos a repetir en cada renovación:
1. Entra en ZeroSSL y renueva el certificado de `dyfservicios.com` y `www.dyfservicios.com`.
2. **Verificación del dominio:** usa preferiblemente la verificación por **DNS (CNAME)**: no
   depende de la web. Si usas la de **archivo** (`/.well-known/pki-validation/…`) y ZeroSSL no
   consigue validarla por las redirecciones a https/www, añade temporalmente al principio del bloque
   de reescritura del `.htaccess` (debajo de `RewriteEngine On`, línea 15):
   `RewriteRule ^\.well-known/pki-validation/ - [L]` y quítala después.
3. Descarga el certificado (archivos `certificate.crt`, `ca_bundle.crt` y `private.key`) e
   instálalo en el panel de Nominalia (apartado de certificados SSL), sustituyendo al anterior.
4. Comprueba la nueva fecha de caducidad: en el navegador, candado → certificado → "Válido hasta", o
   `curl -vI https://www.dyfservicios.com/ 2>&1 | findstr "expire"` (en Linux/Mac `grep expire`).
5. Repite las pruebas del apartado 4.2.

> **Aviso importante:** con HSTS activado (apartado 6), un certificado caducado deja la web
> **inaccesible** para todos los visitantes que ya entraron antes: el navegador no les dejará ni
> siquiera aceptar el riesgo. Por eso la renovación no puede retrasarse.

---

## 9. Después de publicar: Google Search Console

1. Entra en <https://search.google.com/search-console> y añade la propiedad. Lo más completo es la
   de tipo **Dominio** (`dyfservicios.com`), que se verifica con un registro TXT en el DNS de
   Nominalia. Si es más sencillo, la de **Prefijo de URL**: `https://www.dyfservicios.com/`.
2. **Sitemaps** → añade `https://www.dyfservicios.com/sitemap.xml` → *Enviar*. Debe aparecer como
   "Correcto" con 7 URLs.
3. **Inspeccionar URL** (barra superior) con las 5 URLs antiguas, una a una:
   - `http://dyfservicios.com/index.html`
   - `http://dyfservicios.com/nosotros.html`
   - `http://dyfservicios.com/servicios.html`
   - `http://dyfservicios.com/comunidades.html`
   - `http://dyfservicios.com/contacto.html`

   En cada una, *Probar URL publicada*: debe indicar que **redirige** a la URL nueva
   correspondiente (apartado 4.1). Después inspecciona las URLs nuevas (`/`, `/servicios`,
   `/mantenimiento`, `/contacto`, `/equipo`) y pulsa *Solicitar indexación* en cada una.
4. En las semanas siguientes, revisa *Páginas* (indexación) y *Experiencia → Métricas web principales*.
