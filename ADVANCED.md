# ⚙️ Configuración Avanzada y Tips

## 🎯 Consejos para Obtener Mejores Resultados

### Antes de Empezar

1. **Limpia tu mousepad**: Asegúrate de que esté libre de polvo y suciedad
2. **Verifica tu mouse**: Limpia el sensor óptico
3. **Posición consistente**: Usa siempre la misma posición de brazo/muñeca
4. **Entorno estable**: Prueba sin lag ni stuttering

### Durante el Proceso

1. **Tómate tu tiempo**: No hay prisa, prueba cada sensibilidad al menos 30 segundos
2. **Prueba en diferentes escenarios**:
   - 🎯 **Largo**: Bot estático a 30+ metros
   - 🎯 **Medio**: Bot a 10-20 metros
   - 🎯 **Corto**: Bot a <10 metros
3. **Movimientos variados**:
   - Tracking (seguimiento)
   - Flicks (movimientos rápidos)
   - Micro-ajustes
4. **Confía en tu instinto**: Elige la que se sienta más natural

### Después del Cálculo

1. **Compromiso**: Usa la sensibilidad final por 2-3 semanas mínimo
2. **Práctica diaria**: 30 minutos de aim training
3. **Paciencia**: La memoria muscular tarda en desarrollarse
4. **No cambies**: Evita la tentación de modificar constantemente

---

## 📊 Entendiendo los Números

### eDPI (Effective DPI)

**Fórmula**: `eDPI = DPI × Sensibilidad`

**Rangos típicos en CS2:**
- 🐌 **Bajo (400-800)**: Más precisión, menos movilidad
- ⚖️ **Medio (800-1200)**: Equilibrado (recomendado)
- ⚡ **Alto (1200-2000)**: Más movilidad, menos precisión
- 🚀 **Muy Alto (2000+)**: Estilo hiper-agresivo

**Ejemplos de pros:**
- s1mple: 1040 eDPI (400 DPI × 2.6)
- ZywOo: 1000 eDPI (400 DPI × 2.5)
- NiKo: 1600 eDPI (400 DPI × 4.0)
- device: 640 eDPI (400 DPI × 1.6)

### cm/360°

**Qué significa**: Centímetros que necesitas mover el mouse para rotar 360°

**Rangos típicos:**
- 🔍 **20-30 cm**: Alta sensibilidad
- ⚖️ **30-50 cm**: Medio (recomendado)
- 🎯 **50-70 cm**: Baja sensibilidad
- 🐌 **70+ cm**: Muy baja (snipers)

**Recomendaciones por rol:**
- **Entry Fragger**: 25-40 cm (más movilidad)
- **Rifler**: 30-50 cm (equilibrado)
- **AWPer**: 40-70 cm (más precisión)
- **Support**: 30-50 cm (versátil)

---

## 🎮 Optimización del Hardware

### Configuración del Mouse

1. **DPI nativo**: Usa el DPI nativo de tu sensor (generalmente 400, 800, 1600)
2. **Polling rate**: 1000 Hz recomendado
3. **Aceleración**: **DESACTIVADA** (crítico)
4. **Precisión del puntero**: Desactiva "Mejorar precisión del puntero" en Windows

### Configuración de Windows

**Desactivar aceleración del mouse:**

1. Panel de Control → Mouse → Opciones de puntero
2. Desmarcar "Mejorar la precisión del puntero"
3. Velocidad del puntero: 6/11 (centro)

**Desactivar Game Bar (Windows 11):**

```
Settings → Gaming → Xbox Game Bar → OFF
```

### Configuración en CS2

**Comandos importantes:**

```
// Sensibilidad
sensitivity "TU_VALOR_AQUI"

// Ratios de zoom (AWP/Scout)
zoom_sensitivity_ratio_mouse "1.0"

// Aceleración del mouse (debe estar en 0)
m_customaccel "0"
m_rawinput "1"  // Usar input directo del mouse
m_mousespeed "0" // Sin aceleración
```

**Archivo autoexec.cfg:**

Crea: `steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg/autoexec.cfg`

```
// Sensibilidad
sensitivity "1.234"  // Tu valor del PSA Calculator
zoom_sensitivity_ratio_mouse "1.0"

// Mouse settings
m_rawinput "1"
m_customaccel "0"
m_mousespeed "0"

// Performance
fps_max "0"  // Sin límite de FPS
fps_max_ui "999"

// Network
rate "786432"
cl_interp "0"
cl_interp_ratio "1"
cl_updaterate "128"
cl_cmdrate "128"

// Crosshair (personaliza)
cl_crosshairsize "2"
cl_crosshairgap "-2"
cl_crosshairthickness "0.5"
cl_crosshairstyle "4"
cl_crosshair_drawoutline "1"
cl_crosshaircolor "1"

// Game settings
cl_showfps "1"
net_graph "1"

// Sound
snd_musicvolume "0"
snd_deathcamera_volume "0"

echo "Autoexec loaded successfully!"
```

---

