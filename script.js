// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or use device preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Image carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.image-carousel');
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentCarousel = null;
    let currentImageIndex = 0;
    let allProjectImages = [];
    
    // Collect all carousel images
    document.querySelectorAll('.carousel-image').forEach(img => {
        img.addEventListener('click', function() {
            // Find the parent carousel
            currentCarousel = this.closest('.image-carousel');
            allProjectImages = currentCarousel.querySelectorAll('.carousel-image');
            
            // Find the index of the clicked image
            for (let i = 0; i < allProjectImages.length; i++) {
                if (allProjectImages[i] === this) {
                    currentImageIndex = i;
                    break;
                }
            }
            
            // Set the lightbox image
            openLightbox(this.src, this.alt);
        });
    });
    
    // Open lightbox with specific image
    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxCaption.textContent = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close lightbox when clicking outside of the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navigate to previous image
    lightboxPrev.addEventListener('click', function() {
        if (!currentCarousel) return;
        
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = allProjectImages.length - 1;
        }
        
        const prevImg = allProjectImages[currentImageIndex];
        lightboxImg.src = prevImg.src;
        lightboxCaption.textContent = prevImg.alt;
    });
    
    // Navigate to next image
    lightboxNext.addEventListener('click', function() {
        if (!currentCarousel) return;
        
        currentImageIndex++;
        if (currentImageIndex >= allProjectImages.length) {
            currentImageIndex = 0;
        }
        
        const nextImg = allProjectImages[currentImageIndex];
        lightboxImg.src = nextImg.src;
        lightboxCaption.textContent = nextImg.alt;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        }
    });
    
    // Carousel functionality (existing code)
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentIndex = 0;
        
        // Function to show a specific image
        function showImage(index) {
            // Remove active class from all images and dots
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current image and dot
            images[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = images.length - 1;
            showImage(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= images.length) newIndex = 0;
            showImage(newIndex);
        });
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
            });
        });
        
        // Auto-advance the carousel
        let interval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= images.length) newIndex = 0;
            showImage(newIndex);
        }, 5000);
        
        // Pause auto-advance when interacting with carousel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= images.length) newIndex = 0;
                showImage(newIndex);
            }, 5000);
        });
    });
}); 