let isBreathing = false;
let motivationEnabled = true;
let currentPhase = 'ready';
let cycleCount = 0;
let startTime = 0;
let phaseTimeout = null;
let breathingCycle = null;

function goToHomepage() {
    window.location.href = 'index.html';
}

function toggleCB(){
    const cb = document.getElementById('hold').checked;
    
     const op =document.getElementsByClassName('op')
    for (const el of op) {
        el.style.display=cb?"block":"none";
        
    }

       
}

// Breathing phases
const phases = {
    INHALE: 'inhale',
    INHALE_HOLD: 'inhale-hold',
    EXHALE: 'exhale',
    EXHALE_HOLD: 'exhale-hold'
};


// Motivational texts for each phase
const motivationTexts = {
    inhale: [
        "Fill your lungs with calm energy! 🌱",
        "Breathe in positivity! ✨",
        "You're doing amazing! 💪",
        "Inhale peace, exhale stress! 🧘‍♀️",
        "Fresh oxygen, fresh start! 🌿",
        "Breathe in like a zen master! 🧙‍♂️",
        "Your lungs are happy dancers! 💃",
        "Inhale like you're smelling pizza! 🍕",
        "Breathe in that good good air! 😌",
        "You're a breathing champion! 🏆"
    ],
    inhaleHold: [
        "Hold it like a treasure! 💎",
        "Pause... feel the calm! ⏸️",
        "You're a breath-holding ninja! 🥷",
        "Keep that air cozy inside! 🏠",
        "Marinating in mindfulness! 🍃",
        "Hold steady, rockstar! ⭐",
        "Your patience is golden! ✨",
        "Stillness is your superpower! 🦸‍♀️",
        "Hold like you're underwater! 🐠",
        "Zen mode: ACTIVATED! 🧘‍♂️"
    ],
    exhale: [
        "Release all the tension! 🌊",
        "Let go of today's stress! 🎈",
        "Breathe out like a dragon! 🐉",
        "Whoosh out the worries! 💨",
        "You're melting stress away! 🧊",
        "Exhale like you're blowing birthday candles! 🎂",
        "Release and feel lighter! 🕊️",
        "Out with the old air! 👋",
        "Breathe out negativity! ⚡",
        "You're doing fantastic! 🌟"
    ],
    exhaleHold: [
        "Rest in the emptiness! 🌌",
        "Pause before the next wave! 🌊",
        "You're mastering the art! 🎨",
        "Empty lungs, full heart! ❤️",
        "Stillness before the storm! ⛈️",
        "Hold the space! 🚀",
        "Embrace the quiet! 🤫",
        "You're a breathing Buddha! 🧘‍♂️",
        "Rest like a sleeping cat! 😴",
        "Perfect pause, perfect you! 💫"
    ],
    ready: [
        "Ready to find your zen? 🧘‍♀️",
        "Let's breathe together! 🤝",
        "Your journey starts here! 🌟",
        "Time to become a breath master! 🏆",
        "Ready for some calm magic? ✨"
    ]
};

function getBreathingTimes() {
    return {
        inhale: Math.max(0.5, parseFloat(document.getElementById('inhaleTime').value)),
        inhaleHold: Math.max(0, parseFloat(document.getElementById('inhaleHoldTime').value)),
        exhale: Math.max(0.5, parseFloat(document.getElementById('exhaleTime').value)),
        exhaleHold: Math.max(0, parseFloat(document.getElementById('exhaleHoldTime').value))
    };
}

function getRandomMotivationText(phase) {
    if (!motivationEnabled) return '';
    const texts = motivationTexts[phase] || motivationTexts.ready;
    return texts[Math.floor(Math.random() * texts.length)];
}

function updatePhaseDisplay(phase, timeRemaining = null) {
    const phaseDisplay = document.getElementById('phaseDisplay');
    const breathingBox = document.getElementById('breathingBox');
    const motivationText = document.getElementById('motivationText');
    
    // Remove all phase classes
    breathingBox.classList.remove('inhaling', 'exhaling', 'holding', 'active', 'inhale-hold', 'exhale-hold');
    phaseDisplay.classList.remove('inhaling', 'exhaling', 'holding');
    
    let displayText = '';
    let motivationPhase = 'ready';
    
    switch (phase) {
        case phases.INHALE:
            displayText = 'Breathe In';
            breathingBox.classList.add('inhaling', 'active');
            phaseDisplay.classList.add('inhaling');
            motivationPhase = 'inhale';
            break;
        case phases.INHALE_HOLD:
            displayText = 'Hold';
            breathingBox.classList.add('holding', 'active', 'inhale-hold');
            phaseDisplay.classList.add('holding');
            motivationPhase = 'inhaleHold';
            break;
        case phases.EXHALE:
            displayText = 'Breathe Out';
            breathingBox.classList.add('exhaling', 'active');
            phaseDisplay.classList.add('exhaling');
            motivationPhase = 'exhale';
            break;
        case phases.EXHALE_HOLD:
            displayText = 'Hold';
            breathingBox.classList.add('holding', 'active', 'exhale-hold');
            phaseDisplay.classList.add('holding');
            motivationPhase = 'exhaleHold';
            break;
        default:
            displayText = 'Ready to breathe';
            motivationPhase = 'ready';
            break;
    }
    
    phaseDisplay.textContent = displayText;
    if (motivationEnabled) {
        motivationText.style.display = '';
        motivationText.textContent = getRandomMotivationText(motivationPhase);
    } else {
        motivationText.style.display = 'none';
    }
}

