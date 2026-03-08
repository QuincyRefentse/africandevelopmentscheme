/**
 * ADS FINTECH - Coming Soon Page
 * Countdown Timer & Interactive Elements
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ADS Fintech - Coming Soon Page Loaded');
    
    // Set launch date (14 days from now)
    setLaunchDate();
    
    // Initialize countdown
    initCountdown();
    
    // Add smooth scroll
    initSmoothScroll();
    
    // Add hover effects for contact cards
    initContactCards();
});

/**
 * Set Launch Date - 14 days from current date
 * This can be adjusted based on actual launch schedule
 */
function setLaunchDate() {
    // Get current date
    const now = new Date();
    
    // Set launch to 14 days from now (adjust as needed)
    const launchDate = new Date(now);
    launchDate.setDate(now.getDate() + 14);
    
    // Store in global variable
    window.launchDate = launchDate;
    
    console.log(`📅 Launch Date: ${launchDate.toLocaleDateString()}`);
}

/**
 * Initialize Countdown Timer
 */
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Remove loading state
    if (countdownElement) {
        countdownElement.classList.remove('loading');
    }
    
    // Update countdown every second
    function updateCountdown() {
        const now = new Date().getTime();
        const launch = window.launchDate.getTime();
        const distance = launch - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update DOM with leading zeros
        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            // Show launch message
            const messageBox = document.querySelector('.message-box');
            if (messageBox) {
                messageBox.innerHTML = '<p class="message">🎉 We are now live! Check back for the new platform.</p>';
            }
        }
    }
    
    // Initial call
    updateCountdown();
    
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Contact Cards Hover Effects
 */
function initContactCards() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Optional: Add sound or analytics tracking
            console.log('Contact card hovered:', this.querySelector('.contact-link')?.textContent);
        });
    });
}

/**
 * Copy to clipboard functionality (optional enhancement)
 */
function setupCopyButtons() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only for email links, not phone
            if (this.href && this.href.startsWith('mailto:')) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                
                // Copy to clipboard
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary tooltip
                    const tooltip = document.createElement('span');
                    tooltip.textContent = 'Email copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--accent-gold);
                        color: var(--primary-dark);
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        top: -20px;
                        left: 50%;
                        transform: translateX(-50%);
                        white-space: nowrap;
                    `;
                    
                    this.style.position = 'relative';
                    this.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            }
        });
    });
}

/**
 * Add dynamic background effect
 */
function initBackgroundEffect() {
    const body = document.body;
    
    body.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Subtle parallax effect on gradient
        body.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
    });
}

/**
 * Handle form submissions if any
 */
function handleFormSubmissions() {
    // Placeholder for future newsletter signup
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission - coming soon!');
        });
    });
}

/**
 * Performance monitoring
 */
function logPerformance() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 Page load time: ${pageLoadTime}ms`);
}

/**
 * Initialize all features
 */
function initAll() {
    logPerformance();
    
    // Optional features (uncomment if needed)
    // setupCopyButtons();
    // initBackgroundEffect();
    // handleFormSubmissions();
}

// Call initialization
initAll();

// Handle visibility change (pause timer when tab not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('⏸️ Countdown paused - tab inactive');
    } else {
        console.log('▶️ Countdown resumed - tab active');
    }
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initCountdown, setLaunchDate };
}