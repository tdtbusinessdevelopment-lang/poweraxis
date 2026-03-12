/**
 * PowerAxis Global JavaScript
 * Handles dynamic interactions and carousels
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
});

function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const heroSection = document.getElementById('hero-carousel');
    
    if(!slides.length) return;

    let currentIndex = 0;
    let autoplayInterval;

    function goToSlide(index) {
        // Remove active class
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to target
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            currentIndex = index;
            goToSlide(currentIndex);
            startAutoplay();
        });
    });

    // Handle hover to pause
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize
    goToSlide(0);
    startAutoplay();
}
