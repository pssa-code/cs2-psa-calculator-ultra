// ===========================
// HEADSHOT PRECISION TEST SYSTEM
// ===========================
// Objective tests to measure real aiming performance
// and recommend optimal sensitivity for headshots

class HeadshotPrecisionTests {
    constructor(calculator) {
        this.calculator = calculator;
        this.canvas = null;
        this.ctx = null;
        this.currentTest = null;
        
        // Test results storage
        this.testResults = {
            tracking: [],
            flick: [],
            combined: null
        };
        
        // Test parameters
        this.testDuration = 10; // seconds per test
        this.testSensitivity = null;
        
        this.initializeElements();
    }
    
    initializeElements() {
        this.testPanel = document.getElementById('precisionTestPanel');
        this.testCanvas = document.getElementById('precisionTestCanvas');
        this.testInstructions = document.getElementById('testInstructions');
        this.testProgress = document.getElementById('testProgress');
        this.testMetrics = document.getElementById('testMetrics');
        this.startTrackingBtn = document.getElementById('startTrackingTest');
        this.startFlickBtn = document.getElementById('startFlickTest');
        this.skipTestsBtn = document.getElementById('skipPrecisionTests');
        this.testResultsDisplay = document.getElementById('testResultsDisplay');
        
        if (this.testCanvas) {
            this.ctx = this.testCanvas.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        this.startTrackingBtn?.addEventListener('click', () => this.startTrackingTest());
        this.startFlickBtn?.addEventListener('click', () => this.startFlickTest());
        this.skipTestsBtn?.addEventListener('click', () => this.skipTests());
    }
    
    resizeCanvas() {
        if (!this.testCanvas) return;
        
        const container = this.testCanvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Set canvas size with proper scaling
        const dpr = window.devicePixelRatio || 1;
        this.testCanvas.width = rect.width * dpr;
        this.testCanvas.height = 400 * dpr; // Fixed height
        
        // Scale canvas for HiDPI displays
        this.testCanvas.style.width = rect.width + 'px';
        this.testCanvas.style.height = '400px';
        
        if (this.ctx) {
            this.ctx.scale(dpr, dpr);
            this.ctx.imageSmoothingEnabled = true;
        }
        
        // Ensure canvas is visible
        this.testCanvas.style.display = 'block';
        
        console.log('Canvas resized:', {
            width: rect.width,
            height: 400,
            dpr: dpr,
            canvasWidth: this.testCanvas.width,
            canvasHeight: this.testCanvas.height
        });
    }
    
    // Show test panel
    showTestPanel() {
        if (this.testPanel) {
            this.testPanel.style.display = 'block';
            this.updateInstructions('initial');
            
            // Force canvas resize after panel is shown
            setTimeout(() => {
                this.resizeCanvas();
                
                // Draw initial background to verify canvas is working
                if (this.ctx) {
                    this.ctx.fillStyle = '#18181B';
                    this.ctx.fillRect(0, 0, this.testCanvas.getBoundingClientRect().width, 400);
                    
                    // Draw "Ready" message
                    this.ctx.fillStyle = '#A1A1AA';
                    this.ctx.font = '20px Inter';
                    this.ctx.textAlign = 'center';
                    const rect = this.testCanvas.getBoundingClientRect();
                    this.ctx.fillText('Canvas listo - Haz click en "Comenzar Tracking Test"', rect.width / 2, 200);
                    
                    console.log('Test panel shown and canvas initialized');
                }
            }, 100);
        }
    }
    
    // Hide test panel
    hideTestPanel() {
        if (this.testPanel) {
            this.testPanel.style.display = 'none';
        }
    }
    
    // Update instructions
    updateInstructions(phase) {
        if (!this.testInstructions) return;
        
        const instructions = {
            'initial': `
                <h3>🎯 Tests de Precisión para Headshots</h3>
                <p>Vamos a medir tu precisión objetiva con 2 tests rápidos:</p>
                <ul>
                    <li><strong>Tracking Test (10s):</strong> Sigue el objetivo en movimiento</li>
                    <li><strong>Flick Test (10s):</strong> Haz click en los objetivos que aparecen</li>
                </ul>
                <p>Estos tests medirán tu precisión real y te darán la mejor sensibilidad para headshots.</p>
            `,
            'tracking': `
                <h3>🎯 Tracking Test</h3>
                <p><strong>Instrucciones:</strong> Mantén tu cursor sobre el círculo rojo en movimiento. No hagas click, solo sigue el objetivo.</p>
                <p>Tiempo: <strong id="trackingTimer">10s</strong></p>
            `,
            'flick': `
                <h3>⚡ Flick Test</h3>
                <p><strong>Instrucciones:</strong> Haz click en los objetivos rojos lo más rápido y preciso posible.</p>
                <p>Clicks: <strong id="flickScore">0/20</strong> | Precisión: <strong id="flickAccuracy">0%</strong></p>
            `,
            'complete': `
                <h3>✅ Tests Completados</h3>
                <p>Excelente trabajo. Analizando tus resultados...</p>
            `
        };
        
        this.testInstructions.innerHTML = instructions[phase] || instructions['initial'];
    }
    
    // ===========================
    // TRACKING TEST
    // ===========================
    
    startTrackingTest() {
        if (!this.ctx) {
            console.error('Canvas context not available');
            return;
        }
        
        // Force resize canvas before starting
        this.resizeCanvas();
        
        this.currentTest = 'tracking';
        this.updateInstructions('tracking');
        
        // Disable buttons
        this.startTrackingBtn.disabled = true;
        this.startFlickBtn.disabled = true;
        
        // Get actual canvas display dimensions
        const rect = this.testCanvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Test state
        const testState = {
            startTime: Date.now(),
            duration: this.testDuration * 1000,
            targetX: rect.width / 2,
            targetY: 200, // Center of 400px height
            targetRadius: 20,
            targetSpeed: 2,
            targetAngle: Math.random() * Math.PI * 2,
            samples: [],
            mouseX: rect.width / 2,
            mouseY: 200,
            displayWidth: rect.width,
            displayHeight: 400,
            dpr: dpr
        };
        
        console.log('Starting tracking test with state:', testState);
        
        // Mouse tracking
        const trackMouse = (e) => {
            const rect = this.testCanvas.getBoundingClientRect();
            testState.mouseX = e.clientX - rect.left;
            testState.mouseY = e.clientY - rect.top;
        };
        
        this.testCanvas.addEventListener('mousemove', trackMouse);
        
        // Animation loop
        const animate = () => {
            const elapsed = Date.now() - testState.startTime;
            const remaining = Math.max(0, testState.duration - elapsed);
            
            if (remaining === 0) {
                this.testCanvas.removeEventListener('mousemove', trackMouse);
                this.finishTrackingTest(testState);
                return;
            }
            
            // Update timer
            const timerEl = document.getElementById('trackingTimer');
            if (timerEl) {
                timerEl.textContent = Math.ceil(remaining / 1000) + 's';
            }
            
            // Clear canvas - use DISPLAY dimensions, not canvas.width
            this.ctx.fillStyle = '#18181B';
            this.ctx.fillRect(0, 0, testState.displayWidth, testState.displayHeight);
            
            // Update target position (smooth circular movement)
            testState.targetAngle += 0.02;
            const centerX = testState.displayWidth / 2;
            const centerY = testState.displayHeight / 2;
            const radius = Math.min(testState.displayWidth, testState.displayHeight) / 3;
            
            testState.targetX = centerX + Math.cos(testState.targetAngle) * radius;
            testState.targetY = centerY + Math.sin(testState.targetAngle) * radius;
            
            // Calculate distance from cursor to target
            const dx = testState.mouseX - testState.targetX;
            const dy = testState.mouseY - testState.targetY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Store sample
            testState.samples.push({
                distance: distance,
                timestamp: elapsed
            });
            
            // Draw target (LARGE RED CIRCLE)
            this.ctx.beginPath();
            this.ctx.arc(testState.targetX, testState.targetY, testState.targetRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#EF4444'; // Bright red
            this.ctx.fill();
            
            // Draw target outline for better visibility
            this.ctx.strokeStyle = '#FCA5A5';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw cursor indicator (cyan dot)
            this.ctx.beginPath();
            this.ctx.arc(testState.mouseX, testState.mouseY, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#08D3BB';
            this.ctx.fill();
            
            // Draw line connecting cursor to target
            this.ctx.beginPath();
            this.ctx.moveTo(testState.mouseX, testState.mouseY);
            this.ctx.lineTo(testState.targetX, testState.targetY);
            this.ctx.strokeStyle = distance < testState.targetRadius ? '#22C55E' : '#EF4444';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            requestAnimationFrame(animate);
        };
        
        // Start animation
        console.log('Starting animation loop...');
        animate();
    }
    
    finishTrackingTest(testState) {
        // Calculate metrics
        const avgDistance = testState.samples.reduce((sum, s) => sum + s.distance, 0) / testState.samples.length;
        const accuracy = Math.max(0, Math.min(100, 100 - (avgDistance / testState.targetRadius) * 50));
        const onTargetSamples = testState.samples.filter(s => s.distance < testState.targetRadius).length;
        const timeOnTarget = (onTargetSamples / testState.samples.length) * 100;
        
        const results = {
            avgDistance: avgDistance.toFixed(2),
            accuracy: accuracy.toFixed(1),
            timeOnTarget: timeOnTarget.toFixed(1),
            samples: testState.samples.length
        };
        
        this.testResults.tracking.push(results);
        
        console.log('📊 Tracking Test Results:', results);
        
        // Show completion
        this.ctx.fillStyle = '#18181B';
        this.ctx.fillRect(0, 0, testState.displayWidth, testState.displayHeight);
        
        this.ctx.fillStyle = '#22C55E';
        this.ctx.font = 'bold 24px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('✓ Tracking Test Completado', testState.displayWidth / 2, testState.displayHeight / 2 - 40);
        
        this.ctx.fillStyle = '#A1A1AA';
        this.ctx.font = '18px Inter';
        this.ctx.fillText(`Precisión: ${results.accuracy}%`, testState.displayWidth / 2, testState.displayHeight / 2);
        this.ctx.fillText(`Tiempo en target: ${results.timeOnTarget}%`, testState.displayWidth / 2, testState.displayHeight / 2 + 30);
        
        // Re-enable buttons
        this.startFlickBtn.disabled = false;
        
        // Auto-start flick test after 2 seconds
        setTimeout(() => {
            this.startFlickTest();
        }, 2000);
    }
    
    // ===========================
    // FLICK TEST
    // ===========================
    
    startFlickTest() {
        if (!this.ctx) {
            console.error('Canvas context not available');
            return;
        }
        
        // Force resize canvas before starting
        this.resizeCanvas();
        
        this.currentTest = 'flick';
        this.updateInstructions('flick');
        
        // Disable buttons
        this.startTrackingBtn.disabled = true;
        this.startFlickBtn.disabled = true;
        
        // Get actual canvas display dimensions
        const rect = this.testCanvas.getBoundingClientRect();
        
        // Test state
        const testState = {
            startTime: Date.now(),
            totalTargets: 20,
            currentTarget: 0,
            targets: [],
            targetRadius: 25,
            clicks: [],
            targetX: 0,
            targetY: 0,
            targetAppearTime: 0,
            waiting: false,
            displayWidth: rect.width,
            displayHeight: 400
        };
        
        console.log('Starting flick test with state:', testState);
        
        // Generate next target
        const generateTarget = () => {
            const margin = testState.targetRadius + 20;
            testState.targetX = margin + Math.random() * (testState.displayWidth - margin * 2);
            testState.targetY = margin + Math.random() * (testState.displayHeight - margin * 2);
            testState.targetAppearTime = Date.now();
            testState.waiting = false;
        };
        
        // Mouse click handler
        const handleClick = (e) => {
            if (testState.waiting) return;
            
            const rect = this.testCanvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            const dx = clickX - testState.targetX;
            const dy = clickY - testState.targetY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const reactionTime = Date.now() - testState.targetAppearTime;
            
            const hit = distance < testState.targetRadius;
            
            testState.clicks.push({
                hit: hit,
                distance: distance,
                reactionTime: reactionTime,
                clickX: clickX,
                clickY: clickY,
                targetX: testState.targetX,
                targetY: testState.targetY
            });
            
            testState.currentTarget++;
            
            // Update UI
            const scoreEl = document.getElementById('flickScore');
            const accEl = document.getElementById('flickAccuracy');
            if (scoreEl) {
                scoreEl.textContent = `${testState.currentTarget}/${testState.totalTargets}`;
            }
            if (accEl) {
                const hits = testState.clicks.filter(c => c.hit).length;
                const accuracy = (hits / testState.clicks.length) * 100;
                accEl.textContent = accuracy.toFixed(1) + '%';
            }
            
            if (testState.currentTarget >= testState.totalTargets) {
                this.testCanvas.removeEventListener('click', handleClick);
                this.finishFlickTest(testState);
                return;
            }
            
            // Brief pause before next target
            testState.waiting = true;
            setTimeout(() => {
                generateTarget();
            }, 300);
        };
        
        this.testCanvas.addEventListener('click', handleClick);
        
        // Start first target
        generateTarget();
        
        // Animation loop
        const animate = () => {
            if (testState.currentTarget >= testState.totalTargets) return;
            
            // Clear canvas - use DISPLAY dimensions
            this.ctx.fillStyle = '#18181B';
            this.ctx.fillRect(0, 0, testState.displayWidth, testState.displayHeight);
            
            if (!testState.waiting) {
                // Draw target (LARGE RED CIRCLE)
                this.ctx.beginPath();
                this.ctx.arc(testState.targetX, testState.targetY, testState.targetRadius, 0, Math.PI * 2);
                this.ctx.fillStyle = '#EF4444'; // Bright red
                this.ctx.fill();
                
                // Draw target outline for better visibility
                this.ctx.strokeStyle = '#FCA5A5';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
                
                // Draw crosshair
                this.ctx.strokeStyle = '#FFFFFF';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(testState.targetX - 10, testState.targetY);
                this.ctx.lineTo(testState.targetX + 10, testState.targetY);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(testState.targetX, testState.targetY - 10);
                this.ctx.lineTo(testState.targetX, testState.targetY + 10);
                this.ctx.stroke();
            }
            
            requestAnimationFrame(animate);
        };
        
        // Start animation
        console.log('Starting flick animation loop...');
        animate();
    }
    
    finishFlickTest(testState) {
        // Calculate metrics
        const hits = testState.clicks.filter(c => c.hit).length;
        const accuracy = (hits / testState.clicks.length) * 100;
        const avgReactionTime = testState.clicks.reduce((sum, c) => sum + c.reactionTime, 0) / testState.clicks.length;
        const avgDistance = testState.clicks.reduce((sum, c) => sum + c.distance, 0) / testState.clicks.length;
        
        // Detect over/undershooting
        let overshootCount = 0;
        let undershootCount = 0;
        
        testState.clicks.forEach(click => {
            if (!click.hit) {
                const dx = click.clickX - click.targetX;
                const dy = click.clickY - click.targetY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Determine if overshoot or undershoot based on distance
                if (distance > testState.targetRadius * 1.5) {
                    overshootCount++;
                } else {
                    undershootCount++;
                }
            }
        });
        
        const results = {
            accuracy: accuracy.toFixed(1),
            avgReactionTime: avgReactionTime.toFixed(0),
            avgDistance: avgDistance.toFixed(2),
            hits: hits,
            total: testState.clicks.length,
            overshootCount: overshootCount,
            undershootCount: undershootCount
        };
        
        this.testResults.flick.push(results);
        
        console.log('📊 Flick Test Results:', results);
        
        // Show completion
        this.ctx.fillStyle = '#18181B';
        this.ctx.fillRect(0, 0, testState.displayWidth, testState.displayHeight);
        
        this.ctx.fillStyle = '#22C55E';
        this.ctx.font = 'bold 24px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('✓ Flick Test Completado', testState.displayWidth / 2, testState.displayHeight / 2 - 60);
        
        this.ctx.fillStyle = '#A1A1AA';
        this.ctx.font = '18px Inter';
        this.ctx.fillText(`Precisión: ${results.accuracy}%`, testState.displayWidth / 2, testState.displayHeight / 2 - 20);
        this.ctx.fillText(`Tiempo de reacción: ${results.avgReactionTime}ms`, testState.displayWidth / 2, testState.displayHeight / 2 + 10);
        this.ctx.fillText(`Hits: ${results.hits}/${results.total}`, testState.displayWidth / 2, testState.displayHeight / 2 + 40);
        
        // Finish all tests
        setTimeout(() => {
            this.finishAllTests();
        }, 2000);
    }
    
    // ===========================
    // ANALYSIS & RECOMMENDATIONS
    // ===========================
    
    finishAllTests() {
        this.updateInstructions('complete');
        
        // Analyze combined results
        const trackingResults = this.testResults.tracking[0];
        const flickResults = this.testResults.flick[0];
        
        // Calculate combined score
        const trackingScore = parseFloat(trackingResults.accuracy);
        const flickScore = parseFloat(flickResults.accuracy);
        const combinedScore = (trackingScore * 0.6 + flickScore * 0.4); // Tracking is more important for headshots
        
        // Determine sensitivity recommendation based on performance
        let sensRecommendation = null;
        
        // Analyze overshooting vs undershooting
        if (flickResults.overshootCount > flickResults.undershootCount * 2) {
            sensRecommendation = {
                direction: 'lower',
                reason: 'Estás overshooting (pasándote del target). Una sensibilidad más baja te dará más control.',
                adjustment: 0.85 // Reduce 15%
            };
        } else if (flickResults.undershootCount > flickResults.overshootCount * 2) {
            sensRecommendation = {
                direction: 'higher',
                reason: 'Estás undershooting (quedándote corto). Una sensibilidad más alta te ayudará.',
                adjustment: 1.15 // Increase 15%
            };
        } else {
            sensRecommendation = {
                direction: 'balanced',
                reason: 'Tu sensibilidad actual está bien balanceada. Pequeños ajustes pueden optimizarla.',
                adjustment: 1.0
            };
        }
        
        // Store combined results
        this.testResults.combined = {
            trackingAccuracy: trackingScore,
            flickAccuracy: flickScore,
            combinedScore: combinedScore,
            avgReactionTime: parseInt(flickResults.avgReactionTime),
            recommendation: sensRecommendation
        };
        
        console.log('📊 Combined Results:', this.testResults.combined);
        
        // Show results
        this.displayTestResults();
        
        // Continue to PSA calculator with recommended adjustment
        setTimeout(() => {
            this.proceedToPSA();
        }, 5000);
    }
    
    displayTestResults() {
        if (!this.testResultsDisplay) return;
        
        const results = this.testResults.combined;
        
        this.testResultsDisplay.innerHTML = `
            <div class="test-results-summary">
                <h3>📊 Resultados de Precisión</h3>
                
                <div class="test-result-grid">
                    <div class="test-result-item">
                        <span class="test-result-label">Tracking</span>
                        <span class="test-result-value">${results.trackingAccuracy.toFixed(1)}%</span>
                    </div>
                    <div class="test-result-item">
                        <span class="test-result-label">Flicks</span>
                        <span class="test-result-value">${results.flickAccuracy.toFixed(1)}%</span>
                    </div>
                    <div class="test-result-item">
                        <span class="test-result-label">Reacción</span>
                        <span class="test-result-value">${results.avgReactionTime}ms</span>
                    </div>
                    <div class="test-result-item">
                        <span class="test-result-label">Score</span>
                        <span class="test-result-value" style="color: ${results.combinedScore >= 70 ? '#22C55E' : results.combinedScore >= 50 ? '#FBBF24' : '#EF4444'}">${results.combinedScore.toFixed(1)}/100</span>
                    </div>
                </div>
                
                <div class="test-recommendation">
                    <h4>🎯 Recomendación</h4>
                    <p>${results.recommendation.reason}</p>
                    ${results.recommendation.direction !== 'balanced' ? 
                        `<p class="recommendation-adjustment">Ajuste sugerido: <strong>${results.recommendation.direction === 'lower' ? '-15%' : '+15%'} sensibilidad</strong></p>` : 
                        '<p class="recommendation-adjustment">Continuaremos con PSA para encontrar tu punto óptimo exacto.</p>'
                    }
                </div>
            </div>
        `;
        
        this.testResultsDisplay.style.display = 'block';
    }
    
    proceedToPSA() {
        // Apply recommended adjustment to base sensitivity
        if (this.calculator && this.testResults.combined) {
            const currentSens = parseFloat(this.calculator.baseSensInput.value);
            const adjustment = this.testResults.combined.recommendation.adjustment;
            const adjustedSens = currentSens * adjustment;
            
            // Update base sensitivity with adjustment
            this.calculator.baseSensInput.value = adjustedSens.toFixed(3);
            
            // Show toast with recommendation
            showToast(`🎯 Sensibilidad ajustada según tests: ${adjustedSens.toFixed(3)}`);
        }
        
        // Hide test panel
        this.hideTestPanel();
        
        // Show setup panel
        if (this.calculator && this.calculator.setupPanel) {
            this.calculator.setupPanel.style.display = 'block';
        }
    }
    
    skipTests() {
        this.hideTestPanel();
        
        // Show setup panel
        if (this.calculator && this.calculator.setupPanel) {
            this.calculator.setupPanel.style.display = 'block';
        }
        
        showToast('Tests de precisión omitidos. Continuando con PSA clásico.');
    }
    
    // Get test results (public API)
    getResults() {
        return this.testResults;
    }
    
    // Reset tests
    reset() {
        this.testResults = {
            tracking: [],
            flick: [],
            combined: null
        };
        
        if (this.testResultsDisplay) {
            this.testResultsDisplay.style.display = 'none';
            this.testResultsDisplay.innerHTML = '';
        }
        
        if (this.ctx && this.testCanvas) {
            const rect = this.testCanvas.getBoundingClientRect();
            this.ctx.fillStyle = '#18181B';
            this.ctx.fillRect(0, 0, rect.width, 400);
        }
        
        if (this.startTrackingBtn) this.startTrackingBtn.disabled = false;
        if (this.startFlickBtn) this.startFlickBtn.disabled = false;
    }
}

// Global toast function (if not already defined)
function showToast(message, type = 'success') {
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
