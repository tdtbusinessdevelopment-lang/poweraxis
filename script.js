/**
 * PowerAxis Global JavaScript
 * Handles dynamic interactions and carousels
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initVenturesControls();
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

function initVenturesControls() {
    const venturesContainer = document.getElementById('ventures-cards-container');
    const leftArrow = document.querySelector('.ventures-arrow-left');
    const rightArrow = document.querySelector('.ventures-arrow-right');

    if (!venturesContainer || !leftArrow || !rightArrow) return;

    const updateArrowState = () => {
        const maxScroll = venturesContainer.scrollWidth - venturesContainer.clientWidth;
        leftArrow.disabled = venturesContainer.scrollLeft <= 0;
        rightArrow.disabled = venturesContainer.scrollLeft >= maxScroll - 1;
    };

    const getStep = () => {
        const firstCard = venturesContainer.querySelector('.venture-card');
        return firstCard ? firstCard.offsetWidth + 24 : venturesContainer.clientWidth * 0.8;
    };

    leftArrow.addEventListener('click', () => {
        venturesContainer.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        venturesContainer.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    venturesContainer.addEventListener('scroll', updateArrowState);
    window.addEventListener('resize', updateArrowState);

    updateArrowState();
}
