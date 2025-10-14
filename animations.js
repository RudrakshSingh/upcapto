// Custom animations for static HTML
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[style*="opacity:0"]');
        
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Remove opacity and transform styles
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) translateX(0) scale(1) translateZ(0)';
                
                // Add animation delay for staggered effect
                element.style.transition = 'all 0.8s ease-out';
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }

    // Animate countdown timer
    function animateCountdown() {
        const countdownElement = document.querySelector('[style*="opacity:0;transform:scale(0.8)"]');
        if (countdownElement) {
            countdownElement.style.opacity = '1';
            countdownElement.style.transform = 'scale(1) translateZ(0)';
            countdownElement.style.transition = 'all 1s ease-out';
        }
    }

    // Animate recent joiners popup
    function animateRecentJoiners() {
        const popup = document.querySelector('.fixed.bottom-4.left-4');
        if (popup) {
            popup.style.opacity = '1';
            popup.style.transform = 'translateX(0) translateZ(0)';
            popup.style.transition = 'all 0.5s ease-out';
        }
    }

    // Animate form elements
    function animateForm() {
        const form = document.querySelector('#signup-form');
        if (form) {
            form.style.opacity = '1';
            form.style.transform = 'translateY(0) translateZ(0)';
            form.style.transition = 'all 0.8s ease-out';
        }
    }

    // Animate footer
    function animateFooter() {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0) translateZ(0)';
            footer.style.transition = 'all 0.8s ease-out';
        }
    }

    // Initial animations
    setTimeout(() => {
        animateCountdown();
        animateRecentJoiners();
        animateForm();
    }, 500);

    // Scroll animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate footer when it comes into view
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFooter();
            }
        });
    });
    
    const footer = document.querySelector('footer');
    if (footer) {
        footerObserver.observe(footer);
    }

    // Animate all elements on page load
    setTimeout(() => {
        animateOnScroll();
    }, 1000);
});
