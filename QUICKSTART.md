# 🚀 Inicio Rápido

## ⚡ 3 Pasos para Deploy

### 1️⃣ Descarga/Clona el Proyecto
```bash
# Si ya tienes los archivos, salta este paso
# Si no, clona desde GitHub
git clone https://github.com/usuario/cs2-psa-calculator.git
cd cs2-psa-calculator
```

### 2️⃣ Sube a GitHub

**Windows:**
```cmd
# Edita deploy.bat con tu usuario y repositorio
notepad deploy.bat
# Ejecuta
deploy.bat
```

**Mac/Linux:**
```bash
# Edita deploy.sh con tu usuario y repositorio
nano deploy.sh
# Ejecuta
bash deploy.sh
```

**O Manualmente:**
```bash
git init
git add .
git commit -m "Initial commit: CS2 PSA Calculator"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cs2-psa-calculator.git
git push -u origin main
```

### 3️⃣ Activa GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En **Source**, selecciona **main**
4. Click **Save**
5. ¡Espera 1-2 minutos! 🎉

**Tu sitio estará en:**
```
https://TU-USUARIO.github.io/cs2-psa-calculator/
```

---

## 📁 Estructura del Proyecto

```
cs2-psa-calculator/
│
├── index.html          ← Página principal
├── styles.css          ← Estilos (diseño dark mode)
├── script.js           ← Lógica del algoritmo PSA
│
├── README.md           ← Documentación principal
├── DEPLOYMENT.md       ← Guía de deployment detallada
├── ADVANCED.md         ← Configuración avanzada y tips
├── QUICKSTART.md       ← Este archivo
│
├── deploy.sh           ← Script de deploy (Mac/Linux)
├── deploy.bat          ← Script de deploy (Windows)
│
└── LICENSE             ← Licencia MIT
```

---

## 🎯 Uso de la Calculadora

### Paso 1: Configura tu Sensibilidad Base

1. Abre CS2
2. Encuentra un punto de referencia (pared, objeto)
3. Ajusta tu sensibilidad hasta que puedas hacer **360°** con un swipe completo del mousepad
4. Anota esa sensibilidad

### Paso 2: Ingresa tus Datos

- **DPI**: El DPI de tu mouse (400, 800, 1600, etc.)
- **Sensibilidad Base**: La que encontraste en el Paso 1
- **Juego**: Selecciona CS2 (o el juego que uses)

### Paso 3: Completa las 7 Iteraciones

1. **Prueba las 3 sensibilidades** en bots/deathmatch
2. **Prueba en diferentes distancias** (largo, medio, corto)
3. **Elige la más cómoda** (Lower o Higher)
4. **Repite 7 veces**

### Paso 4: Usa tu Sensibilidad Perfecta

1. **Copia** la sensibilidad final
2. **Pégala** en la consola de CS2: `sensitivity 1.234`
3. **Comprométete** a usarla por 2-3 semanas
4. **Practica** con aim trainers

---

## 🛠️ Testing Local (Antes de Deploy)

### Python (más simple)
```bash
python -m http.server 8000
# Abre: http://localhost:8000
```

### Node.js (con live reload)
```bash
npm install -g live-server
live-server
```

### PHP
```bash
php -S localhost:8000
```

---

## 🆘 Problemas Comunes

### No se ve el sitio en GitHub Pages
- **Solución**: Espera 2-3 minutos después de activar Pages
- **Verifica**: Settings → Pages debe mostrar un link verde

### CSS/JS no cargan
- **Solución**: Revisa que las rutas en `index.html` sean relativas:
  - ✅ `href="styles.css"`
  - ❌ `href="/styles.css"`

### Error al hacer push
- **Solución**: Crea un Personal Access Token en GitHub
- **Link**: https://github.com/settings/tokens
- **Usa el token** en lugar de tu contraseña

### La calculadora no funciona
- **Solución**: Abre la consola del navegador (F12) para ver errores
- **Verifica**: Que todos los archivos (.html, .css, .js) estén en la misma carpeta

---

## 📞 Soporte

- 📖 **Documentación completa**: Ver `README.md`
- ⚙️ **Configuración avanzada**: Ver `ADVANCED.md`
- 🚀 **Deploy detallado**: Ver `DEPLOYMENT.md`
- 🐛 **Reportar bugs**: Abre un issue en GitHub

---

## 🎮 Disfruta Mejorando tu Aim!

Una vez desplegado, comparte el link con tus amigos gamers! 🎯

**Tu link:**
```
https://TU-USUARIO.github.io/cs2-psa-calculator/
```

---

<div align="center">

**Made with ❤️ for the CS2 community**

[⭐ Star en GitHub](https://github.com/TU-USUARIO/cs2-psa-calculator) | [🐛 Reportar Bug](https://github.com/TU-USUARIO/cs2-psa-calculator/issues) | [💡 Sugerencias](https://github.com/TU-USUARIO/cs2-psa-calculator/issues)

</div>
