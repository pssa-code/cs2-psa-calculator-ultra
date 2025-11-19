# 🚀 Guía Rápida de Deployment

## Desplegar en GitHub Pages (Recomendado)

### Opción 1: Desde la interfaz web de GitHub

1. **Sube tus archivos a GitHub:**
   - Ve a [github.com](https://github.com) y crea un nuevo repositorio
   - Nombra tu repositorio (ej: `cs2-psa-calculator`)
   - Haz el repositorio público
   - Sube los archivos: `index.html`, `styles.css`, `script.js`, `README.md`, `LICENSE`

2. **Activa GitHub Pages:**
   - En tu repositorio, ve a **Settings** → **Pages**
   - En **Source**, selecciona **main** (o **master**)
   - Click en **Save**
   - Espera 1-2 minutos
   - Tu sitio estará en: `https://tu-usuario.github.io/cs2-psa-calculator/`

### Opción 2: Desde la línea de comandos (Git)

```bash
# 1. Inicializa Git en tu carpeta del proyecto
cd cs2-psa-calculator
git init

# 2. Agrega todos los archivos
git add .

# 3. Haz tu primer commit
git commit -m "Initial commit: CS2 PSA Calculator"

# 4. Crea el repositorio en GitHub primero, luego conecta
git remote add origin https://github.com/TU-USUARIO/cs2-psa-calculator.git

# 5. Sube a GitHub
git branch -M main
git push -u origin main

# 6. Activa GitHub Pages desde Settings → Pages como en Opción 1
```

---

## Otros Servicios de Hosting Gratuito

### Netlify (Drag & Drop)

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Arrastra la carpeta del proyecto
4. ¡Listo! URL automática en segundos

**Ventajas:**
- Deploy instantáneo
- HTTPS automático
- Dominio personalizado gratuito

### Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Deploy automático
4. URL: `tu-proyecto.vercel.app`

**Ventajas:**
- Deploy automático con cada push
- Preview automático de ramas
- Analytics gratuito

### Cloudflare Pages

1. Ve a [pages.cloudflare.com](https://pages.cloudflare.com)
2. Conecta GitHub
3. Selecciona tu repo
4. Deploy automático

**Ventajas:**
- CDN global ultra rápido
- Unlimited bandwidth
- Deploy ilimitados

---

## Dominio Personalizado (Opcional)

### Con GitHub Pages

1. Compra un dominio (ej: en Namecheap, Google Domains)
2. En tu repositorio: Settings → Pages → Custom domain
3. Agrega tu dominio: `www.tudominio.com`
4. Configura DNS en tu proveedor:
   ```
   Type: CNAME
   Host: www
   Value: tu-usuario.github.io
   ```

### Con Netlify/Vercel

1. En el dashboard del servicio, ve a **Domain settings**
2. Click en **Add custom domain**
3. Sigue las instrucciones para configurar DNS

---

## Optimizaciones Antes de Deploy

### 1. Minificar archivos (Opcional)

Para mejor performance, puedes minificar CSS y JS:

```bash
# Instala terser (para JS) y cssnano (para CSS)
npm install -g terser cssnano-cli

# Minifica JavaScript
terser script.js -o script.min.js -c -m

# Minifica CSS
cssnano styles.css styles.min.css

# Actualiza referencias en index.html:
# <link rel="stylesheet" href="styles.min.css">
# <script src="script.min.js"></script>
```

### 2. Añade meta tags para SEO

Ya están incluidos en el HTML, pero puedes personalizarlos:

```html
<meta name="description" content="Calculadora PSA para CS2 - Encuentra tu sensibilidad perfecta">
<meta name="keywords" content="CS2, Counter-Strike, PSA, sensibilidad, aim, calculator">
<meta name="author" content="Tu Nombre">

<!-- Open Graph para redes sociales -->
<meta property="og:title" content="CS2 PSA Calculator">
<meta property="og:description" content="Encuentra tu sensibilidad perfecta en CS2">
<meta property="og:image" content="https://tu-url.com/preview.png">
<meta property="og:url" content="https://tu-url.com">
```

### 3. Añade Google Analytics (Opcional)

Agrega antes del cierre de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Testing Local

Antes de hacer deploy, prueba localmente:

### Python (más simple)

```bash
python -m http.server 8000
# Abre: http://localhost:8000
```

### Node.js (con live reload)

```bash
# Instala live-server globalmente
npm install -g live-server

# Ejecuta en tu carpeta
live-server
# Se abre automáticamente en el navegador
```

### PHP

```bash
php -S localhost:8000
```

---

## Checklist Pre-Deploy ✅

- [ ] Probado en Chrome, Firefox, Safari
- [ ] Responsive en móvil (DevTools)
- [ ] Todos los inputs validados
- [ ] Gráfico funciona correctamente
- [ ] Botón copiar funciona
- [ ] README.md actualizado con tu info
- [ ] LICENSE incluido
- [ ] .gitignore configurado
- [ ] Meta tags personalizados
- [ ] Links de contacto actualizados

---

## Actualizaciones Futuras

Después del deploy, para actualizar:

```bash
# Haz cambios en tus archivos

# Commit
git add .
git commit -m "Update: descripción del cambio"

# Push
git push

# GitHub Pages se actualiza automáticamente en 1-2 minutos
```

---

## Solución de Problemas

### GitHub Pages no se actualiza

- Espera 2-3 minutos después del push
- Verifica que esté activado en Settings → Pages
- Hard refresh: Ctrl + Shift + R (Windows) o Cmd + Shift + R (Mac)
- Limpia caché del navegador

### 404 Error

- Verifica que `index.html` esté en la raíz del repositorio
- Revisa que el branch correcto esté seleccionado en Settings → Pages

### CSS/JS no cargan

- Verifica que las rutas sean relativas: `href="styles.css"` no `href="/styles.css"`
- Revisa la consola del navegador (F12) para errores

---

## Recursos Útiles

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [Web.dev - Performance](https://web.dev/performance)

---

**¡Listo para desplegar! 🚀**

Si tienes problemas, abre un issue en el repositorio o contacta al desarrollador.
