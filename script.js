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


/** MAPS */

// function initMap() {
//     // Coordinates for TDT Powersteel
//     const lat = 14.6130649;
//     const lng = 120.9937252;

//     // Initialize the map
//     const map = L.map('map').setView([lat, lng], 17);

//     // Add OpenStreetMap tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);

//     // Add a marker
//     L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup("<b>TDT Powersteel Corporation</b><br>Sampaloc, Manila")
//         .openPopup();
// }

// document.addEventListener('DOMContentLoaded', () => {
//     initMap();
// });