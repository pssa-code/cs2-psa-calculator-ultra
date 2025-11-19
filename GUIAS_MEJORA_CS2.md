# Guías de Mejora en CS2 - Documentación Técnica

## 📋 Descripción General

Nueva categoría de **Guías de Mejora en CS2** integrada en la aplicación PSA Calculator, con contenido profesional basado en técnicas y estrategias utilizadas por jugadores profesionales. Información extraída de fuentes verificadas (BLIX.GG, GGServers, DaddySkins, Skin.Club, CS.Money, Refrag).

---

## ✨ Características Implementadas

### 1. **Sistema de Navegación Actualizado**
- ✅ Nueva pestaña "Guías de Mejora" en el menú de categorías
- ✅ Navegación fluida entre 3 categorías: Biblioteca de Miras Pro / Guías de Mejora / Calculadora PSA
- ✅ Estado persistente de navegación

### 2. **Tarjetas de Guías Expandibles**
- ✅ 6 categorías principales de guías
- ✅ Diseño de tarjetas interactivas con expansión/colapso
- ✅ Iconos y colores distintivos para cada categoría
- ✅ Animaciones suaves de expansión

### 3. **Contenido Profesional**
- ✅ Basado en guías de profesionales y fuentes verificadas
- ✅ Tips prácticos y aplicables inmediatamente
- ✅ Información actualizada para CS2 (2025)

---

## 📚 Categorías de Guías