function setPhaseAnimation(duration) {
    const breathingBox = document.getElementById('breathingBox');
    breathingBox.style.setProperty('--phase-duration', `${duration}s`);
}

function runBreathingPhase(phase, duration, onComplete) {
    if (!isBreathing) return;
    
    updatePhaseDisplay(phase);
    setPhaseAnimation(duration);
    
    if (duration > 0) {
        phaseTimeout = setTimeout(() => {
            if (isBreathing && onComplete) {
                onComplete();
            }
        }, duration * 1000);
    } else {
        // Skip phase if duration is 0
        if (onComplete) {
            onComplete();
        }
    }
}

function startBreathingCycle() {
    if (!isBreathing) return;
   
    const times = getBreathingTimes();
    const targetCycles = Math.max(0, parseInt(document.getElementById('targetCycles').value))
    
    // Inhale phase
    runBreathingPhase(phases.INHALE, times.inhale, () => {
        // Inhale hold phase (skip if 0)
        if (times.inhaleHold > 0) {
            runBreathingPhase(phases.INHALE_HOLD, times.inhaleHold, () => {
                // Exhale phase
                runBreathingPhase(phases.EXHALE, times.exhale, () => {
                    // Exhale hold phase (skip if 0)
                    if (times.exhaleHold > 0) {
                        runBreathingPhase(phases.EXHALE_HOLD, times.exhaleHold, () => {
                            cycleCount++;
                            startBreathingCycle(); // Start next cycle
                        });
                    } else {
                        cycleCount++;
                        startBreathingCycle(); // Start next cycle
                    }
                });
            });
        } else {
            // Skip inhale hold, go directly to exhale
            runBreathingPhase(phases.EXHALE, times.exhale, () => {
                // Exhale hold phase (skip if 0)
                if (times.exhaleHold > 0) {
                    runBreathingPhase(phases.EXHALE_HOLD, times.exhaleHold, () => {
                        cycleCount++;
                        startBreathingCycle(); // Start next cycle
                    });
                } else {
                    cycleCount++;
                    if(cycleCount==targetCycles){
                        isBreathing=true;
                        toggleBreathing();
                    }
                    startBreathingCycle(); // Start next cycle
                }
            });
        }
    });
}

function toggleBreathing() {
    const button = document.getElementById('controlButton');
    const result = document.getElementById('result');
    
    if (!isBreathing) {
        // Start breathing exercise
        isBreathing = true;
        cycleCount = 0;
        startTime = Date.now();
        
        button.textContent = 'STOP';
        button.classList.add('stop');
        result.classList.remove('show');
        
        // Validate inputs
        const times = getBreathingTimes();
        if (times.inhale < 0.5 || times.exhale < 0.5) {
            alert('Inhale and exhale times must be at least 0.5 seconds.');
            isBreathing = false;
            button.textContent = 'START';
            button.classList.remove('stop');
            return;
        }
        
        startBreathingCycle();
        
    } else {
        // Stop breathing exercise
        isBreathing = false;
        clearTimeout(phaseTimeout);
        
        const endTime = Date.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(1);
        
        button.textContent = 'START';
        button.classList.remove('stop');
        
        // Reset visual state
        updatePhaseDisplay('ready');
        
        // Show results
        document.getElementById('cyclesCompleted').textContent = cycleCount;
        document.getElementById('totalTime').textContent = totalTime;
        result.classList.add('show');
    }
}

// Allow Enter key to toggle breathing
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        toggleBreathing();
    }
});

// Prevent form submission on Enter in input fields and validate minimum values
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            toggleBreathing();
        }
    });
    
    // Enforce minimum values
    input.addEventListener('input', function() {
        const minValue = this.id === 'inhaleTime' || this.id === 'exhaleTime' ? 0.5 : 0;
        if (parseFloat(this.value) < minValue) {
            this.value = minValue;
        }
    });
    
    input.addEventListener('blur', function() {
        const minValue = this.id === 'inhaleTime' || this.id === 'exhaleTime' ? 0.5 : 0;
        if (parseFloat(this.value) < minValue) {
            this.value = minValue;
        }
    });
});

// Initialize display

function toggleMotivationText() {
    motivationEnabled = !motivationEnabled;
    const btn = document.getElementById('toggleMotivationBtn');
    if (motivationEnabled) {
        btn.textContent = 'Disable Text';
    } else {
        btn.textContent = 'Enable Text';
    }
    updatePhaseDisplay(currentPhase);
}

updatePhaseDisplay('ready');