## 📈 Progreso y Tracking

### Hoja de Seguimiento

Crea una tabla para trackear tu progreso:

| Fecha | Sensibilidad | eDPI | Headshot % | K/D | Notas |
|-------|-------------|------|------------|-----|-------|
| 01/11 | 1.234 | 987 | 45% | 1.2 | Primera semana |
| 08/11 | 1.234 | 987 | 52% | 1.4 | Mejorando |
| 15/11 | 1.234 | 987 | 58% | 1.6 | Consistente |

### Mapas de Entrenamiento

**Workshop de Steam:**

1. **Aim Botz**: aim_botz
2. **Reflex Training**: training_aim_csgo2
3. **Fast Aim/Reflex**: Fast Aim/Reflex Training
4. **Yprac Arena**: yprac_arena

**Rutina diaria (30 min):**
- 10 min: Aim Botz (tracking y flicks)
- 10 min: Prefire maps
- 10 min: Deathmatch FFA

---

## 🔬 Algoritmo PSA en Detalle

### Cómo Funciona

El algoritmo usa **convergencia exponencial** para encontrar tu sensibilidad óptima:

```javascript
Iteración 1: Rango de ±35% (exploración amplia)
Iteración 2: Rango de ±21.7% (refinamiento)
Iteración 3: Rango de ±13.5%
Iteración 4: Rango de ±8.3%
Iteración 5: Rango de ±5.2%
Iteración 6: Rango de ±3.2%
Iteración 7: Rango de ±2.0% (precisión final)
```

### Factor de Convergencia

**Fórmula**: `factor = 0.35 × (0.62 ^ iteración)`

**Por qué funciona:**
- **Amplio al inicio**: Explora un rango amplio para encontrar la región correcta
- **Refinamiento progresivo**: Se enfoca cada vez más en el valor óptimo
- **7 iteraciones**: Balance entre precisión y tiempo
- **Convergencia garantizada**: Siempre converge a un valor estable

### Comparación con Otros Métodos

| Método | Tiempo | Precisión | Científico |
|--------|--------|-----------|-----------|
| **PSA** | ~10 min | ⭐⭐⭐⭐⭐ | ✅ |
| Trial & Error | Días/semanas | ⭐⭐⭐ | ❌ |
| Copiar pros | Inmediato | ⭐⭐ | ❌ |
| "Feel" testing | Variable | ⭐⭐⭐ | ❌ |

---

## 🛠️ Troubleshooting

### "No encuentro mi sensibilidad base"

**Solución:**
1. Usa una sensibilidad temporal alta (ej: 2.0)
2. Ajusta hasta que puedas hacer 360° con un swipe completo
3. Usa ese valor como base

### "Las opciones se sienten muy similares"

**Normal en iteraciones finales** (5-7):
- Las diferencias son pequeñas (~2-5%)
- Elige basándote en micro-ajustes
- Si realmente no puedes decidir, elige "Mayor" para convergencia más rápida

### "Mi resultado es muy diferente a mi sensibilidad actual"

**Posibles razones:**
1. Tu sensibilidad actual no es óptima
2. Diferentes técnicas de agarre/posición
3. Diferentes superficies de mousepad

**Qué hacer:**
- Confía en el proceso PSA
- Dale 2 semanas con la nueva sensibilidad
- Si después de 2 semanas no funciona, repite PSA

### "Quiero volver a mi sensibilidad antigua"

**NO recomendado**, pero si insistes:
- Anota tu eDPI actual antes de PSA
- Prueba PSA por 2 semanas completas
- Compara objetivamente (stats, demos)
- Solo vuelve si hay razones objetivas

---

## 📱 Versión PWA (Próximamente)

### Características Futuras

- 🔄 Uso offline
- 💾 Guardar múltiples cálculos
- 📊 Historial de todas tus pruebas
- 🎮 Comparación con sensibilidades de pros
- 🔄 Sincronización en la nube
- 📈 Analytics de progreso

---

## 🤝 Comunidad

### Comparte tus Resultados

**Formato recomendado:**
```
✅ PSA Calculator Results:
🎮 Juego: CS2
🖱️ DPI: 800
🎯 Sensibilidad: 1.234
📊 eDPI: 987.2
📏 cm/360°: 42.5 cm
⏱️ Tiempo de ajuste: 2 semanas
📈 Mejora en HS%: +13%
```

### Feedback

¿Encontraste un bug? ¿Tienes sugerencias?
- 📧 Abre un issue en GitHub
- 💬 Contacta al desarrollador
- ⭐ Dale una estrella al repo si te resultó útil

---

## 📚 Referencias Científicas

- [The Science of Aim](https://www.youtube.com/watch?v=example) - Análisis de sensibilidad
- [PSA Method Explained](https://psamethodcalculator.com) - Método original
- [Muscle Memory in Gaming](https://example.com) - Estudios científicos

---

**¡Buena suerte mejorando tu aim! 🎯**

*Recuerda: La consistencia es más importante que la sensibilidad perfecta.*
