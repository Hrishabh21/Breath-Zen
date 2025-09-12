// Navigation function to redirect to exercises
function goToExercise(exerciseFile) {
    // Add a smooth transition effect before navigation
    const card = event.target.closest('.exercise-card');
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0.8';
    
    // Navigate after a short delay for visual feedback
    setTimeout(() => {
        window.location.href = exerciseFile;
    }, 200);
}

// Add click event listeners to exercise cards
document.addEventListener('DOMContentLoaded', function() {
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    exerciseCards.forEach(card => {
        // Add hover effects for better interactivity
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click functionality to the entire card
        card.addEventListener('click', function(e) {
            // Don't trigger if button was clicked (button has its own handler)
            if (!e.target.closest('.card-button')) {
                const exercise = this.dataset.exercise;
                if (exercise === 'counting') {
                    goToExercise('counting.html');
                } else if (exercise === 'box-breathing') {
                    goToExercise('box-breathing.html');
                }
            }
        });
    });
    
    // Add floating animation to benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        // Stagger the animation start times
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in');
    });
    
    // Add breathing animation to the logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'breathingPulse 2s ease-in-out 3';
            }, 10);
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') {
            goToExercise('counting.html');
        } else if (e.key === '2') {
            goToExercise('box-breathing.html');
        }
    });
    
    // Add smooth scroll for better UX
    const benefitsSection = document.querySelector('.benefits-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    if (benefitsSection) {
        benefitsSection.style.opacity = '0';
        benefitsSection.style.transform = 'translateY(20px)';
        benefitsSection.style.transition = 'all 0.6s ease';
        observer.observe(benefitsSection);
    }
    
    // Add welcome message with random motivational quote
    const motivationalQuotes = [
        "Every breath is a new beginning 🌱",
        "Inhale courage, exhale fear 💪",
        "Your breath is your anchor to the present moment ⚓",
        "Breathe in peace, breathe out stress 🕊️",
        "The power of now lives in your breath ✨"
    ];
    
    console.log(`Welcome to BreathZen! 🧘‍♀️ ${motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}`);
});

// Add visual feedback for button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('card-button')) {
        // Create ripple effect
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add custom CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .card-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
