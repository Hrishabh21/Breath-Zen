let counting = false;
let currentNumber = 0;
let startTime = 0;
let intervalId = null;

function goToHomepage() {
    window.location.href = 'homepage.html';
}

function toggleCounting() {
    const button = document.getElementById('controlButton');
    const countDisplay = document.getElementById('countDisplay');
    const result = document.getElementById('result');
    
    if (!counting) {
        // Start counting
        counting = true;
        currentNumber = 1;
        startTime = Date.now();
        
        button.textContent = 'STOP';
        button.classList.add('stop');
        result.classList.remove('show');
        
        countDisplay.textContent = currentNumber;
        countDisplay.classList.add('counting');
        
        const interval = parseFloat(document.getElementById('interval').value) * 1000;
        
        intervalId = setInterval(() => {
            currentNumber++;
            countDisplay.textContent = currentNumber;
            countDisplay.classList.remove('counting');
            // Trigger reflow to restart animation
            countDisplay.offsetHeight;
            countDisplay.classList.add('counting');
        }, interval);
        
    } else {
        // Stop counting
        counting = false;
        clearInterval(intervalId);
        
        const endTime = Date.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        
        button.textContent = 'START';
        button.classList.remove('stop');
        countDisplay.classList.remove('counting');
        countDisplay.textContent = 'Ready to count';
        
        // Show results
        document.getElementById('totalTime').textContent = totalTime;
        document.getElementById('lastNumber').textContent = currentNumber;
        result.classList.add('show');
    }
}

// Allow Enter key to toggle counting
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        toggleCounting();
    }
});

// Prevent form submission on Enter in input field
document.getElementById('interval').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        toggleCounting();
    }
});