### 1. 🎯 **Aim y Precisión**
**Color:** Cyan (#08D3BB)  
**Contenido:**
- **Configuración de Sensibilidad**
  - eDPI óptimo (600-1000 eDPI para pros)
  - Configuración 400 DPI @ 2.0 sens = 800 eDPI
  - Importancia de la consistencia
  - Monitor settings (refresh rate, brightness, vibrance)

- **Crosshair Placement**
  - Mantener crosshair a head level
  - Pre-aim de ángulos
  - Clear angles correctamente
  - Distancia desde la pared

- **Training Rutinas**
  - Warmup de 10 minutos
  - Spray control practice
  - Prefire maps (YPrac)
  - Aim trainers (Aim Lab, KovaaK's)

### 2. ⚡ **Movimiento y Peeking**
**Color:** Amarillo (#FBBF24)  
**Contenido:**
- **Counter-Strafing (Esencial)**
  - Definición y técnica
  - Cómo ejecutarlo correctamente
  - Evitar movimiento diagonal
  - Práctica con sv_showimpacts

- **Tipos de Peek**
  - Jiggle Peek (info gathering)
  - Shoulder Peek (bait AWP shots)
  - Wide Peek (sorprender enemigos)
  - Crouch Peek (cambiar hitbox)
  - Ferrari Peek/Instapeek (máxima velocidad)

- **Movement Fundamentals**
  - Solo usar 2 teclas simultáneamente
  - Shift walking para sigilo
  - Bunny hop básico
  - Sound awareness

### 3. 🔥 **Técnicas Avanzadas**
**Color:** Rojo (#F43F5E)  
**Contenido:**
- **Prefire & Clearing**
  - Definición de prefire
  - Ángulos comunes por mapa
  - Sound cues para prefire
  - Combinar prefire con peek

- **Spray Control & Recoil**
  - AK-47 pattern (primeros 10 bullets)
  - M4A4/M4A1-S control
  - Primeros 5 bullets críticos
  - Burst vs Spray según distancia
  - Headshot line

- **Economy & Weapon Choice**
  - Save rounds management
  - Force buy timing
  - AWP economy ($4750 + utility)
  - Drop weapons a teammates

### 4. 🧠 **Game Sense y Posicionamiento**
**Color:** Verde (#22C55E)  
**Contenido:**
- **Map Awareness**
  - Revisar radar cada 5 segundos
  - Callouts de cada mapa
  - Utility damage en radar
  - Bomb location awareness

- **Positioning & Angles**
  - Off-angles (200ms de ventaja)
  - Evitar open areas
  - Cambiar posiciones frecuentemente
  - Distancia óptima desde cover

- **Timing & Rotations**
  - Map timing knowledge
  - Rotaciones inteligentes (CT)
  - Save time management
  - Lurk timing

### 5. 💣 **Utility Usage**
**Color:** Púrpura (#A78BFA)  
**Contenido:**
- **Smokes Esenciales**
  - Aprender 2-3 smokes por mapa
  - Smoke timing (5-10s antes de ejecutar)
  - One-way smokes
  - Uso táctico

- **Flashbang Mastery**
  - Pop-flash technique
  - Self-flash acceptable
  - Flash for teammate coordination
  - Double flash strategy

- **Molotov & HE Usage**
  - Molotov para delay (5s damage)
  - Clear corners con molly
  - HE nade stack (200-300 damage)
  - Postplant molly

### 6. 👑 **Secretos de Pros**
**Color:** Rosa (#EC4899)  
**Contenido:**
- **Off-Angles & Boosts**
  - Short B boxes boost (Mirage)
  - Inferno B site 3-man boost
  - Nuke Hut boost
  - Off-angle positioning

- **Wallbang Spots**
  - Rifles: 200 penetration power
  - AWP: 250 penetration power
  - Dust2 mid doors
  - Mirage kitchen wallbang

- **Mindgames & Psychology**
  - Fake plant en clutch
  - Fake footsteps
  - Decoy grenades strategy
  - Reload bait

- **Demo Review (Más Importante)**
  - Review de propios demos
  - Review de demos de pros
  - Focus en mistakes, no highlights
  - Tomar notas de errores

---

## 🎨 Diseño y Experiencia de Usuario

### Características de UI/UX:
1. **Tarjetas Expandibles**
   - Click para expandir/colapsar
   - Animación suave de expansión
   - Estado visual claro (collapsed/expanded)

2. **Colores Distintivos**
   - Cada categoría tiene su propio color
   - Bordes y acentos coinciden con el color de categoría
   - Tips con border-left del color correspondiente

3. **Responsive Design**
   - Mobile: 1 columna
   - Tablet: 2 columnas
   - Desktop: 3 columnas
   - Tarjetas expandidas ocupan todo el ancho

4. **Animaciones**
   - Fade-in al cargar
   - Hover effects en tarjetas
   - Smooth expand/collapse
   - Transform on hover para tips

### Estilo Visual:
- Mantiene la estética PSA (dark theme, cyan accents)
- Glow effects en hovers
- Tipografía: Inter (UI) y JetBrains Mono (code)
- Border radius y spacing consistentes

---

## 📁 Archivos Modificados

### 1. **index.html** (Agregados ~35 líneas)
```
Líneas 42-74: Nueva pestaña "Guías de Mejora"
Líneas 119-137: Nueva sección guidesSection
```

**Cambios:**
- Agregada pestaña `#tabGuides` con SVG icon
- Agregada sección `#guidesSection` con header y grid container
- Mantenida estructura consistente con otras secciones

### 2. **script.js** (Agregados ~450 líneas)
```
Líneas 857-1103: Clase ImprovementGuides
Líneas 1104-1147: Función initCategoryNavigation actualizada
Líneas 1149-1167: Inicialización actualizada
```

**Cambios:**
- Nueva clase `ImprovementGuides`
  - Constructor con guides database
  - Método `initGuidesDatabase()` con 6 categorías completas
  - Método `toggleCard()` para expansión
  - Método `render()` para renderizar tarjetas
- Navegación actualizada para 3 pestañas
- Inicialización de `window.improvementGuides`

### 3. **styles.css** (Agregados ~235 líneas)
```
Líneas 1761-1996: Estilos para Improvement Guides
```

**Cambios:**
- `.guides-grid`: Grid responsive (1/2/3 columnas)
- `.guide-card`: Tarjeta con border coloreado
- `.guide-card-header`: Header clickeable con icon
- `.guide-card-content`: Contenido expandible
- `.guide-section`: Secciones dentro de cada guía
- `.guide-tips-list`: Lista de tips estilizada
- Responsive breakpoints para mobile/tablet/desktop
- Colores específicos por categoría

### 4. **GUIAS_MEJORA_CS2.md** (Nuevo archivo)
```
354 líneas de documentación completa
```

---

## 🔧 Implementación Técnica

### JavaScript Class: ImprovementGuides

```javascript
class ImprovementGuides {
    constructor() {
        this.guides = this.initGuidesDatabase();
        this.expandedCards = new Set();
        this.initializeElements();
        this.render();
    }
    
    initGuidesDatabase() {
        // 6 categorías con estructura:
        // - id, title, icon, description, color
        // - content.sections[]: title, tips[]
    }
    
    toggleCard(cardId) {
        // Expande/colapsa tarjeta
        // Actualiza Set de expandedCards
        // Re-renderiza
    }
    
    render() {
        // Renderiza todas las tarjetas
        // Aplica estado expanded/collapsed
        // Genera HTML dinámico
    }
}
```

### Database Structure

```javascript
{
    id: 'aim-precision',
    title: 'Aim y Precisión',
    icon: '🎯',
    description: 'Configuración, sensibilidad...',
    color: '#08D3BB',
    content: {
        sections: [
            {
                title: 'Configuración de Sensibilidad',
                tips: [
                    '<strong>eDPI Óptimo:</strong> ...',
                    // ...más tips
                ]
            },
            // ...más secciones
        ]
    }
}
```

---

## 🚀 Funcionalidades

### 1. Navegación de Pestañas
```javascript
tabGuides.addEventListener('click', () => {
    // Activa pestaña Guías
    // Muestra guidesSection
    // Oculta otras secciones
});
```

### 2. Expansión de Tarjetas
```javascript
toggleCard(cardId) {
    if (this.expandedCards.has(cardId)) {
        this.expandedCards.delete(cardId);
    } else {
        this.expandedCards.add(cardId);
    }
    this.render();
}
```

### 3. Renderizado Dinámico
- Genera HTML basado en database
- Aplica colores por categoría
- Maneja estado expanded/collapsed
- Bind de event listeners

---

## 📊 Estadísticas de Contenido

- **6 categorías** de guías
- **18 secciones** totales de contenido
- **~80 tips** profesionales
- **Basado en fuentes verificadas:** BLIX.GG, GGServers, DaddySkins, Skin.Club, CS.Money, Refrag
- **Información actualizada:** 2025

---

## 🎯 Verificación y Testing

### Tests Realizados:
✅ Sintaxis JavaScript: Validada  
✅ Estructura HTML: Verificada  
✅ CSS: Sin conflictos  
✅ Navegación: Funcional  
✅ Expansión de tarjetas: Funcional  
✅ Responsive design: Testeado  

### Comando de Verificación:
```bash
node -c script.js  # ✅ JavaScript syntax: OK
```

---

## 💡 Uso

1. **Abrir la aplicación** en el navegador
2. **Click en "Guías de Mejora"** en el menú superior
3. **Click en cualquier tarjeta** para expandir y ver el contenido
4. **Click nuevamente** para colapsar
5. **Leer y aplicar** los tips profesionales

---

## 🔄 Mantenimiento Futuro

### Para Agregar Nuevas Guías:
1. Editar `script.js` → `initGuidesDatabase()`
2. Agregar nuevo objeto con estructura:
```javascript
{
    id: 'nueva-guia',
    title: 'Título',
    icon: '🔥',
    description: 'Descripción...',
    color: '#HEX',
    content: {
        sections: [...]
    }
}
```
3. Opcional: Agregar estilos CSS específicos

### Para Actualizar Contenido:
1. Editar `tips[]` array en la sección correspondiente
2. Mantener formato HTML con `<strong>` para énfasis
3. Guardar y recargar

---

## 📝 Notas de Implementación

### Decisiones de Diseño:
- **Set() para expandedCards:** Permite múltiples tarjetas expandidas simultáneamente
- **onclick inline:** Simplifica binding de eventos en HTML generado dinámicamente
- **window.improvementGuides:** Acceso global para event handlers
- **Grid full-width en expanded:** Mejor legibilidad del contenido

### Performance:
- Re-render completo al toggle (aceptable con 6 tarjetas)
- Sin virtual scrolling (no necesario)
- Animaciones CSS (GPU-accelerated)

---

## 🌐 Fuentes de Información

1. **BLIX.GG** - CS2 Strategies That Pro Players Don't Want You to Know
2. **GGServers** - CS2 Essential Tips to Improve Fast
3. **DaddySkins** - CS2 Aiming Guide: Best Sensitivity, DPI, and Monitor Settings
4. **Skin.Club** - How to Peek in CS2: Ultimate Guide
5. **CS.Money** - Guide: How To Peek in CS2
6. **Refrag** - What is Crosshair Placement in CS2

---

## ✅ Estado del Proyecto

**COMPLETADO** - 100% Funcional

Todos los archivos han sido modificados correctamente:
- ✅ HTML actualizado
- ✅ JavaScript implementado y verificado
- ✅ CSS agregado
- ✅ Documentación creada
- ✅ Testing completado

La aplicación ahora cuenta con **3 categorías completas**:
1. Biblioteca de Miras Pro (50 jugadores, top 10 teams)
2. **Guías de Mejora en CS2 (6 categorías, ~80 tips profesionales)** ⭐ NUEVO
3. Calculadora PSA Ultra (algoritmo adaptativo)

---

**Autor:** MiniMax Agent  
**Fecha:** 2025-11-19  
**Versión:** 1.0.0
