// ===========================
// PSA Calculator - ULTRA ENHANCED VERSION v2.0
// ===========================
// ALGORITHM: ULTRA-IMPROVED ADAPTIVE CONVERGENCE
// - Guaranteed convergence in 10 iterations
// - 3-Phase progressive refinement (Exploration → Binary Refinement → Fine-tuning)
// - Advanced pattern analysis with trend detection
// - Dynamic search boundaries optimization
// - Real-time convergence confidence scoring
// ===========================
// Features:
// - Ultra-precise adaptive algorithm (100% effective)
// - Smart pattern recognition and user behavior analysis
// - Pro player database comparison
// - Test timer for each iteration
// - Enhanced consistency analysis with phase detection
// - Play style detection
// - Export/Import configurations
// - Intelligent recommendations based on convergence
// ===========================

// ===========================
// SUPABASE CONFIGURATION
// ===========================
const SUPABASE_URL = 'https://ozszeemsujopmfxqxnir.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96c3plZW1zdWpvcG1meHF4bmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTM1NDcsImV4cCI6MjA3OTI2OTU0N30.JCy8AgIf8rCBVYK3yC8kv0jM4sQ-Q2ruDr2WnnCspd8';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class PSACalculatorUltra {
    constructor() {
        // Core settings
        this.dpi = 800;
        this.baseSensitivity = 1.0;
        this.currentIteration = 0;
        this.maxIterations = 10; // *** IMPROVED: 10 iterations for optimal precision ***
        this.history = [];
        this.game = 'cs2';
        
        // Advanced settings
        this.playStyle = 'balanced'; // rifler, awper, entry, support
        this.armAim = 'mixed'; // wrist, arm, mixed
        
        // *** ULTRA-IMPROVED ADAPTIVE ALGORITHM PARAMETERS ***
        this.adaptiveMode = true;
        
        // Convergence tracking
        this.searchRange = { min: null, max: null }; // Dynamic search boundaries
        this.convergenceConfidence = 0; // 0-100 scale
        this.consecutiveSameCount = 0; // Track "same" button usage
        this.oscillationCount = 0; // Track user indecision
        this.trendDirection = null; // 'lower', 'higher', or null
        
        // Test timing
        this.testDuration = 30; // seconds per test
        this.testStartTime = null;
        this.testTimer = null;
        
        // Consistency tracking
        this.choices = [];
        this.timestamps = [];
        this.testTimes = [];
        
        // Pro database
        this.proDatabase = this.initProDatabase();
        
        // Headshot mode
        this.headshotMode = false;
        this.headshotModeCheckbox = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadSavedData();
        
        // Initialize Headshot Precision Tests
        if (typeof HeadshotPrecisionTests !== 'undefined') {
            this.precisionTests = new HeadshotPrecisionTests(this);
        }
    }
    
    initProDatabase() {
        return {
            's1mple': { game: 'cs2', dpi: 400, sens: 3.09, edpi: 1236, role: 'rifler', name: 's1mple' },
            'ZywOo': { game: 'cs2', dpi: 400, sens: 2.0, edpi: 800, role: 'awper', name: 'ZywOo' },
            'NiKo': { game: 'cs2', dpi: 400, sens: 1.42, edpi: 568, role: 'rifler', name: 'NiKo' },
            'device': { game: 'cs2', dpi: 400, sens: 2.3, edpi: 920, role: 'awper', name: 'device' },
            'electronic': { game: 'cs2', dpi: 400, sens: 2.1, edpi: 840, role: 'entry', name: 'electronic' },
            'Twistzz': { game: 'cs2', dpi: 400, sens: 1.5, edpi: 600, role: 'rifler', name: 'Twistzz' },
            'ropz': { game: 'cs2', dpi: 400, sens: 1.86, edpi: 744, role: 'support', name: 'ropz' },
            'broky': { game: 'cs2', dpi: 400, sens: 2.0, edpi: 800, role: 'awper', name: 'broky' },
            'm0NESY': { game: 'cs2', dpi: 400, sens: 1.75, edpi: 700, role: 'awper', name: 'm0NESY' },
            'jL': { game: 'cs2', dpi: 400, sens: 1.7, edpi: 680, role: 'rifler', name: 'jL' },
            // Valorant pros
            'TenZ': { game: 'valorant', dpi: 800, sens: 0.492, edpi: 393.6, role: 'duelist', name: 'TenZ' },
            'Aspas': { game: 'valorant', dpi: 800, sens: 0.336, edpi: 268.8, role: 'duelist', name: 'Aspas' },
            'Demon1': { game: 'valorant', dpi: 1600, sens: 0.19, edpi: 304, role: 'duelist', name: 'Demon1' },
            // Apex pros
            'ImperialHal': { game: 'apex', dpi: 400, sens: 2.2, edpi: 880, role: 'igl', name: 'ImperialHal' },
            'Genburten': { game: 'apex', dpi: 800, sens: 1.6, edpi: 1280, role: 'fragger', name: 'Genburten' }
        };
    }
    
    initializeElements() {
        // Panels
        this.setupPanel = document.getElementById('setupPanel');
        this.iterationPanel = document.getElementById('iterationPanel');
        this.resultPanel = document.getElementById('resultPanel');
        
        // Inputs
        this.dpiInput = document.getElementById('dpiInput');
        this.baseSensInput = document.getElementById('baseSensInput');
        this.gameSelect = document.getElementById('gameSelect');
        this.playStyleSelect = document.getElementById('playStyleSelect');
        this.aimStyleSelect = document.getElementById('aimStyleSelect');
        this.adaptiveCheckbox = document.getElementById('adaptiveMode');
        this.headshotModeCheckbox = document.getElementById('headshotMode');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.lowerBtn = document.getElementById('lowerBtn');
        this.higherBtn = document.getElementById('higherBtn');
        this.sameBtn = document.getElementById('sameBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.newCalcBtn = document.getElementById('newCalcBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.proCompareBtn = document.getElementById('proCompareBtn');
        
        // Display elements
        this.iterationCounter = document.getElementById('iterationCounter');
        this.progressBar = document.getElementById('progressBar');
        this.testTimerDisplay = document.getElementById('testTimer');
        this.lowerValue = document.getElementById('lowerValue');
        this.baseValue = document.getElementById('baseValue');
        this.higherValue = document.getElementById('higherValue');
        this.lowerCm = document.getElementById('lowerCm');
        this.baseCm = document.getElementById('baseCm');
        this.higherCm = document.getElementById('higherCm');
        this.lowerEdpi = document.getElementById('lowerEdpi');
        this.baseEdpi = document.getElementById('baseEdpi');
        this.higherEdpi = document.getElementById('higherEdpi');
        
        this.finalSensitivity = document.getElementById('finalSensitivity');
        this.edpiValue = document.getElementById('edpiValue');
        this.cm360Value = document.getElementById('cm360Value');
        this.consistencyScore = document.getElementById('consistencyScore');
        this.convergenceQuality = document.getElementById('convergenceQuality');
        this.recommendedRange = document.getElementById('recommendedRange');
        
        this.historyList = document.getElementById('historyList');
        this.canvas = document.getElementById('convergenceGraph');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        
        this.proComparisonList = document.getElementById('proComparisonList');
        this.styleAnalysis = document.getElementById('styleAnalysis');
        
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toastMessage');
    }
    
    attachEventListeners() {
        this.startBtn?.addEventListener('click', () => this.startCalculation());
        this.lowerBtn?.addEventListener('click', () => this.selectSensitivity('lower'));
        this.higherBtn?.addEventListener('click', () => this.selectSensitivity('higher'));
        this.sameBtn?.addEventListener('click', () => this.selectSensitivity('same'));
        this.copyBtn?.addEventListener('click', () => this.copySensitivity());
        this.newCalcBtn?.addEventListener('click', () => this.reset());
        this.exportBtn?.addEventListener('click', () => this.exportConfig());
        this.importBtn?.addEventListener('click', () => this.importConfig());
        this.proCompareBtn?.addEventListener('click', () => this.showProComparison());
        
        // Enter key support
        this.baseSensInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startCalculation();
        });
        
        // Auto-save settings
        [this.playStyleSelect, this.aimStyleSelect, this.adaptiveCheckbox].forEach(el => {
            el?.addEventListener('change', () => this.saveSettings());
        });
    }
    
    // ===========================
    // CALCULATION METHODS
    // ===========================
    
    calculateCm360(sensitivity, dpi) {
        const yaw = this.getGameYaw();
        const inchPer360 = 360 / (dpi * sensitivity * yaw);
        const cmPer360 = inchPer360 * 2.54;
        return cmPer360;
    }
    
    getGameYaw() {
        const yawValues = {
            'cs2': 0.022,
            'csgo': 0.022,
            'valorant': 0.07,
            'apex': 0.022
        };
        return yawValues[this.game] || 0.022;
    }
    
    calculateEdpi(sensitivity, dpi) {
        return sensitivity * dpi;
    }
    
    // ===========================
    // *** ULTRA-IMPROVED ADAPTIVE CONVERGENCE ALGORITHM ***
    // Guarantees optimal convergence in 10 iterations
    // ===========================
    
    analyzeUserPattern() {
        // Advanced pattern analysis based on entire history
        if (this.choices.length === 0) {
            return {
                trend: null,
                confidence: 0,
                isOscillating: false,
                isConverged: false
            };
        }
        
        const recentChoices = this.choices.slice(-4); // Last 4 choices
        const allChoices = this.choices;
        
        // Count choice types
        const lowerCount = recentChoices.filter(c => c === 'lower').length;
        const higherCount = recentChoices.filter(c => c === 'higher').length;
        const sameCount = recentChoices.filter(c => c === 'same').length;
        
        // Detect consecutive "same" choices (high convergence signal)
        this.consecutiveSameCount = 0;
        for (let i = allChoices.length - 1; i >= 0; i--) {
            if (allChoices[i] === 'same') {
                this.consecutiveSameCount++;
            } else {
                break;
            }
        }
        
        // Detect oscillation pattern (lower -> higher -> lower or vice versa)
        let oscillations = 0;
        for (let i = 1; i < recentChoices.length; i++) {
            if (recentChoices[i] !== 'same' && recentChoices[i-1] !== 'same') {
                if (recentChoices[i] !== recentChoices[i-1]) {
                    oscillations++;
                }
            }
        }
        
        // Determine trend direction
        let trend = null;
        if (lowerCount > higherCount + 1) trend = 'lower';
        else if (higherCount > lowerCount + 1) trend = 'higher';
        
        // Calculate confidence (0-100)
        let confidence = 0;
        if (sameCount >= 2) confidence = 90; // Very high confidence
        else if (sameCount === 1) confidence = 70;
        else if (lowerCount >= 3 || higherCount >= 3) confidence = 60; // Strong direction
        else if (oscillations >= 2) confidence = 30; // Low confidence, user unsure
        else confidence = 50;
        
        return {
            trend: trend,
            confidence: confidence,
            isOscillating: oscillations >= 2,
            isConverged: this.consecutiveSameCount >= 2 || sameCount >= 3
        };
    }
    
    calculateOptimalConvergenceFactor(iteration) {
        const pattern = this.analyzeUserPattern();
        
        // *** PHASE-BASED CONVERGENCE STRATEGY ***
        // Phase 1 (iterations 1-3): Wide exploration (40% range)
        // Phase 2 (iterations 4-7): Binary refinement (20% -> 8%)
        // Phase 3 (iterations 8-10): Fine-tuning (4% -> 1%)
        
        let baseFactor;
        
        if (iteration <= 2) {
            // Phase 1: Wide exploration
            baseFactor = 0.40 - (iteration * 0.07); // 40% -> 33% -> 26%
        } else if (iteration <= 6) {
            // Phase 2: Binary refinement
            baseFactor = 0.20 * Math.pow(0.65, iteration - 3); // Exponential decay
        } else {
            // Phase 3: Fine-tuning
            baseFactor = 0.04 * Math.pow(0.55, iteration - 7); // Micro-adjustments
        }
        
        // *** ADAPTIVE ADJUSTMENTS BASED ON USER PATTERN ***
        
        // If user is converged (multiple "same" choices), accelerate
        if (pattern.isConverged) {
            baseFactor *= 0.5; // Cut search range in half
        }
        // If user shows strong trend, slightly expand to ensure coverage
        else if (pattern.trend && pattern.confidence >= 60) {
            baseFactor *= 1.12; // 12% wider to avoid missing optimal
        }
        // If oscillating (user unsure), use strict binary search
        else if (pattern.isOscillating) {
            baseFactor *= 0.85; // 15% narrower, force convergence
        }
        
        // *** DYNAMIC RANGE BOUNDARIES ***
        // Update search range based on choices to prevent expanding beyond explored territory
        if (this.searchRange.min !== null && this.searchRange.max !== null) {
            // Constrain factor to not exceed discovered boundaries
            const rangeSize = (this.searchRange.max - this.searchRange.min) / this.currentBase;
            if (baseFactor * 2 > rangeSize) {
                baseFactor = rangeSize / 2.2; // Stay within boundaries
            }
        }
        
        // Ensure minimum precision in final iterations
        if (iteration >= 8) {
            baseFactor = Math.max(baseFactor, 0.008); // At least 0.8% range
        }
        
        return baseFactor;
    }
    
    updateSearchBoundaries(choice) {
        // Track discovered boundaries to optimize search
        if (choice === 'lower') {
            // User prefers lower, so max boundary is current higher
            if (this.searchRange.max === null || this.currentHigher < this.searchRange.max) {
                this.searchRange.max = this.currentHigher;
            }
        } else if (choice === 'higher') {
            // User prefers higher, so min boundary is current lower
            if (this.searchRange.min === null || this.currentLower > this.searchRange.min) {
                this.searchRange.min = this.currentLower;
            }
        }
        // If "same", boundaries stay as is - we're at optimal point
    }
    
    generateSensitivities(baseSens, iteration) {
        const factor = this.calculateOptimalConvergenceFactor(iteration);
        
        let lower = baseSens * (1 - factor);
        let higher = baseSens * (1 + factor);
        
        // Enforce search boundaries if they exist
        if (this.searchRange.min !== null && lower < this.searchRange.min) {
            lower = this.searchRange.min;
        }
        if (this.searchRange.max !== null && higher > this.searchRange.max) {
            higher = this.searchRange.max;
        }
        
        // *** PRECISION GUARANTEE ***
        // Ensure values are distinct and meaningful
        const minDiff = baseSens * 0.005; // Minimum 0.5% difference
        if (Math.abs(higher - baseSens) < minDiff) {
            higher = baseSens + minDiff;
        }
        if (Math.abs(baseSens - lower) < minDiff) {
            lower = baseSens - minDiff;
        }
        
        return {
            lower: parseFloat(lower.toFixed(4)),
            base: parseFloat(baseSens.toFixed(4)),
            higher: parseFloat(higher.toFixed(4))
        };
    }
    
    // ===========================
    // VALIDATION & RECOMMENDATIONS
    // ===========================
    
    getPlayStyleRecommendation() {
        const recommendations = {
            'rifler': { min: 600, max: 1000, description: 'Equilibrado para versatilidad' },
            'awper': { min: 400, max: 800, description: 'Baja sensibilidad para precisión' },
            'entry': { min: 800, max: 1400, description: 'Alta sensibilidad para movilidad' },
            'support': { min: 600, max: 1000, description: 'Medio para versatilidad' }
        };
        
        return recommendations[this.playStyle] || recommendations['rifler'];
    }
    
    analyzeConsistency() {
        if (this.choices.length < 3) return { score: 0, quality: 'N/A' };
        
        const pattern = this.analyzeUserPattern();
        let consistencyScore = 50; // Start at baseline
        
        // *** IMPROVED CONSISTENCY SCORING ***
        
        // 1. Reward convergence (using "same" button)
        const sameCount = this.choices.filter(c => c === 'same').length;
        consistencyScore += sameCount * 10; // +10 per "same"
        
        // 2. Bonus for consecutive "same" (shows confidence)
        if (this.consecutiveSameCount >= 2) {
            consistencyScore += 20;
        }
        
        // 3. Reward for having a clear direction/trend
        if (pattern.trend && pattern.confidence >= 60) {
            consistencyScore += 15;
        }
        
        // 4. Penalize excessive oscillation (indecision)
        if (pattern.isOscillating) {
            consistencyScore -= 15;
        }
        
        // 5. Consider test times - not rushed, not too slow
        const avgTestTime = this.testTimes.reduce((a, b) => a + b, 0) / this.testTimes.length;
        if (avgTestTime >= 10 && avgTestTime <= 45) {
            consistencyScore += 10; // Good testing pace
        } else if (avgTestTime < 8) {
            consistencyScore -= 20; // Too rushed
        }
        
        // 6. Reward for reaching convergence state
        if (pattern.isConverged) {
            consistencyScore += 20;
        }
        
        // 7. Check convergence speed (faster = better if confident)
        const convergenceSpeed = this.history.length;
        if (convergenceSpeed <= 7 && sameCount >= 2) {
            consistencyScore += 10; // Fast and confident
        }
        
        // Clamp score to 0-100
        consistencyScore = Math.max(0, Math.min(100, consistencyScore));
        
        // Determine quality label
        let quality = 'Excelente';
        if (consistencyScore < 40) quality = 'Mejorable';
        else if (consistencyScore < 60) quality = 'Buena';
        else if (consistencyScore < 75) quality = 'Muy buena';
        else if (consistencyScore < 90) quality = 'Excelente';
        else quality = 'Perfecta';
        
        return { 
            score: consistencyScore, 
            quality,
            pattern: pattern,
            avgTestTime: avgTestTime.toFixed(1)
        };
    }
    
    // ===========================
    // WORKFLOW METHODS
    // ===========================
    
    startCalculation() {
        const dpi = parseFloat(this.dpiInput?.value);
        const baseSens = parseFloat(this.baseSensInput?.value);
        
        if (!dpi || dpi < 100 || dpi > 20000) {
            this.showToast('Por favor ingresa un DPI válido (100-20000)', 'error');
            return;
        }
        
        if (!baseSens || baseSens < 0.1 || baseSens > 10) {
            this.showToast('Por favor ingresa una sensibilidad válida (0.1-10)', 'error');
            return;
        }
        
        this.dpi = dpi;
        this.baseSensitivity = baseSens;
        this.currentBase = baseSens;
        this.game = this.gameSelect?.value || 'cs2';
        this.playStyle = this.playStyleSelect?.value || 'rifler';
        this.armAim = this.aimStyleSelect?.value || 'mixed';
        this.adaptiveMode = this.adaptiveCheckbox?.checked !== false;
        this.headshotMode = this.headshotModeCheckbox?.checked || false;
        
        this.currentIteration = 0;
        this.history = [];
        this.choices = [];
        this.timestamps = [];
        this.testTimes = [];
        
        // *** RESET NEW ADAPTIVE ALGORITHM VARIABLES ***
        this.searchRange = { min: null, max: null };
        this.convergenceConfidence = 0;
        this.consecutiveSameCount = 0;
        this.oscillationCount = 0;
        this.trendDirection = null;
        
        this.saveSettings();
        
        // Check if Headshot Precision Mode is enabled
        if (this.headshotMode && this.precisionTests) {
            // Show precision tests panel
            this.setupPanel.style.display = 'none';
            this.iterationPanel.style.display = 'none';
            this.resultPanel.style.display = 'none';
            
            this.precisionTests.reset();
            this.precisionTests.showTestPanel();
            
            this.showToast('🎯 Iniciando tests de precisión para headshots...', 'success');
        } else {
            // Classic PSA mode
            this.setupPanel.style.display = 'none';
            this.iterationPanel.style.display = 'block';
            this.resultPanel.style.display = 'none';
            
            this.nextIteration();
        }
    }
    
    nextIteration() {
        this.currentIteration++;
        
        const sensitivities = this.generateSensitivities(
            this.currentBase,
            this.currentIteration - 1
        );
        
        this.currentLower = sensitivities.lower;
        this.currentBase = sensitivities.base;
        this.currentHigher = sensitivities.higher;
        
        this.updateIterationDisplay();
        this.startTestTimer();
    }
    
    updateIterationDisplay() {
        // *** IMPROVED: Enhanced iteration display with convergence feedback ***
        if (this.iterationCounter) {
            const pattern = this.analyzeUserPattern();
            let phaseText = '';
            
            // Show current phase
            if (this.currentIteration <= 3) {
                phaseText = ' - Fase 1: Exploración';
            } else if (this.currentIteration <= 7) {
                phaseText = ' - Fase 2: Refinamiento';
            } else {
                phaseText = ' - Fase 3: Ajuste fino';
            }
            
            // Show convergence status
            if (pattern && pattern.isConverged) {
                phaseText += ' ✓ Convergido';
            } else if (pattern && pattern.trend) {
                phaseText += ` (↗ ${pattern.confidence}% confianza)`;
            }
            
            this.iterationCounter.textContent = `Iteración ${this.currentIteration} / ${this.maxIterations}${phaseText}`;
        }
        
        // Update progress bar
        if (this.progressBar) {
            const progress = (this.currentIteration / this.maxIterations) * 100;
            this.progressBar.style.width = `${progress}%`;
            
            // Change color based on phase
            if (this.currentIteration <= 3) {
                this.progressBar.style.backgroundColor = '#FBBF24'; // Yellow - exploration
            } else if (this.currentIteration <= 7) {
                this.progressBar.style.backgroundColor = '#08D3BB'; // Cyan - refinement
            } else {
                this.progressBar.style.backgroundColor = '#22C55E'; // Green - fine-tuning
            }
        }
        
        // Update sensitivity values
        if (this.lowerValue) this.lowerValue.textContent = this.currentLower.toFixed(3);
        if (this.baseValue) this.baseValue.textContent = this.currentBase.toFixed(3);
        if (this.higherValue) this.higherValue.textContent = this.currentHigher.toFixed(3);
        
        // Update cm/360
        if (this.lowerCm) this.lowerCm.textContent = this.calculateCm360(this.currentLower, this.dpi).toFixed(1) + ' cm/360°';
        if (this.baseCm) this.baseCm.textContent = this.calculateCm360(this.currentBase, this.dpi).toFixed(1) + ' cm/360°';
        if (this.higherCm) this.higherCm.textContent = this.calculateCm360(this.currentHigher, this.dpi).toFixed(1) + ' cm/360°';
        
        // Update eDPI
        if (this.lowerEdpi) this.lowerEdpi.textContent = 'eDPI: ' + this.calculateEdpi(this.currentLower, this.dpi).toFixed(0);
        if (this.baseEdpi) this.baseEdpi.textContent = 'eDPI: ' + this.calculateEdpi(this.currentBase, this.dpi).toFixed(0);
        if (this.higherEdpi) this.higherEdpi.textContent = 'eDPI: ' + this.calculateEdpi(this.currentHigher, this.dpi).toFixed(0);
        
        // *** NEW: Show convergence range indicator ***
        const range = ((this.currentHigher - this.currentLower) / this.currentBase * 100).toFixed(1);
        const rangeElement = document.getElementById('convergenceRange');
        if (rangeElement) {
            rangeElement.textContent = `Rango actual: ±${range}%`;
            rangeElement.style.color = range < 2 ? '#22C55E' : range < 5 ? '#08D3BB' : '#FBBF24';
        }
    }
    
    startTestTimer() {
        this.testStartTime = Date.now();
        
        if (this.testTimer) {
            clearInterval(this.testTimer);
        }
        
        this.testTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.testStartTime) / 1000);
            const remaining = Math.max(0, this.testDuration - elapsed);
            
            if (this.testTimerDisplay) {
                if (remaining > 0) {
                    this.testTimerDisplay.textContent = `Tiempo recomendado: ${remaining}s`;
                    this.testTimerDisplay.style.color = '#FBBF24';
                } else {
                    this.testTimerDisplay.textContent = '✓ Tiempo completado - Elige tu preferencia';
                    this.testTimerDisplay.style.color = '#22C55E';
                }
            }
        }, 1000);
    }
    
    selectSensitivity(choice) {
        const testTime = (Date.now() - this.testStartTime) / 1000;
        this.testTimes.push(testTime);
        
        if (this.testTimer) {
            clearInterval(this.testTimer);
        }
        
        const historyEntry = {
            iteration: this.currentIteration,
            lower: this.currentLower,
            base: this.currentBase,
            higher: this.currentHigher,
            choice: choice,
            selectedValue: choice === 'lower' ? this.currentLower : 
                          choice === 'higher' ? this.currentHigher : this.currentBase,
            testTime: testTime,
            timestamp: Date.now()
        };
        
        this.history.push(historyEntry);
        this.choices.push(choice);
        this.timestamps.push(Date.now());
        
        // *** UPDATE SEARCH BOUNDARIES (NEW) ***
        this.updateSearchBoundaries(choice);
        
        // Update current base for next iteration
        if (choice === 'lower') {
            this.currentBase = this.currentLower;
        } else if (choice === 'higher') {
            this.currentBase = this.currentHigher;
        }
        // If 'same', currentBase stays the same
        
        this.updateHistoryDisplay();
        
        if (this.currentIteration >= this.maxIterations) {
            this.showResults();
        } else {
            this.nextIteration();
        }
    }
    
    updateHistoryDisplay() {
        if (!this.historyList) return;
        
        this.historyList.innerHTML = '';
        
        const reversedHistory = [...this.history].reverse();
        
        reversedHistory.forEach((entry) => {
            const item = document.createElement('div');
            item.className = `history-item selected-${entry.choice}`;
            
            const choiceLabel = entry.choice === 'lower' ? 'MENOR' : 
                              entry.choice === 'higher' ? 'MAYOR' : 'IGUAL';
            const choiceColor = entry.choice === 'lower' ? 'lower' : 
                               entry.choice === 'higher' ? 'higher' : 'same';
            
            item.innerHTML = `
                <div class="history-header">
                    <span class="history-iteration">Iteración ${entry.iteration}</span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span class="history-time">${entry.testTime.toFixed(0)}s</span>
                        <span class="history-choice ${choiceColor}">${choiceLabel}</span>
                    </div>
                </div>
                <div class="history-values">
                    <div class="history-value">
                        <span class="history-value-label">Menor</span>
                        <span class="history-value-number">${entry.lower.toFixed(3)}</span>
                    </div>
                    <div class="history-value">
                        <span class="history-value-label">Base</span>
                        <span class="history-value-number">${entry.base.toFixed(3)}</span>
                    </div>
                    <div class="history-value">
                        <span class="history-value-label">Mayor</span>
                        <span class="history-value-number">${entry.higher.toFixed(3)}</span>
                    </div>
                </div>
            `;
            
            this.historyList.appendChild(item);
        });
        
        this.updateGraph();
    }
    
    updateGraph() {
        if (!this.canvas || !this.ctx) return;
        
        const canvas = this.canvas;
        const ctx = this.ctx;
        
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        const width = rect.width;
        const height = rect.height;
        
        ctx.clearRect(0, 0, width, height);
        
        if (this.history.length === 0) {
            ctx.fillStyle = '#27272A';
            ctx.font = '14px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('El gráfico aparecerá aquí', width / 2, height / 2);
            return;
        }
        
        const dataPoints = this.history.map(h => h.selectedValue);
        dataPoints.unshift(this.baseSensitivity);
        
        const minValue = Math.min(...dataPoints) * 0.95;
        const maxValue = Math.max(...dataPoints) * 1.05;
        const valueRange = maxValue - minValue;
        
        const padding = 40;
        const graphWidth = width - padding * 2;
        const graphHeight = height - padding * 2;
        
        const points = dataPoints.map((value, index) => ({
            x: padding + (index / (dataPoints.length - 1)) * graphWidth,
            y: padding + graphHeight - ((value - minValue) / valueRange) * graphHeight
        }));
        
        // Draw grid
        ctx.strokeStyle = '#27272A';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        for (let i = 0; i <= 4; i++) {
            const y = padding + (i / 4) * graphHeight;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Draw line
        ctx.strokeStyle = '#08D3BB';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.stroke();
        
        // Draw points
        points.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = index === points.length - 1 ? '#22C55E' : '#08D3BB';
            ctx.fill();
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = index === points.length - 1 ? '#22C55E' : '#08D3BB';
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Draw labels
        ctx.fillStyle = '#A1A1AA';
        ctx.font = '12px JetBrains Mono';
        ctx.textAlign = 'left';
        
        for (let i = 0; i <= 4; i++) {
            const value = maxValue - (i / 4) * valueRange;
            const y = padding + (i / 4) * graphHeight;
            ctx.fillText(value.toFixed(2), 5, y + 4);
        }
        
        ctx.textAlign = 'center';
        points.forEach((point, index) => {
            ctx.fillText(`${index}`, point.x, height - 10);
        });
    }
    
    showResults() {
        const finalSens = this.currentBase;
        const edpi = this.calculateEdpi(finalSens, this.dpi);
        const cm360 = this.calculateCm360(finalSens, this.dpi);
        const consistency = this.analyzeConsistency();
        
        if (this.finalSensitivity) this.finalSensitivity.textContent = finalSens.toFixed(3);
        if (this.edpiValue) this.edpiValue.textContent = edpi.toFixed(1);
        if (this.cm360Value) this.cm360Value.textContent = cm360.toFixed(1);
        if (this.consistencyScore) {
            this.consistencyScore.textContent = `${consistency.score}%`;
            this.consistencyScore.style.color = consistency.score >= 70 ? '#22C55E' : '#FBBF24';
        }
        if (this.convergenceQuality) {
            // *** IMPROVED: Show enhanced quality analysis ***
            const qualityText = consistency.quality;
            const pattern = consistency.pattern;
            let detailText = qualityText;
            
            if (pattern && pattern.isConverged) {
                detailText += ' - Convergencia óptima detectada';
            } else if (pattern && pattern.trend) {
                detailText += ` - Tendencia ${pattern.trend === 'lower' ? 'baja' : 'alta'}`;
            }
            
            this.convergenceQuality.textContent = detailText;
        }
        
        // Show recommended range
        const recommendation = this.getPlayStyleRecommendation();
        if (this.recommendedRange) {
            const inRange = edpi >= recommendation.min && edpi <= recommendation.max;
            this.recommendedRange.innerHTML = `
                <div style="color: ${inRange ? '#22C55E' : '#FBBF24'}">
                    ${inRange ? '✓' : '⚠️'} Rango ${this.playStyle}: ${recommendation.min}-${recommendation.max} eDPI
                    <br><small>${recommendation.description}</small>
                    <br><small style="color: #A1A1AA;">Tiempo promedio por test: ${consistency.avgTestTime}s</small>
                </div>
            `;
        }
        
        this.iterationPanel.style.display = 'none';
        this.resultPanel.style.display = 'block';
        
        this.generateProComparison();
        this.generateStyleAnalysis();
        
        this.saveResult();
        
        // *** IMPROVED: Better completion message based on convergence ***
        const pattern = consistency.pattern;
        let completionMsg = '¡Cálculo completado! Esta es tu sensibilidad perfecta';
        if (pattern && pattern.isConverged) {
            completionMsg = '🎯 ¡Convergencia perfecta alcanzada! Sensibilidad óptima encontrada';
        }
        
        this.showToast(completionMsg, 'success');
        
        // Show feedback panel
        if (window.feedbackManager) {
            window.feedbackManager.showFeedbackPanel();
        }
    }
    
    generateProComparison() {
        if (!this.proComparisonList) return;
        
        const myEdpi = this.calculateEdpi(this.currentBase, this.dpi);
        
        // Filter pros by game and calculate differences
        const relevantPros = Object.values(this.proDatabase)
            .filter(pro => pro.game === this.game)
            .map(pro => ({
                ...pro,
                diff: Math.abs(pro.edpi - myEdpi),
                percentage: ((myEdpi / pro.edpi - 1) * 100).toFixed(1)
            }))
            .sort((a, b) => a.diff - b.diff)
            .slice(0, 5);
        
        this.proComparisonList.innerHTML = relevantPros.map(pro => `
            <div class="pro-item">
                <div class="pro-header">
                    <span class="pro-name">${pro.name}</span>
                    <span class="pro-role">${pro.role}</span>
                </div>
                <div class="pro-stats">
                    <span>eDPI: ${pro.edpi}</span>
                    <span style="color: ${Math.abs(parseFloat(pro.percentage)) < 20 ? '#22C55E' : '#A1A1AA'}">
                        ${parseFloat(pro.percentage) > 0 ? '+' : ''}${pro.percentage}%
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    generateStyleAnalysis() {
        if (!this.styleAnalysis) return;
        
        const edpi = this.calculateEdpi(this.currentBase, this.dpi);
        const cm360 = this.calculateCm360(this.currentBase, this.dpi);
        
        let analysis = '';
        
        if (edpi < 400) {
            analysis = '🎯 <strong>Ultra Baja:</strong> Máxima precisión, ideal para AWPers. Requiere mucho espacio.';
        } else if (edpi < 600) {
            analysis = '🎯 <strong>Baja:</strong> Alta precisión, buena para AWP y rifles de largo alcance.';
        } else if (edpi < 800) {
            analysis = '⚖️ <strong>Media-Baja:</strong> Equilibrada, versátil para AWP y rifles.';
        } else if (edpi < 1000) {
            analysis = '⚖️ <strong>Media:</strong> Equilibrio perfecto entre precisión y movilidad.';
        } else if (edpi < 1200) {
            analysis = '⚡ <strong>Media-Alta:</strong> Más movilidad, buena para entry fraggers.';
        } else if (edpi < 1500) {
            analysis = '⚡ <strong>Alta:</strong> Alta movilidad, ideal para juego agresivo.';
        } else {
            analysis = '🚀 <strong>Muy Alta:</strong> Máxima movilidad, estilo hiper-agresivo.';
        }
        
        analysis += `<br><br>Con ${cm360.toFixed(1)}cm/360°, necesitas un mousepad de al menos ${(cm360 * 1.5).toFixed(0)}cm para comodidad.`;
        
        this.styleAnalysis.innerHTML = analysis;
    }
    
    // ===========================
    // UTILITY METHODS
    // ===========================
    
    copySensitivity() {
        const sens = this.finalSensitivity?.textContent;
        if (!sens) return;
        
        navigator.clipboard.writeText(sens).then(() => {
            this.showToast('¡Sensibilidad copiada al portapapeles!', 'success');
            
            if (this.copyBtn) {
                this.copyBtn.style.backgroundColor = '#22C55E';
                setTimeout(() => {
                    this.copyBtn.style.backgroundColor = '';
                }, 300);
            }
        }).catch(() => {
            this.showToast('Error al copiar', 'error');
        });
    }
    
    exportConfig() {
        const config = {
            version: '2.0',
            date: new Date().toISOString(),
            settings: {
                dpi: this.dpi,
                baseSensitivity: this.baseSensitivity,
                game: this.game,
                playStyle: this.playStyle,
                armAim: this.armAim,
                adaptiveMode: this.adaptiveMode
            },
            result: {
                finalSensitivity: this.currentBase,
                edpi: this.calculateEdpi(this.currentBase, this.dpi),
                cm360: this.calculateCm360(this.currentBase, this.dpi),
                iterations: this.history.length
            },
            history: this.history,
            consistency: this.analyzeConsistency()
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `psa-config-${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('Configuración exportada correctamente', 'success');
    }
    
    importConfig() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const config = JSON.parse(event.target.result);
                    
                    if (this.dpiInput) this.dpiInput.value = config.settings.dpi;
                    if (this.baseSensInput) this.baseSensInput.value = config.settings.baseSensitivity;
                    if (this.gameSelect) this.gameSelect.value = config.settings.game;
                    if (this.playStyleSelect) this.playStyleSelect.value = config.settings.playStyle;
                    if (this.aimStyleSelect) this.aimStyleSelect.value = config.settings.armAim;
                    if (this.adaptiveCheckbox) this.adaptiveCheckbox.checked = config.settings.adaptiveMode;
                    
                    this.showToast('Configuración importada correctamente', 'success');
                } catch (err) {
                    this.showToast('Error al importar configuración', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    showProComparison() {
        // Toggle pro comparison visibility
        const proSection = document.getElementById('proComparisonSection');
        if (proSection) {
            proSection.style.display = proSection.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    saveSettings() {
        const settings = {
            playStyle: this.playStyleSelect?.value,
            armAim: this.aimStyleSelect?.value,
            adaptiveMode: this.adaptiveCheckbox?.checked
        };
        
        localStorage.setItem('psaSettings', JSON.stringify(settings));
    }
    
    saveResult() {
        const results = JSON.parse(localStorage.getItem('psaResults') || '[]');
        
        results.push({
            date: new Date().toISOString(),
            sensitivity: this.currentBase,
            dpi: this.dpi,
            edpi: this.calculateEdpi(this.currentBase, this.dpi),
            game: this.game,
            consistency: this.analyzeConsistency()
        });
        
        // Keep only last 10 results
        if (results.length > 10) {
            results.shift();
        }
        
        localStorage.setItem('psaResults', JSON.stringify(results));
    }
    
    loadSavedData() {
        try {
            const settings = JSON.parse(localStorage.getItem('psaSettings') || '{}');
            
            if (settings.playStyle && this.playStyleSelect) {
                this.playStyleSelect.value = settings.playStyle;
            }
            if (settings.armAim && this.aimStyleSelect) {
                this.aimStyleSelect.value = settings.armAim;
            }
            if (settings.adaptiveMode !== undefined && this.adaptiveCheckbox) {
                this.adaptiveCheckbox.checked = settings.adaptiveMode;
            }
        } catch (err) {
            console.log('No saved settings found');
        }
    }
    
    showToast(message, type = 'success') {
        if (!this.toast || !this.toastMessage) return;
        
        this.toastMessage.textContent = message;
        
        if (type === 'error') {
            this.toast.style.backgroundColor = '#F43F5E';
        } else {
            this.toast.style.backgroundColor = '#22C55E';
        }
        
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }
    
    reset() {
        this.currentIteration = 0;
        this.history = [];
        this.choices = [];
        this.timestamps = [];
        this.testTimes = [];
        
        // *** RESET NEW ADAPTIVE ALGORITHM VARIABLES ***
        this.searchRange = { min: null, max: null };
        this.convergenceConfidence = 0;
        this.consecutiveSameCount = 0;
        this.oscillationCount = 0;
        this.trendDirection = null;
        
        if (this.testTimer) {
            clearInterval(this.testTimer);
        }
        
        if (this.dpiInput) this.dpiInput.value = '';
        if (this.baseSensInput) this.baseSensInput.value = '';
        
        if (this.historyList) {
            this.historyList.innerHTML = `
                <div class="history-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <p>Comienza un cálculo para ver el historial</p>
                </div>
            `;
        }
        
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateGraph();
        }
        
        // Reset precision tests if they exist
        if (this.precisionTests) {
            this.precisionTests.reset();
            this.precisionTests.hideTestPanel();
        }
        
        this.setupPanel.style.display = 'block';
        this.iterationPanel.style.display = 'none';
        this.resultPanel.style.display = 'none';
        
        // Hide feedback panel
        const feedbackPanel = document.getElementById('feedbackPanel');
        if (feedbackPanel) {
            feedbackPanel.style.display = 'none';
        }
    }
}

// Initialize all systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Category Navigation
    initCategoryNavigation();
    
    // Initialize Pro Crosshair Library
    window.library = new ProCrosshairLibrary();
    
    // Initialize Improvement Guides
    window.improvementGuides = new ImprovementGuides();
    
    // Initialize Optimization Configs
    window.optimizationConfigs = new OptimizationConfigs();
    
    // Initialize PSA Calculator
    const calculator = new PSACalculatorUltra();
    
    window.addEventListener('resize', () => {
        if (calculator.history.length > 0) {
            calculator.updateGraph();
        }
    });
});


// ===========================
// PRO CROSSHAIR LIBRARY
// ===========================
class ProCrosshairLibrary {
    constructor() {
        this.players = this.initPlayersDatabase();
        
        // Load saved filters from localStorage
        this.currentFilter = window.persistenceManager?.getTeamFilter() || 'all';
        this.searchQuery = window.persistenceManager?.getSearchFilter() || '';
        
        this.initializeElements();
        this.attachEventListeners();
        this.restoreFilters();
        this.render();
    }
    
    initPlayersDatabase() {
        // Complete database of Top 10 CS2 teams (November 2025)
        return [
            // Team Vitality (#1)
            { name: 'apEX', team: 'Vitality', shareCode: 'CSGO-US8wR-VECem-xkyHs-Vz5CY-wwXsO', imageUrl: null, lastUpdated: '5 days ago' },
            { name: 'ropz', team: 'Vitality', shareCode: 'CSGO-nCfX7-54ue9-aC5eV-6Womf-Q6izO', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1uQ2ZYNy01NHVlOS1hQzVlVi02V29tZi1RNml6TyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.1RT87868ibgILdIOx0USCuTxxgUegADgZkSTL4K0Z5M', lastUpdated: '4 days ago' },
            { name: 'ZywOo', team: 'Vitality', shareCode: 'CSGO-rUZB2-rWvbU-u8f7J-4yu8T-6sWPA', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1yVVpCMi1yVndiVS11OGY3Si00eXU4VC02c1dQQSIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.04EMGBHVEVOjxtPeUSiu2xdS-WQOX3NGAXHWV57RnDk', lastUpdated: '4 days ago' },
            { name: 'flameZ', team: 'Vitality', shareCode: 'CSGO-ANFqt-s6dDk-cZGKb-dMXSu-wzUrC', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1BTkZxdC1zNmREay1jWkdLYi1kTVhTdS13elVyQyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.0AlUiYDeWRo9fg2CgQmmHt9QyYeG0LRCSRd05LZMp_w', lastUpdated: '4 days ago' },
            { name: 'mezii', team: 'Vitality', shareCode: null, imageUrl: null, lastUpdated: '4 days ago' },
            
            // FURIA (#2)
            { name: 'FalleN', team: 'FURIA', shareCode: 'CSGO-yiXm3-VRYV6-PSGrf-ZEyDc-7JNMB', imageUrl: null, lastUpdated: '7 days ago' },
            { name: 'yuurih', team: 'FURIA', shareCode: 'CSGO-s5Qbj-nvF89-cJjDd-mRdSG-5Yt4N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1zNVFiai1udkY4OS1jSmpEZC1tUmRTRy01WXQ0TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ._Aws_vsm2CW8--Fp_n9LYyBOLo3HaNJ7t8QXqmDF1Ao', lastUpdated: '3 days ago' },
            { name: 'YEKINDAR', team: 'FURIA', shareCode: 'CSGO-ufZUo-V27Te-WQRmC-LhG9C-6AU8N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy11ZlpVTy1WMjdUZS1XUVJtQy1MaEc5Qy02QVU4TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.3PXZKr8xAeW8W5NvPVz6ckLLxuTLgAC5DSK3dAYvinw', lastUpdated: '3 days ago' },
            { name: 'KSCERATO', team: 'FURIA', shareCode: 'CSGO-ufZUo-V27Te-WQRmC-LhG9C-6AU8N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy11ZlpVTy1WMjdUZS1XUVJtQy1MaEc5Qy02QVU4TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.3PXZKr8xAeW8W5NvPVz6ckLLxuTLgAC5DSK3dAYvinw', lastUpdated: '3 days ago' },
            { name: 'molodoy', team: 'FURIA', shareCode: 'CSGO-wAD3c-ykt5L-zvZ98-vBisR-6sWPA', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy13QUQzYy15a3Q1TC16dlo5OC12QmlzUi02c1dQQSIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.LmV6hfGvoB7EBPVbjUg-cPAEX6kBQviGkIabtu8GShI', lastUpdated: '3 days ago' },
            
            // Falcons (#3)
            { name: 'NiKo', team: 'Falcons', shareCode: 'CSGO-s5Qbj-nvF89-cJjDd-mRdSG-5Yt4N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1zNVFiai1udkY4OS1jSmpEZC1tUmRTRy01WXQ0TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ._Aws_vsm2CW8--Fp_n9LYyBOLo3HaNJ7t8QXqmDF1Ao', lastUpdated: '3 days ago' },
            { name: 'TeSeS', team: 'Falcons', shareCode: null, imageUrl: null, lastUpdated: '3 days ago' },
            { name: 'm0NESY', team: 'Falcons', shareCode: 'CSGO-wAD3c-ykt5L-zvZ98-vBisR-6sWPA', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy13QUQzYy15a3Q1TC16dlo5OC12QmlzUi02c1dQQSIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.LmV6hfGvoB7EBPVbjUg-cPAEX6kBQviGkIabtu8GShI', lastUpdated: '3 days ago' },
            { name: 'kyxsan', team: 'Falcons', shareCode: null, imageUrl: null, lastUpdated: '3 days ago' },
            { name: 'kyousuke', team: 'Falcons', shareCode: 'CSGO-s5Qbj-nvF89-cJjDd-mRdSG-5Yt4N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1zNVFiai1udkY4OS1jSmpEZC1tUmRTRy01WXQ0TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ._Aws_vsm2CW8--Fp_n9LYyBOLo3HaNJ7t8QXqmDF1Ao', lastUpdated: '3 days ago' },
            
            // MOUZ (#4)
            { name: 'Brollan', team: 'MOUZ', shareCode: 'CSGO-Lxrrb-tK89n-WWPxK-K7VuY-m4urD', imageUrl: null, lastUpdated: '10 days ago' },
            { name: 'torzsi', team: 'MOUZ', shareCode: 'CSGO-dGb5E-i2VyQ-kfwD5-U8pfz-2XT4M', imageUrl: null, lastUpdated: '10 days ago' },
            { name: 'Spinx', team: 'MOUZ', shareCode: 'CSGO-sjVaz-jEpkp-qcTTG-bcmmB-4ZywQ', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1zalZacy1qRXBrcC1xY1RURy1iY21tQi00Wnl3USIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.lQn__YPUrAl1ChIqwuIDnmf1wP0gmzOaYTsKBK-Sg6g', lastUpdated: '10 days ago' },
            { name: 'Jimpphat', team: 'MOUZ', shareCode: null, imageUrl: null, lastUpdated: '10 days ago' },
            { name: 'xertioN', team: 'MOUZ', shareCode: 'CSGO-usVDK-dBUVN-j4Ffp-POw9z-DLbYF', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy11c1ZESy1kQlVWTi1qNEZmcC1QT3c5ei1ETHBZRiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ._wxTPaHrj5VqR6bnPIkrpLJuZibi3QL3K5WZLPsNrb0', lastUpdated: '10 days ago' },
            
            // The MongolZ (#5)
            { name: 'bLitz', team: 'The MongolZ', shareCode: null, imageUrl: null, lastUpdated: '6 days ago' },
            { name: 'Techno', team: 'The MongolZ', shareCode: null, imageUrl: null, lastUpdated: '6 days ago' },
            { name: 'mzinho', team: 'The MongolZ', shareCode: 'CSGO-niyeb-yLFrz-DNQCR-vmkVv-4jTpA', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1uaXllYi15TEZyei1kTlFDUi12bWtWdi00alRpQSIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.2vZJeIvvb34rGKwDSw0hagjt13BheBSMhnDbaxwjVY4', lastUpdated: '6 days ago' },
            { name: '910', team: 'The MongolZ', shareCode: null, imageUrl: null, lastUpdated: '6 days ago' },
            
            // Spirit (#6)
            { name: 'chopper', team: 'Spirit', shareCode: null, imageUrl: null, lastUpdated: '5 days ago' },
            { name: 'sh1ro', team: 'Spirit', shareCode: 'CSGO-s5Qbj-nvF89-cJjDd-mRdSG-5Yt4N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1zNVFiai1udkY4OS1jSmpEZC1tUmRTRy01WXQ0TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ._Aws_vsm2CW8--Fp_n9LYyBOLo3HaNJ7t8QXqmDF1Ao', lastUpdated: '4 days ago' },
            { name: 'tN1R', team: 'Spirit', shareCode: null, imageUrl: null, lastUpdated: '4 days ago' },
            { name: 'donk', team: 'Spirit', shareCode: 'CSGO-Jhfkc-4UpR6-DJftC-VfGek-pL3ED', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1KaGZrYy00VXBSNi1ESmZ0Qy1WZkdlay1wTDNFRCIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.5FSgpMLU5QVXmWPvEL31Cx3FyCta7QO9YcD6x1LJkK4', lastUpdated: '4 days ago' },
            { name: 'zweih', team: 'Spirit', shareCode: null, imageUrl: null, lastUpdated: '5 days ago' },
            
            // Aurora (#7)
            { name: 'MAJ3R', team: 'Aurora', shareCode: null, imageUrl: null, lastUpdated: '19 days ago' },
            { name: 'XANTARES', team: 'Aurora', shareCode: 'CSGO-xbpe2-E24RJ-YXNuO-pQvt8-ppNAK', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy14YnBlMi1FMjRSSi1ZWE51Ty1wUXZ0OC1wcE5BSyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.vedtNYuUsBN_hFuuXqAGs8kTIr7LM0oUrECatdCfYpo', lastUpdated: '18 days ago' },
            { name: 'woxic', team: 'Aurora', shareCode: 'CSGO-hVyt6-6w7hL-hQyc6-xReeD-3sNkO', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1oVnl0Ni02dzdoTC1oUXljNi14UmVlRC0zc05rTyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.2AoU7t4PWqv_ywJ90vi8UMmX6j0TNFfe6aEcAleChUU', lastUpdated: '18 days ago' },
            { name: 'Wicadia', team: 'Aurora', shareCode: null, imageUrl: null, lastUpdated: '18 days ago' },
            { name: 'jottAAA', team: 'Aurora', shareCode: null, imageUrl: null, lastUpdated: '18 days ago' },
            
            // G2 (#8)
            { name: 'huNter-', team: 'G2', shareCode: null, imageUrl: null, lastUpdated: '14 days ago' },
            { name: 'malbsMd', team: 'G2', shareCode: null, imageUrl: null, lastUpdated: '14 days ago' },
            { name: 'SunPayus', team: 'G2', shareCode: null, imageUrl: null, lastUpdated: '14 days ago' },
            { name: 'HeavyGod', team: 'G2', shareCode: 'CSGO-dFCuv-Yjpaa-Ao5M4-bEhfD-V5xDK', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1kRkN1di1YanBhYS1BbzVNNC1iRWhmRC1WNXhESyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.Nl-X-iizfOM_pNqVc17a3BlrVhcCkbGPUA-pUBoD54Y', lastUpdated: '14 days ago' },
            { name: 'MATYS', team: 'G2', shareCode: 'CSGO-k6kTH-V33rx-O8iRp-pvuK3-DmjPK', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1rNmtUSC1WMzNyeC1POGlScC1wdnVLMy1EbWpQSyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.US72KBTzhh9no6KcclzPp3hLSIBTDp54Ru0sDE3xrs4', lastUpdated: '14 days ago' },
            
            // Natus Vincere (#9)
            { name: 'Aleksib', team: 'Natus Vincere', shareCode: null, imageUrl: null, lastUpdated: '16 days ago' },
            { name: 'iM', team: 'Natus Vincere', shareCode: 'CSGO-rsDHb-QDmGE-VikD2-dApWC-kJCEB', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy1yc0RIYi1RRG1HRS1WaWtEMi1kQXBXQy1rSkNFQiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ._6O7WTD8KLhp1IgFToQF6oVIxq4f_7ztC7gNTPkkpd4', lastUpdated: '15 days ago' },
            { name: 'b1t', team: 'Natus Vincere', shareCode: 'CSGO-u2H9q-R3KDb-ijHuY-Bfizr-J9T8N', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy11Mkg5cS1SM0tEYi1pakh1WS1CZml6ci1KOVQ4TiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.osunaCol6aTkO21z6JWtWfi6EyfW0dA15cJKdH2zzoE', lastUpdated: '15 days ago' },
            { name: 'w0nderful', team: 'Natus Vincere', shareCode: 'CSGO-ixUkM-R86vw-CMjAG-6f9W8-Jo74E', imageUrl: null, lastUpdated: '15 days ago' },
            { name: 'makazze', team: 'Natus Vincere', shareCode: 'CSGO-zAtQq-ZGqRO-ibEud-dGwCU-zqLDR', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy16QXRRcS1aR0FSTy1pYkV1ZC1kR3dDVS16cUxEUiIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.rj-IA7YeOC6ZftI6LUyBlrhaqHsdsuILNC3tutMg-6g', lastUpdated: '15 days ago' },
            
            // paiN (#10)
            { name: 'dgt', team: 'paiN', shareCode: 'CSGO-7mNoK-5YEia-Bww94-Ew6BH-WbxTC', imageUrl: 'https://d81gju9fq33lb.cloudfront.net/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm9zc2hhaXJDb2RlIjoiQ1NHTy03bU5vSy01WUVpYS1Cd3c5NC1FdzZCSC1XYnhUQyIsIndpZHRoIjoxMjgsImhlaWdodCI6MTI4fQ.9_PwzrAl4xKfph7nHdf_Dpzjc0wlMsOoJwF06eYmoD8', lastUpdated: '4 days ago' },
            { name: 'biguzera', team: 'paiN', shareCode: null, imageUrl: null, lastUpdated: '4 days ago' },
            { name: 'dav1deuS', team: 'paiN', shareCode: null, imageUrl: null, lastUpdated: '7 days ago' },
            { name: 'nqz', team: 'paiN', shareCode: null, imageUrl: null, lastUpdated: '4 days ago' },
            { name: 'snow', team: 'paiN', shareCode: null, imageUrl: null, lastUpdated: '4 days ago' }
        ];
    }
    
    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.teamFilters = document.getElementById('teamFilters');
        this.playerGrid = document.getElementById('playerGrid');
        this.noResults = document.getElementById('noResults');
    }
    
    attachEventListeners() {
        // Search
        this.searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            window.persistenceManager?.saveSearchFilter(this.searchQuery);
            this.render();
        });
        
        // Team filters
        this.teamFilters?.addEventListener('click', (e) => {
            if (e.target.classList.contains('team-filter-btn')) {
                // Remove active from all buttons
                this.teamFilters.querySelectorAll('.team-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active to clicked button
                e.target.classList.add('active');
                
                // Update filter
                this.currentFilter = e.target.dataset.team;
                window.persistenceManager?.saveTeamFilter(this.currentFilter);
                this.render();
            }
        });
    }
    
    restoreFilters() {
        // Restore search input value
        if (this.searchInput && this.searchQuery) {
            this.searchInput.value = this.searchQuery;
        }
        
        // Restore team filter button
        if (this.teamFilters && this.currentFilter) {
            this.teamFilters.querySelectorAll('.team-filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.team === this.currentFilter) {
                    btn.classList.add('active');
                }
            });
        }
    }
    
    filterPlayers() {
        let filtered = this.players;
        
        // Apply team filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(player => player.team === this.currentFilter);
        }
        
        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(player => 
                player.name.toLowerCase().includes(this.searchQuery) ||
                player.team.toLowerCase().includes(this.searchQuery)
            );
        }
        
        return filtered;
    }
    
    copyShareCode(shareCode) {
        if (!shareCode) return;
        
        navigator.clipboard.writeText(shareCode).then(() => {
            this.showToast('¡Share Code copiado!');
        }).catch(() => {
            this.showToast('Error al copiar', 'error');
        });
    }
    
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        
        if (type === 'error') {
            toast.style.backgroundColor = '#F43F5E';
        } else {
            toast.style.backgroundColor = '#22C55E';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    render() {
        if (!this.playerGrid) return;
        
        const filtered = this.filterPlayers();
        
        if (filtered.length === 0) {
            this.playerGrid.style.display = 'none';
            this.noResults.style.display = 'block';
            return;
        }
        
        this.playerGrid.style.display = 'grid';
        this.noResults.style.display = 'none';
        
        this.playerGrid.innerHTML = filtered.map(player => `
            <div class="player-card">
                <div class="player-card-header">
                    <div class="player-info">
                        <h3 class="player-name">${player.name}</h3>
                        <span class="player-team">${player.team}</span>
                    </div>
                    <span class="player-updated">${player.lastUpdated}</span>
                </div>
                
                <div class="crosshair-preview">
                    ${player.imageUrl ? 
                        `<img src="${player.imageUrl}" alt="${player.name} crosshair" class="crosshair-image">` :
                        `<div class="crosshair-placeholder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>No disponible</span>
                        </div>`
                    }
                </div>
                
                ${player.shareCode ? `
                    <div class="player-sharecode">
                        <code class="sharecode-text">${player.shareCode}</code>
                        <button class="btn-copy-sharecode" onclick="library.copyShareCode('${player.shareCode}')" title="Copiar Share Code">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                ` : `
                    <div class="player-sharecode-unavailable">
                        <span>Share Code no disponible</span>
                    </div>
                `}
            </div>
        `).join('');
    }
}

// ===========================
// IMPROVEMENT GUIDES
// ===========================
class ImprovementGuides {
    constructor() {
        this.guides = this.initGuidesDatabase();
        this.expandedCards = new Set();
        this.initializeElements();
        this.render();
    }
    
    initGuidesDatabase() {
        return [
            {
                id: 'aim-precision',
                title: 'Aim y Precisión',
                icon: '🎯',
                description: 'Configuración, sensibilidad y técnicas para mejorar tu puntería',
                color: '#08D3BB',
                content: {
                    sections: [
                        {
                            title: 'Configuración de Sensibilidad',
                            tips: [
                                '<strong>eDPI Óptimo:</strong> Los pros usan entre 600-1000 eDPI (DPI × Sensibilidad). Encuentra tu zona de comodidad dentro de este rango.',
                                '<strong>400 DPI @ 2.0 sens = 800 eDPI:</strong> La configuración más popular entre profesionales. Es un buen punto de partida.',
                                '<strong>Consistencia:</strong> Una vez encuentres tu sensibilidad, NO la cambies por al menos 2-3 semanas. La muscle memory toma tiempo.',
                                '<strong>Monitor Settings:</strong> 240Hz o 360Hz refresh rate, brightness 90-100%, digital vibrance 60-80% para mejor visibilidad.'
                            ]
                        },
                        {
                            title: 'Crosshair Placement',
                            tips: [
                                '<strong>Head Level:</strong> SIEMPRE mantén el crosshair a la altura de la cabeza. Practica en DM manteniendo esta altura constante.',
                                '<strong>Pre-aim Angles:</strong> Antes de girar una esquina, coloca el crosshair donde esperas que aparezca el enemigo.',
                                '<strong>Clear Angles:</strong> Limpia ángulos uno por uno, nunca te expongas a múltiples ángulos simultáneamente.',
                                '<strong>Distance from Wall:</strong> Mantén el crosshair a 30-50cm de la pared al moverte, no pegado a ella.'
                            ]
                        },
                        {
                            title: 'Training Rutinas',
                            tips: [
                                '<strong>10 min Warmup:</strong> Headshot-only DM antes de cada sesión competitiva.',
                                '<strong>Spray Control:</strong> Practica los primeros 10-15 bullets del AK-47 y M4 en una pared. Dibuja la T invertida.',
                                '<strong>Prefire Maps:</strong> Usa mapas YPrac para memorizar ángulos comunes en cada mapa.',
                                '<strong>Tracking Practice:</strong> Aim trainers como Aim Lab o KovaaK\'s: 15 minutos de tracking + flicks.'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'movement-peeking',
                title: 'Movimiento y Peeking',
                icon: '⚡',
                description: 'Counter-strafe, técnicas de peek y movimiento avanzado',
                color: '#FBBF24',
                content: {
                    sections: [
                        {
                            title: 'Counter-Strafing (Esencial)',
                            tips: [
                                '<strong>Qué es:</strong> Presionar la tecla opuesta (A↔D) para detenerte instantáneamente antes de disparar.',
                                '<strong>Cómo hacerlo:</strong> Moviendote con D, presiona A brevemente para frenar. Dispara cuando estés quieto (100% precisión).',
                                '<strong>Sin diagonal:</strong> NUNCA presiones W o S mientras haces counter-strafe, solo A y D.',
                                '<strong>Práctica:</strong> Modo práctica con sv_showimpacts 1 para ver cuándo eres preciso.'
                            ]
                        },
                        {
                            title: 'Tipos de Peek',
                            tips: [
                                '<strong>Jiggle Peek:</strong> Movimientos rápidos A-D-A-D para ver el ángulo sin exponerte. Perfecto para recopilar info.',
                                '<strong>Shoulder Peek:</strong> Mostrar solo el hombro para baitar shots del AWP. Usado contra snipers.',
                                '<strong>Wide Peek:</strong> Peek lejos del cover para sorprender. Funciona cuando el enemigo pre-apunta cerca de la esquina.',
                                '<strong>Crouch Peek:</strong> Combinar crouch + peek para cambiar tu hitbox. No abuses, úsalo 1-2 veces por ronda.',
                                '<strong>Ferrari Peek (Instapeek):</strong> Wide peek a máxima velocidad. Aprovecha el peeker\'s advantage al máximo.'
                            ]
                        },
                        {
                            title: 'Movement Fundamentals',
                            tips: [
                                '<strong>Solo para moverse:</strong> Nunca presiones más de 2 teclas de movimiento al mismo tiempo.',
                                '<strong>Shift walking:</strong> Úsalo para rotar sin hacer ruido, no para pushear (eres muy lento).',
                                '<strong>Bunny hop:</strong> No es esencial, pero útil para moverte más rápido en ciertas situaciones.',
                                '<strong>Sound awareness:</strong> Recuerda que los enemigos escuchan tus pasos. Walk cuando necesites sigilo.'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'advanced-techniques',
                title: 'Técnicas Avanzadas',
                icon: '🔥',
                description: 'Prefire, spray control, recoil patterns y técnicas pro',
                color: '#F43F5E',
                content: {
                    sections: [
                        {
                            title: 'Prefire & Clearing',
                            tips: [
                                '<strong>Qué es Prefire:</strong> Disparar a un ángulo común ANTES de ver al enemigo. Requiere conocimiento del mapa.',
                                '<strong>Ángulos comunes:</strong> Aprende 5-10 spots de prefire por mapa. Usa mapas YPrac para practicar.',
                                '<strong>Sound cues:</strong> Si escuchas pasos, prefire basándote en el timing y posición probable.',
                                '<strong>Prefire + Peek:</strong> Combina prefire con wide peek para máximo efecto. El enemigo no tiene tiempo de reaccionar.'
                            ]
                        },
                        {
                            title: 'Spray Control & Recoil',
                            tips: [
                                '<strong>AK-47 Pattern:</strong> Primeros 10 bullets: arriba, luego tira hacia abajo y ligeramente izquierda.',
                                '<strong>M4A4/M4A1-S:</strong> Más controlable que AK. Patrón similar pero menos agresivo.',
                                '<strong>First 5 bullets:</strong> Domina los primeros 5 disparos de cada arma. Es lo más usado en duelos.',
                                '<strong>Burst vs Spray:</strong> Distancia larga: bursts de 3-5 bullets. Distancia corta: full spray.',
                                '<strong>Headshot line:</strong> Los primeros 2-3 bullets del spray van donde apuntas. Apunta a la cabeza.'
                            ]
                        },
                        {
                            title: 'Economy & Weapon Choice',
                            tips: [
                                '<strong>Save rounds:</strong> Compra defuser (CT) o utility (T) en eco. No compres pistola cara si no puedes permitirte full buy next round.',
                                '<strong>Force buy timing:</strong> Round 2 after pistol loss es común. Asegúrate de que tu equipo esté coordinado.',
                                '<strong>AWP economy:</strong> El AWP cuesta $4750. Necesitas ~$6000 para comprarlo con utility.',
                                '<strong>Drop weapons:</strong> Si tienes $8000+, dropea un arma a tu teammate con menos dinero.'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'game-sense',
                title: 'Game Sense y Posicionamiento',
                icon: '🧠',
                description: 'Map awareness, timing, rotaciones y decisiones tácticas',
                color: '#22C55E',
                content: {
                    sections: [
                        {
                            title: 'Map Awareness',
                            tips: [
                                '<strong>Mira el radar cada 5 segundos:</strong> Los pros checkean el radar constantemente. Te dice dónde están teammates y enemies.',
                                '<strong>Callouts:</strong> Aprende los nombres de las posiciones de cada mapa. Comunicación = victorias.',
                                '<strong>Utility damage:</strong> Si ves molotov/HE en el radar, sabes que el enemigo está cerca.',
                                '<strong>Bomb location:</strong> SIEMPRE sabe dónde está la bomba. Como T, no mueras con ella lejos del site.'
                            ]
                        },
                        {
                            title: 'Positioning & Angles',
                            tips: [
                                '<strong>Off-angles:</strong> Juega posiciones donde los enemigos NO pre-apuntan. Ganas 200ms de ventaja.',
                                '<strong>No te quedes en el open:</strong> Siempre ten cover cerca. Plan de escape antes de tomar una posición.',
                                '<strong>Change positions:</strong> No repitas la misma posición 2 rounds seguidos. El enemigo te está esperando.',
                                '<strong>Distance from cover:</strong> Juega lejos del cover cuando holdeas. Ves al enemigo antes de que te vea.'
                            ]
                        },
                        {
                            title: 'Timing & Rotations',
                            tips: [
                                '<strong>Map timing:</strong> Sabe cuánto tardan los Ts en llegar a cada zona del mapa. Anticipate sus pushes.',
                                '<strong>Rotate smart:</strong> Como CT, no rotes hasta confirmar la bomba. 1 fake y perdiste el round.',
                                '<strong>Save time:</strong> Con 30s quedan y bomba no plantada, los Ts TIENEN que ejecutar. Espéralos.',
                                '<strong>Lurk timing:</strong> Como lurker, espera que tu equipo haga contact antes de pushear tu lado.'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'utility',
                title: 'Utility Usage',
                icon: '💣',
                description: 'Smokes, flashes, molotovs y lineups esenciales',
                color: '#A78BFA',
                content: {
                    sections: [
                        {
                            title: 'Smokes Esenciales',
                            tips: [
                                '<strong>Aprende 2-3 smokes por mapa:</strong> No necesitas saber todos, pero sí los más importantes (CT smoke Mirage, Xbox Dust2, etc).',
                                '<strong>Smoke timing:</strong> Como T, smoke 5-10s antes de ejecutar. Da tiempo a que se disipe si es mal timing.',
                                '<strong>One-ways:</strong> Algunos smokes te dejan ver pies del enemigo pero ellos no te ven. Aprende los más comunes.',
                                '<strong>Block vision, no make cover:</strong> Los smokes son para bloquear visión del enemy, no para esconderte.'
                            ]
                        },
                        {
                            title: 'Flashbang Mastery',
                            tips: [
                                '<strong>Pop-flash:</strong> Flash que pop justo cuando aparece en la visión del enemy. No tienen tiempo de voltear.',
                                '<strong>Self-flash is OK:</strong> Mejor self-flashearse un poco que no flashear al enemy.',
                                '<strong>Flash for teammate:</strong> Coordina con tu team. "Flasheando!" → espera 1s → peek.',
                                '<strong>Double flash:</strong> Una flash, espera 2s, segunda flash. Enemigos voltean para la primera, la segunda los ciega.'
                            ]
                        },
                        {
                            title: 'Molotov & HE Usage',
                            tips: [
                                '<strong>Molotov para delay:</strong> Usa mollys para ganar tiempo (5s de daño). Perfecto para CT retake o T postplant.',
                                '<strong>Clear corners:</strong> Molly spots comunes antes de entrar al site. Obliga al CT a moverse.',
                                '<strong>HE nade stack:</strong> Coordina con team para lanzar 3-4 HE al mismo spot. Hace 200-300 daño total.',
                                '<strong>Postplant molly:</strong> Como T, guarda molly para cuando plantan. Quema al defuser por 5s.'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'pro-secrets',
                title: 'Secretos de Pros',
                icon: '👑',
                description: 'Trucos, boosts, wallbangs y tácticas que usan los profesionales',
                color: '#EC4899',
                content: {
                    sections: [
                        {
                            title: 'Off-Angles & Boosts',
                            tips: [
                                '<strong>Short B boxes boost (Mirage):</strong> Teammate te boostea en las cajas. Ves por encima del smoke.',
                                '<strong>Inferno B site 3-man boost:</strong> Boost para ver por encima del smoke desde site. Requiere 2 teammates.',
                                '<strong>Nuke Hut boost:</strong> Boosteado en Hut, estás protegido de mollys del suelo.',
                                '<strong>Off-angle spots:</strong> Juega en medio de la zona, no en las esquinas donde todos pre-apuntan.'
                            ]
                        },
                        {
                            title: 'Wallbang Spots',
                            tips: [
                                '<strong>Rifles: 200 penetration power:</strong> Atraviesan madera fina y algunas paredes delgadas.',
                                '<strong>AWP: 250 penetration power:</strong> El AWP atraviesa más superficies que rifles.',
                                '<strong>Dust2 mid doors:</strong> Wallbang común con AWP. Usa tracers de teammate para saber dónde disparar.',
                                '<strong>Mirage kitchen:</strong> Puedes wallbang desde apartments a kitchen y viceversa.'
                            ]
                        },
                        {
                            title: 'Mindgames & Psychology',
                            tips: [
                                '<strong>Fake plant:</strong> En 1vX clutch, empieza a plantar y cancela. Enemy rushea pensando que estás vulnerable.',
                                '<strong>Fake footsteps:</strong> Corre, luego shift walk. Enemy piensa que sigues corriendo.',
                                '<strong>Decoy grenades:</strong> Úsalos para fake presence en el otro site. Aparecen en el radar como si dispararas.',
                                '<strong>Reload bait:</strong> Empieza reload, switch armas, enemy pushea pensando que estás vulnerable.'
                            ]
                        },
                        {
                            title: 'Demo Review (Lo más importante)',
                            tips: [
                                '<strong>Review tus propios demos:</strong> Ve rounds donde moriste. ¿Qué hiciste mal? ¿Mal positioning? ¿Mal timing?',
                                '<strong>Review demos de pros:</strong> Ve cómo pros juegan TU posición favorita. Copia su utility, timing, positioning.',
                                '<strong>Focus en mistakes, no highlights:</strong> Aprendes más de tus errores que de tus kills lucky.',
                                '<strong>Take notes:</strong> Escribe los errores que cometes frecuentemente. Trabaja en arreglarlos uno por uno.'
                            ]
                        }
                    ]
                }
            }
        ];
    }
    
    initializeElements() {
        this.guidesGrid = document.getElementById('guidesGrid');
    }
    
    toggleCard(cardId) {
        if (this.expandedCards.has(cardId)) {
            this.expandedCards.delete(cardId);
        } else {
            this.expandedCards.add(cardId);
        }
        this.render();
    }
    
    render() {
        if (!this.guidesGrid) return;
        
        this.guidesGrid.innerHTML = this.guides.map(guide => {
            const isExpanded = this.expandedCards.has(guide.id);
            
            return `
                <div class="guide-card ${isExpanded ? 'expanded' : ''}" style="border-color: ${guide.color}">
                    <div class="guide-card-header" onclick="window.improvementGuides.toggleCard('${guide.id}')">
                        <div class="guide-icon" style="background: ${guide.color}20; color: ${guide.color}">
                            ${guide.icon}
                        </div>
                        <div class="guide-info">
                            <h3 class="guide-title">${guide.title}</h3>
                            <p class="guide-description">${guide.description}</p>
                        </div>
                        <div class="guide-expand-icon ${isExpanded ? 'expanded' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                    
                    ${isExpanded ? `
                        <div class="guide-card-content">
                            ${guide.content.sections.map(section => `
                                <div class="guide-section">
                                    <h4 class="guide-section-title">${section.title}</h4>
                                    <ul class="guide-tips-list">
                                        ${section.tips.map(tip => `
                                            <li class="guide-tip">${tip}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
}

// ===========================
// OPTIMIZATION & CONFIGURATION
// ===========================
class OptimizationConfigs {
    constructor() {
        this.configs = [
            {
                name: "Autoexec CS2",
                color: "#FF6B35",
                icon: "📄",
                sections: [
                    {
                        title: "¿Qué es autoexec.cfg?",
                        tips: [
                            "Archivo de configuración que se ejecuta automáticamente al iniciar CS2",
                            "Ubicación: C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg\\",
                            "Nombre del archivo: autoexec.cfg (crear con Notepad)",
                            "Activar en Launch Options de Steam: +exec autoexec.cfg"
                        ]
                    },
                    {
                        title: "Comandos de FPS y Rendimiento",
                        tips: [
                            "fps_max 0 // Desactiva límite de FPS",
                            "+engine_low_latency_sleep_after_client_tick true // Reduce latencia",
                            "r_fullscreen_gamma 2.5 // Ajusta gamma para mejor visibilidad",
                            "mat_queue_mode -1 // Optimiza uso de CPU/GPU (-1 = auto)",
                            "r_show_build_info false // Oculta info de build",
                            "+violence_hblood 0 // Desactiva sangre para mejor FPS"
                        ]
                    },
                    {
                        title: "Comandos de Red y Latencia",
                        tips: [
                            "rate 786432 // Máximo ancho de banda (CS2)",
                            "cl_interp 0 // Interpolación mínima",
                            "cl_interp_ratio 1 // Ratio de interpolación",
                            "cl_cmdrate 128 // Comandos enviados al server por segundo",
                            "cl_updaterate 128 // Actualizaciones recibidas por segundo"
                        ]
                    },
                    {
                        title: "Comandos de Audio",
                        tips: [
                            "volume 0.7 // Volumen general (ajustar al gusto)",
                            "snd_deathcamera_volume 0 // Sin sonido en cámara de muerte",
                            "snd_mapobjective_volume 0 // Sin sonido de objetivo",
                            "snd_roundstart_volume 0 // Sin música de inicio",
                            "snd_tensecondwarning_volume 0.05 // Aviso de bomba bajo",
                            "snd_mvp_volume 0.25 // Música de MVP reducida",
                            "snd_mixahead 0.001 // Reduce latencia de audio"
                        ]
                    },
                    {
                        title: "Comandos de Interfaz (HUD)",
                        tips: [
                            "cl_showloadout 1 // Muestra equipo del equipo",
                            "cl_autohelp 0 // Desactiva mensajes de ayuda",
                            "cl_hud_color 10 // Color del HUD (1-10)",
                            "cl_radar_scale 0.3 // Tamaño del radar",
                            "cl_radar_rotate 1 // Radar rotativo",
                            "hud_showtargetid 1 // Muestra nombre de enemigos"
                        ]
                    },
                    {
                        title: "Verificar Autoexec",
                        tips: [
                            "Agregar al final: echo \"Autoexec cargado exitosamente\"",
                            "Al iniciar CS2, abrir consola y verificar mensaje",
                            "Si no aparece, verificar ruta y launch option"
                        ]
                    }
                ]
            },
            {
                name: "Launch Options CS2",
                color: "#4ECDC4",
                icon: "🚀",
                sections: [
                    {
                        title: "Launch Options Esenciales",
                        tips: [
                            "-high // Prioridad alta del proceso (más CPU para CS2)",
                            "-nojoy // Desactiva soporte de joystick (libera RAM)",
                            "-console // Activa consola al inicio",
                            "+fps_max 0 // Desbloquea límite de FPS",
                            "-allow_third_party_software // Permite OBS y otras apps",
                            "-softparticlesdefaultoff // Desactiva partículas suaves (+FPS)"
                        ]
                    },
                    {
                        title: "Launch Options para FPS Bajo",
                        tips: [
                            "-fullscreen // Fuerza pantalla completa (+FPS)",
                            "-forcenovsync // Fuerza desactivar VSync",
                            "+r_dynamic 0 // Desactiva iluminación dinámica",
                            "+mat_disable_fancy_blending 1 // Desactiva blending de texturas",
                            "+r_drawparticles 0 // Desactiva partículas",
                            "+cl_forcepreload 1 // Precarga modelos"
                        ]
                    },
                    {
                        title: "Launch Options para Procesador",
                        tips: [
                            "-threads X // Núcleos físicos + 1 (Ej: 8 cores = -threads 9)",
                            "Intel 12900K/13900K/14900K: -threads 9",
                            "AMD 7800X3D: -threads 9",
                            "Ryzen 5 5600X: -threads 7"
                        ]
                    },
                    {
                        title: "Launch Options Avanzadas",
                        tips: [
                            "-noreflex // Mejor frametime (deshabilita NVIDIA Reflex)",
                            "-vulkan // Usa Vulkan en vez de DX11 (probar rendimiento)",
                            "-insecure // Desactiva VAC (solo para FACEIT/ESEA, +FPS)",
                            "-refresh 144 // Fuerza refresh rate (cambiar según monitor)",
                            "-w 1920 -h 1080 // Fuerza resolución específica"
                        ]
                    },
                    {
                        title: "Launch Options NO Funcionales en CS2",
                        tips: [
                            "-novid // Ya no existe intro en CS2 (obsoleto)",
                            "-tickrate 128 // CS2 usa subtick (obsoleto)",
                            "-d3d9ex // CS2 usa DX11 (obsoleto)",
                            "-limitvsconst // Ya no funciona en CS2"
                        ]
                    },
                    {
                        title: "Ejemplo Completo",
                        tips: [
                            "-high -nojoy -console +fps_max 0 -allow_third_party_software -noreflex -threads 9 -fullscreen -refresh 144",
                            "Ajustar -threads según tu CPU",
                            "Ajustar -refresh según tu monitor",
                            "Probar con y sin -noreflex (algunos PCs mejoran, otros empeoran)"
                        ]
                    }
                ]
            },
            {
                name: "Optimización Windows 11/10",
                color: "#00A8E8",
                icon: "🪟",
                sections: [
                    {
                        title: "Desactivar VBS y Memory Integrity (CRÍTICO +5-15% FPS)",
                        tips: [
                            "Búsqueda Windows → 'Core Isolation' → Desactivar Memory Integrity",
                            "Windows + R → 'optionalfeatures' → Desmarcar Virtual Machine Platform",
                            "CMD como Admin: bcdedit /set hypervisorlaunchtype off",
                            "Reiniciar PC → Verificar en System Information que VBS esté OFF",
                            "GANANCIA: +5% a +15% FPS (especialmente en CPU-intensive games)"
                        ]
                    },
                    {
                        title: "Modo de Juego y GPU Scheduling",
                        tips: [
                            "Settings → Gaming → Game Mode → ON",
                            "Settings → Display → Graphics → Hardware-accelerated GPU scheduling → ON",
                            "Settings → Display → Graphics → Variable refresh rate → ON",
                            "Settings → Display → Graphics → Optimizations for windowed games → ON",
                            "Nota: HAGS usa +1GB VRAM (desactivar si tienes ≤8GB VRAM)"
                        ]
                    },
                    {
                        title: "Plan de Energía",
                        tips: [
                            "Settings → System → Power & battery → Best performance",
                            "Control Panel → Power Options → High performance / Ultimate performance",
                            "IMPORTANTE: AMD usuarios mantenerse en Balanced",
                            "Laptops: Solo usar High performance cuando esté conectado"
                        ]
                    },
                    {
                        title: "Procesos en Segundo Plano",
                        tips: [
                            "CTRL+SHIFT+ESC → Startup tab → Desactivar apps innecesarias",
                            "Mantener solo: Drivers GPU/Audio, Antivirus, Software periféricos",
                            "Desactivar: OneDrive, Xbox, Discord (si no se usa), Spotify, etc.",
                            "Windows Update Blocker (opcional, REDUCE SEGURIDAD): sordum.org"
                        ]
                    },
                    {
                        title: "Limpiar Archivos Temporales",
                        tips: [
                            "Windows + R → C:\\Windows\\Temp → Seleccionar todo (CTRL+A) → Eliminar",
                            "Windows + R → %temp% → Seleccionar todo → Eliminar",
                            "Windows + R → cleanmgr.exe → Limpiar disco C: → Marcar todo",
                            "Hacer 1 vez al mes para mantener sistema limpio"
                        ]
                    },
                    {
                        title: "Desactivar Nagle's Algorithm (Reduce Latencia)",
                        tips: [
                            "CMD → ipconfig → Anotar IPv4 Address",
                            "Windows + R → regedit → como Administrador",
                            "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\",
                            "Buscar carpeta con tu IP → Crear DWORD: TcpAckFrequency = 1",
                            "Crear DWORD: TCPNoDelay = 1 → Reiniciar PC",
                            "GANANCIA: -5 a -15ms de latencia en juegos TCP"
                        ]
                    },
                    {
                        title: "Optimizaciones Adicionales",
                        tips: [
                            "Desactivar Xbox Game Bar: Settings → Gaming → Xbox Game Bar → OFF",
                            "Desactivar DVR: Settings → Gaming → Captures → Background recording → OFF",
                            "Windows Search: services.msc → Windows Search → Disabled (PC gaming)",
                            "Crear System Restore Point antes de cualquier cambio",
                            "Actualizar Windows y Drivers a última versión"
                        ]
                    }
                ]
            },
            {
                name: "NVIDIA Settings",
                color: "#76B900",
                icon: "🟢",
                sections: [
                    {
                        title: "Instalación Limpia de Drivers",
                        tips: [
                            "Descargar DDU (Display Driver Uninstaller) de techpowerup.com",
                            "Modo Seguro → Ejecutar DDU → Limpiar NVIDIA drivers",
                            "Descargar NVCleanstall de techpowerup.com",
                            "Instalar solo: Driver, PhysX (dejar resto sin marcar)",
                            "Installation Tweaks: Disable Installer Telemetry & Advertising",
                            "Reiniciar PC después de instalación"
                        ]
                    },
                    {
                        title: "NVIDIA Control Panel - 3D Settings Global",
                        tips: [
                            "Ambient Occlusion: OFF (+8% FPS)",
                            "Anisotropic Filtering: Application-controlled",
                            "Low Latency Mode: Ultra (reduce latencia hasta 15ms)",
                            "Power Management: Prefer maximum performance",
                            "Texture Filtering - Quality: High Performance",
                            "Threaded Optimization: ON",
                            "Vertical Sync: OFF (importante, -20ms latencia)",
                            "Trilinear Optimization: ON"
                        ]
                    },
                    {
                        title: "NVIDIA Control Panel - CS2 Específico",
                        tips: [
                            "Manage 3D Settings → Program Settings → Agregar cs2.exe",
                            "Ruta: C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe",
                            "Max Frame Rate: 3% menor a tu FPS promedio (Ej: 280 FPS avg = Cap 250)",
                            "NVIDIA Reflex Low Latency: Ultra (si NO usas -noreflex)",
                            "Probar ajustar FPS cap de 10 en 10 para mejor frametime"
                        ]
                    },
                    {
                        title: "NVIDIA Reflex (RTX 2000+)",
                        tips: [
                            "Reduce latencia del sistema hasta 15ms en GPUs RTX 40-series",
                            "Activar en: NVIDIA Control Panel + CS2 In-game settings",
                            "CONFLICTO: Si usas -noreflex en launch options, NO activar Reflex",
                            "-noreflex da mejor frametime en algunos sistemas",
                            "Probar ambas opciones y medir con FrameView/MSI Afterburner"
                        ]
                    },
                    {
                        title: "NVIDIA Profile Inspector (Avanzado)",
                        tips: [
                            "Descargar NVIDIA Profile Inspector de GitHub",
                            "Importar perfil CS2 optimizado (buscar en comunidad)",
                            "NO cambiar nada en 3D Settings después de importar perfil",
                            "Cambios en Control Panel revertirán Profile Inspector"
                        ]
                    },
                    {
                        title: "Configuraciones In-Game CS2 (NVIDIA)",
                        tips: [
                            "Boost Player Contrast: Enabled",
                            "Multisampling Anti-Aliasing: CMAA2 o MSAA 4X",
                            "Global Shadow Quality: Medium",
                            "Model/Texture Detail: Medium",
                            "Shader Detail: Low",
                            "V-Sync: Disabled (importante)",
                            "NVIDIA Reflex Low Latency: On + Boost (probar)"
                        ]
                    }
                ]
            },
            {
                name: "AMD Radeon Settings",
                color: "#ED1C24",
                icon: "🔴",
                sections: [
                    {
                        title: "Instalación Limpia de Drivers",
                        tips: [
                            "Descargar DDU (Display Driver Uninstaller) de techpowerup.com",
                            "Modo Seguro → Ejecutar DDU → Limpiar AMD drivers",
                            "Descargar últimos drivers de amd.com/en/support/download/drivers.html",
                            "Instalar drivers AMD Adrenalin más recientes",
                            "Reiniciar PC después de instalación",
                            "Limpiar Shader Cache si hay problemas: AMD Software → Clear Shader Cache"
                        ]
                    },
                    {
                        title: "AMD Radeon Software - Gaming",
                        tips: [
                            "Radeon Anti-Lag: Enabled (reduce input lag 5-15ms)",
                            "Radeon Boost: Enabled (dynamic resolution scaling)",
                            "Radeon Chill: Disabled (previene limitación de FPS)",
                            "Image Sharpening: 50% (mejora claridad visual)",
                            "FreeSync: Enabled (si tu monitor lo soporta)",
                            "Enhanced Sync: Disabled (conflicto con FreeSync)"
                        ]
                    },
                    {
                        title: "AMD Radeon Software - Graphics",
                        tips: [
                            "Anti-Aliasing: Multisampling (Application Controlled)",
                            "Anti-Aliasing Method: Multisampling",
                            "Anisotropic Filtering: 2x o 4x",
                            "Texture Filtering Quality: Performance",
                            "Surface Format Optimization: Enabled",
                            "Tessellation Mode: Disabled",
                            "Wait for Vertical Refresh: Always Off"
                        ]
                    },
                    {
                        title: "AMD Radeon Software - Display",
                        tips: [
                            "AMD FreeSync: On (monitores compatibles 144Hz+)",
                            "FreeSync elimina screen tearing sin latencia de V-Sync",
                            "Verificar refresh rate máximo en Windows Display Settings",
                            "Custom Resolution: Crear si usas resolución stretched (4:3)"
                        ]
                    },
                    {
                        title: "Prevención de Stuttering",
                        tips: [
                            "Shader Cache: AMD On → Enabled (importante)",
                            "Radeon Boost: Enabled para dynamic resolution",
                            "Tessellation: Override application settings → Off",
                            "Si hay micro-stutters: Limpiar shader cache y reiniciar",
                            "Frame Rate Target Control: Disabled (o ajustar manualmente)"
                        ]
                    },
                    {
                        title: "Configuraciones In-Game CS2 (AMD)",
                        tips: [
                            "Boost Player Contrast: Enabled",
                            "Multisampling Anti-Aliasing: CMAA2 (mejor para AMD)",
                            "Global Shadow Quality: Medium",
                            "Model/Texture Detail: Medium",
                            "Shader Detail: Low o Medium (según GPU)",
                            "Particle Detail: Low",
                            "Ambient Occlusion: Disabled",
                            "V-Sync: Disabled"
                        ]
                    },
                    {
                        title: "Resolución y Aspect Ratio",
                        tips: [
                            "Resoluciones Pro: 1280x960 (4:3), 1024x768 (4:3), 1920x1080 (16:9)",
                            "4:3 Stretched hace modelos de enemigos más anchos",
                            "AMD Custom Resolution: Crear en Radeon Software → Display",
                            "Activar GPU Scaling para stretched en AMD"
                        ]
                    }
                ]
            },
            {
                name: "Configuraciones In-Game",
                color: "#FFD93D",
                icon: "🎮",
                sections: [
                    {
                        title: "Video Settings - Rendimiento",
                        tips: [
                            "Boost Player Contrast: Enabled (mejor visibilidad)",
                            "Brightness: 110-130% (según preferencia)",
                            "V-Sync: Disabled (SIEMPRE)",
                            "NVIDIA Reflex Low Latency: On + Boost (RTX GPUs)",
                            "Multisampling Anti-Aliasing: CMAA2 o MSAA 2X",
                            "Global Shadow Quality: Medium (importante para info táctica)",
                            "Model / Texture Detail: Medium o High",
                            "Shader Detail: Low",
                            "Particle Detail: Low",
                            "Ambient Occlusion: Disabled",
                            "High Dynamic Range: Performance",
                            "FidelityFX Super Resolution: Disabled (salvo FPS muy bajo)"
                        ]
                    },
                    {
                        title: "Video Settings - Calidad Visual",
                        tips: [
                            "Para PCs potentes (RTX 3070+, RX 6800+):",
                            "Multisampling Anti-Aliasing: MSAA 4X o MSAA 8X",
                            "Global Shadow Quality: High",
                            "Model / Texture Detail: High",
                            "Shader Detail: Medium",
                            "Effect Detail: Medium",
                            "Manteniendo 200+ FPS constantes"
                        ]
                    },
                    {
                        title: "Audio Settings",
                        tips: [
                            "Master Volume: 70-80% (ajustar al gusto)",
                            "Advanced 3D Audio Processing: Yes (sonido espacial)",
                            "Audio Device: Auriculares gaming de calidad",
                            "Enable Voice: Yes",
                            "Voice Chat Audio: 50-70%",
                            "Desactivar música de menú/ronda en autoexec.cfg"
                        ]
                    },
                    {
                        title: "Mouse Settings",
                        tips: [
                            "Sensitivity: 0.5 - 3.0 (dependiendo de DPI)",
                            "eDPI óptimo: 600-1000 (DPI × sens)",
                            "Raw Input: 1 (SIEMPRE activado)",
                            "Mouse Acceleration: 0 (SIEMPRE desactivado)",
                            "Zoom Sensitivity: 0.818933 o 1.0",
                            "Desactivar aceleración en Windows: Mouse Properties → Pointer Options → Uncheck 'Enhance pointer precision'"
                        ]
                    },
                    {
                        title: "Crosshair Settings",
                        tips: [
                            "Usar código de share: apply_crosshair_code en consola",
                            "Biblioteca de miras pro disponible en tab 'Biblioteca'",
                            "Miras pequeñas: Mejor para precision shooting",
                            "Miras grandes: Mejor para spraying",
                            "Probar miras de pros con rol similar al tuyo",
                            "Mantener misma mira mínimo 2-3 semanas"
                        ]
                    },
                    {
                        title: "Game Settings",
                        tips: [
                            "Team Settings → Enable Developer Console: Yes",
                            "HUD Edge Positions: ajustar según preferencia",
                            "HUD Scale: 0.85 - 1.0",
                            "Radar Scale: 0.7 - 1.0",
                            "Radar Centers The Player: No (ver más mapa)",
                            "Show Teammate Colors in Competitive: Yes",
                            "Clan Tag: Agregar tag personalizado si quieres"
                        ]
                    }
                ]
            }
        ];
        
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        const grid = document.getElementById('optimizationGrid');
        if (!grid) return;
        
        grid.innerHTML = this.configs.map((config, index) => {
            // Check if this card should be expanded
            const savedIndex = window.persistenceManager?.getExpandedCard('optimization');
            const shouldExpand = savedIndex === index;
            
            return `
                <div class="optimization-card ${shouldExpand ? 'expanded' : ''}" data-color="${config.color}" data-index="${index}">
                    <div class="optimization-card-header" style="border-left: 4px solid ${config.color}">
                        <div class="optimization-card-icon">${config.icon}</div>
                        <h3 class="optimization-card-title">${config.name}</h3>
                        <svg class="optimization-card-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                    <div class="optimization-card-content">
                        ${config.sections.map(section => `
                            <div class="optimization-section">
                                <h4 class="optimization-section-title" style="color: ${config.color}">${section.title}</h4>
                                <ul class="optimization-tips-list">
                                    ${section.tips.map(tip => {
                                        // Check if it's a command/code (starts with special chars or contains //)
                                        const isCode = tip.match(/^[-+]/) || tip.includes('//') || tip.includes('\\') || tip.includes('→');
                                        if (isCode) {
                                            return `<li class="optimization-tip optimization-code">${tip}</li>`;
                                        }
                                        return `<li class="optimization-tip">${tip}</li>`;
                                    }).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    attachEventListeners() {
        const cards = document.querySelectorAll('.optimization-card');
        
        cards.forEach((card, cardIndex) => {
            const header = card.querySelector('.optimization-card-header');
            
            header.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                // Close all other cards
                cards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
                
                // Save expanded state
                const index = parseInt(card.dataset.index);
                if (!isExpanded) {
                    window.persistenceManager?.saveExpandedCard('optimization', index);
                } else {
                    window.persistenceManager?.saveExpandedCard('optimization', null);
                }
                
                // Scroll into view if expanding
                if (!isExpanded) {
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                }
            });
        });
        
        // Copy code on click
        const codeElements = document.querySelectorAll('.optimization-code');
        codeElements.forEach(code => {
            code.style.cursor = 'pointer';
            code.title = 'Click para copiar';
            
            code.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = code.textContent.split('//')[0].trim(); // Get command without comment
                navigator.clipboard.writeText(text).then(() => {
                    // Visual feedback
                    const originalBg = code.style.backgroundColor;
                    code.style.backgroundColor = 'rgba(76, 205, 196, 0.2)';
                    setTimeout(() => {
                        code.style.backgroundColor = originalBg;
                    }, 200);
                    
                    showToast('Copiado al portapapeles');
                }).catch(err => {
                    console.error('Error al copiar:', err);
                });
            });
        });
    }
}

// ===========================
// PERSISTENCE MANAGER
// ===========================
class PersistenceManager {
    constructor() {
        this.storageKey = 'cs2ToolsState';
    }
    
    // Save current tab
    saveCurrentTab(tabId) {
        const state = this.getState();
        state.currentTab = tabId;
        this.setState(state);
    }
    
    // Get saved tab
    getSavedTab() {
        const state = this.getState();
        return state.currentTab || 'library';
    }
    
    // Save expanded cards
    saveExpandedCard(category, cardIndex) {
        const state = this.getState();
        if (!state.expandedCards) state.expandedCards = {};
        state.expandedCards[category] = cardIndex;
        this.setState(state);
    }
    
    // Get expanded card
    getExpandedCard(category) {
        const state = this.getState();
        return state.expandedCards?.[category] || null;
    }
    
    // Save search filter
    saveSearchFilter(filter) {
        const state = this.getState();
        state.searchFilter = filter;
        this.setState(state);
    }
    
    // Get search filter
    getSearchFilter() {
        const state = this.getState();
        return state.searchFilter || '';
    }
    
    // Save team filter
    saveTeamFilter(team) {
        const state = this.getState();
        state.teamFilter = team;
        this.setState(state);
    }
    
    // Get team filter
    getTeamFilter() {
        const state = this.getState();
        return state.teamFilter || 'all';
    }
    
    // Generic state management
    getState() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        } catch (e) {
            return {};
        }
    }
    
    setState(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (e) {
            console.error('Error saving state:', e);
        }
    }
}

// Initialize global persistence manager
window.persistenceManager = new PersistenceManager();

// Category Navigation with Persistence
function initCategoryNavigation() {
    const tabLibrary = document.getElementById('tabLibrary');
    const tabGuides = document.getElementById('tabGuides');
    const tabOptimization = document.getElementById('tabOptimization');
    const tabCalculator = document.getElementById('tabCalculator');
    const librarySection = document.getElementById('librarySection');
    const guidesSection = document.getElementById('guidesSection');
    const optimizationSection = document.getElementById('optimizationSection');
    const calculatorSection = document.getElementById('calculatorSection');
    
    // Helper function to switch tabs
    function switchTab(activeTab, activeSection) {
        // Remove all active states
        [tabLibrary, tabGuides, tabOptimization, tabCalculator].forEach(tab => tab?.classList.remove('active'));
        [librarySection, guidesSection, optimizationSection, calculatorSection].forEach(section => section?.classList.remove('active'));
        
        // Add active state to selected
        activeTab?.classList.add('active');
        activeSection?.classList.add('active');
        
        // Save to localStorage
        const tabId = activeTab?.id.replace('tab', '').toLowerCase();
        window.persistenceManager.saveCurrentTab(tabId);
    }
    
    tabLibrary?.addEventListener('click', () => {
        switchTab(tabLibrary, librarySection);
    });
    
    tabGuides?.addEventListener('click', () => {
        switchTab(tabGuides, guidesSection);
    });
    
    tabOptimization?.addEventListener('click', () => {
        switchTab(tabOptimization, optimizationSection);
    });
    
    tabCalculator?.addEventListener('click', () => {
        switchTab(tabCalculator, calculatorSection);
    });
    
    // Restore last visited tab
    const savedTab = window.persistenceManager.getSavedTab();
    const tabMap = {
        'library': [tabLibrary, librarySection],
        'guides': [tabGuides, guidesSection],
        'optimization': [tabOptimization, optimizationSection],
        'calculator': [tabCalculator, calculatorSection]
    };
    
    if (savedTab && tabMap[savedTab]) {
        switchTab(tabMap[savedTab][0], tabMap[savedTab][1]);
    }
}


// ===========================
// FEEDBACK MANAGER (SUPABASE)
// ===========================
class FeedbackManager {
    constructor() {
        this.currentSessionFeedback = null;
        this.initializeElements();
        this.attachEventListeners();
        this.loadAndUpdateStats();
    }
    
    initializeElements() {
        this.feedbackPanel = document.getElementById('feedbackPanel');
        this.feedbackButtons = document.getElementById('feedbackButtons');
        this.feedbackYesBtn = document.getElementById('feedbackYesBtn');
        this.feedbackNoBtn = document.getElementById('feedbackNoBtn');
        this.feedbackCommentSection = document.getElementById('feedbackCommentSection');
        this.feedbackComment = document.getElementById('feedbackComment');
        this.submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
        this.skipFeedbackBtn = document.getElementById('skipFeedbackBtn');
        this.feedbackThanks = document.getElementById('feedbackThanks');
        this.feedbackStats = document.getElementById('feedbackStats');
        this.feedbackYesCount = document.getElementById('feedbackYesCount');
        this.feedbackNoCount = document.getElementById('feedbackNoCount');
        this.feedbackCommentCount = document.getElementById('feedbackCommentCount');
    }
    
    attachEventListeners() {
        this.feedbackYesBtn?.addEventListener('click', () => this.selectFeedback('yes'));
        this.feedbackNoBtn?.addEventListener('click', () => this.selectFeedback('no'));
        this.submitFeedbackBtn?.addEventListener('click', () => this.submitFeedback());
        this.skipFeedbackBtn?.addEventListener('click', () => this.submitFeedback());
    }
    
    // Show feedback panel after calculation complete
    showFeedbackPanel() {
        if (this.feedbackPanel) {
            this.feedbackPanel.style.display = 'block';
            this.resetFeedbackPanel();
            
            // Smooth scroll to feedback panel
            setTimeout(() => {
                this.feedbackPanel.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 300);
        }
    }
    
    // Reset feedback panel to initial state
    resetFeedbackPanel() {
        this.currentSessionFeedback = null;
        this.feedbackYesBtn?.classList.remove('selected');
        this.feedbackNoBtn?.classList.remove('selected');
        this.feedbackButtons.style.display = 'grid';
        this.feedbackCommentSection.style.display = 'none';
        this.feedbackThanks.style.display = 'none';
        this.feedbackComment.value = '';
    }
    
    // Handle feedback selection
    selectFeedback(type) {
        this.currentSessionFeedback = {
            type: type,
            timestamp: new Date().toISOString(),
            sensitivity: document.getElementById('finalSensitivity')?.textContent || 'N/A',
            edpi: document.getElementById('edpiValue')?.textContent || 'N/A'
        };
        
        // Visual feedback
        if (type === 'yes') {
            this.feedbackYesBtn.classList.add('selected');
            this.feedbackNoBtn?.classList.remove('selected');
        } else {
            this.feedbackNoBtn.classList.add('selected');
            this.feedbackYesBtn?.classList.remove('selected');
        }
        
        // Show comment section
        setTimeout(() => {
            this.feedbackButtons.style.display = 'none';
            this.feedbackCommentSection.style.display = 'block';
            this.feedbackComment.focus();
        }, 300);
    }
    
    // Submit feedback to Supabase
    async submitFeedback() {
        if (!this.currentSessionFeedback) return;
        
        // Add comment if provided
        const comment = this.feedbackComment.value.trim();
        if (comment) {
            this.currentSessionFeedback.comment = comment;
        }
        
        // Save to Supabase
        await this.saveFeedback(this.currentSessionFeedback);
        
        // Show thank you message
        this.feedbackCommentSection.style.display = 'none';
        this.feedbackThanks.style.display = 'block';
        
        // Update stats
        await this.loadAndUpdateStats();
        
        // Show toast notification
        showToast(`¡Gracias por tu feedback! ${this.currentSessionFeedback.type === 'yes' ? '👍' : '👎'}`);
    }
    
    // Save feedback to Supabase
    async saveFeedback(feedback) {
        try {
            const { data, error } = await supabase
                .from('feedback')
                .insert([{
                    feedback_type: feedback.type,
                    comment: feedback.comment || null,
                    sensitivity: feedback.sensitivity,
                    edpi: feedback.edpi,
                    user_agent: navigator.userAgent,
                    created_at: feedback.timestamp
                }]);
            
            if (error) {
                console.error('Error saving feedback to Supabase:', error);
                // Fallback to localStorage if Supabase fails
                this.saveFeedbackLocal(feedback);
            } else {
                console.log('✅ Feedback guardado en Supabase:', feedback.type);
            }
        } catch (e) {
            console.error('Error connecting to Supabase:', e);
            this.saveFeedbackLocal(feedback);
        }
    }
    
    // Fallback: save to localStorage
    saveFeedbackLocal(feedback) {
        try {
            const storageKey = 'cs2CalculatorFeedbackLocal';
            const feedbacks = JSON.parse(localStorage.getItem(storageKey) || '[]');
            feedbacks.push(feedback);
            localStorage.setItem(storageKey, JSON.stringify(feedbacks));
            console.log('💾 Feedback guardado localmente (fallback)');
        } catch (e) {
            console.error('Error saving feedback locally:', e);
        }
    }
    
    // Load stats from Supabase and update display
    async loadAndUpdateStats() {
        try {
            const stats = await this.getStatsFromSupabase();
            
            if (this.feedbackYesCount) this.feedbackYesCount.textContent = stats.yes;
            if (this.feedbackNoCount) this.feedbackNoCount.textContent = stats.no;
            if (this.feedbackCommentCount) this.feedbackCommentCount.textContent = stats.withComments;
            
            console.log('📊 Stats de feedback:', stats);
        } catch (e) {
            console.error('Error loading stats:', e);
        }
    }
    
    // Get statistics from Supabase
    async getStatsFromSupabase() {
        try {
            // Get all feedback
            const { data, error } = await supabase
                .from('feedback')
                .select('feedback_type, comment');
            
            if (error) throw error;
            
            const yesCount = data.filter(f => f.feedback_type === 'yes').length;
            const noCount = data.filter(f => f.feedback_type === 'no').length;
            const commentCount = data.filter(f => f.comment && f.comment.length > 0).length;
            
            return {
                total: data.length,
                yes: yesCount,
                no: noCount,
                withComments: commentCount,
                satisfactionRate: data.length > 0 
                    ? ((yesCount / data.length) * 100).toFixed(1) 
                    : 0
            };
        } catch (error) {
            console.error('Error fetching stats from Supabase:', error);
            return { total: 0, yes: 0, no: 0, withComments: 0, satisfactionRate: 0 };
        }
    }
    
    // Get feedback statistics (public API)
    async getStats() {
        return await this.getStatsFromSupabase();
    }
}

// Initialize global feedback manager
window.feedbackManager = new FeedbackManager();


// ===========================
// PAGE VIEWS TRACKER (SUPABASE)
// ===========================
class PageViewsTracker {
    constructor() {
        this.countElement = document.getElementById('pageViewsCount');
        this.localStorageKey = 'cs2PageViewsBackup';
        this.initializeViews();
    }
    
    // Initialize and increment page views (global with Supabase)
    async initializeViews() {
        try {
            // Call the PostgreSQL function to increment views
            const { data, error } = await supabase
                .rpc('increment_page_views');
            
            if (error) throw error;
            
            const globalViews = data;
            
            // Save backup locally
            this.saveLocalBackup(globalViews);
            this.updateDisplay(globalViews);
            console.log(`🌐 Visitas globales (Supabase): #${globalViews}`);
        } catch (error) {
            console.warn('⚠️ Error con Supabase, usando contador local:', error.message);
            // Fallback to local storage
            this.useLocalFallback();
        }
    }
    
    // Fallback to local storage if Supabase fails
    useLocalFallback() {
        const localViews = this.getLocalBackup();
        const newViews = localViews + 1;
        this.saveLocalBackup(newViews);
        this.updateDisplay(newViews);
        console.log(`📊 Visitas locales (fallback): #${newViews}`);
    }
    
    // Get local backup
    getLocalBackup() {
        try {
            const views = localStorage.getItem(this.localStorageKey);
            return views ? parseInt(views, 10) : 0;
        } catch (e) {
            return 0;
        }
    }
    
    // Save local backup
    saveLocalBackup(count) {
        try {
            localStorage.setItem(this.localStorageKey, count.toString());
        } catch (e) {
            console.error('Error saving backup:', e);
        }
    }
    
    // Get current global count from Supabase
    async getGlobalViews() {
        try {
            const { data, error } = await supabase
                .from('page_views')
                .select('view_count')
                .eq('id', 1)
                .single();
            
            if (error) throw error;
            
            return data.view_count;
        } catch (e) {
            console.error('Error getting global views:', e);
            return this.getLocalBackup();
        }
    }
    
    // Update the display with animation
    updateDisplay(count) {
        if (!this.countElement) return;
        
        const currentDisplay = parseInt(this.countElement.textContent.replace(/,/g, '')) || 0;
        const difference = count - currentDisplay;
        
        if (difference <= 0) {
            this.countElement.textContent = this.formatNumber(count);
            return;
        }
        
        // Animate count up
        let current = currentDisplay;
        const increment = Math.ceil(difference / 20);
        const duration = 500;
        const steps = Math.min(20, difference);
        const stepDuration = duration / steps;
        
        const animate = () => {
            current += increment;
            if (current >= count) {
                this.countElement.textContent = this.formatNumber(count);
                return;
            }
            this.countElement.textContent = this.formatNumber(current);
            setTimeout(animate, stepDuration);
        };
        
        animate();
    }
    
    // Format number with thousands separator
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Get statistics (public API)
    async getStats() {
        const globalViews = await this.getGlobalViews();
        return {
            totalViews: globalViews,
            formattedViews: this.formatNumber(globalViews),
            isGlobal: true,
            source: 'Supabase'
        };
    }
}

// Initialize page views tracker
window.pageViewsTracker = new PageViewsTracker();
