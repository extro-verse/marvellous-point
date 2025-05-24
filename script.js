document.addEventListener('DOMContentLoaded', () => {
    // Profile Dropdown
    const profileButton = document.getElementById('profileButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    profileButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const carouselItems = document.querySelectorAll('.carousel-item');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        carouselItems.forEach(item => {
            const title = item.querySelector('p').textContent.toLowerCase();
            item.style.display = title.includes(query) ? 'block' : 'none';
        });
    });

    // Carousel Functionality
    const carousels = [
        { id: 'phase5Carousel', prev: 'phase5Prev', next: 'phase5Next' },
        { id: 'phase4Carousel', prev: 'phase4Prev', next: 'phase4Next' },
        { id: 'phase3Carousel', prev: 'phase3Prev', next: 'phase3Next' },
        { id: 'newSeriesCarousel', prev: 'newSeriesPrev', next: 'newSeriesNext' },
        { id: 'favoritesCarousel', prev: 'favoritesPrev', next: 'favoritesNext' },
        { id: 'recommendedCarousel', prev: 'recommendedPrev', next: 'recommendedNext' }
    ];

    carousels.forEach(carousel => {
        const element = document.getElementById(carousel.id);
        const prevButton = document.getElementById(carousel.prev);
        const nextButton = document.getElementById(carousel.next);
        let scrollAmount = 0;
        const scrollStep = 300;

        nextButton.addEventListener('click', () => {
            scrollAmount += scrollStep;
            element.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            scrollAmount = Math.max(0, scrollAmount - scrollStep);
            element.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });

        // Auto-scroll
        let autoScroll = setInterval(() => {
            scrollAmount += scrollStep;
            if (scrollAmount >= element.scrollWidth - element.clientWidth) {
                scrollAmount = 0;
            }
            element.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 5000);

        element.addEventListener('mouseenter', () => clearInterval(autoScroll));
        element.addEventListener('mouseleave', () => {
            autoScroll = setInterval(() => {
                scrollAmount += scrollStep;
                if (scrollAmount >= element.scrollWidth - element.clientWidth) {
                    scrollAmount = 0;
                }
                element.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            }, 5000);
        });
    });

    // Navigation Active State
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            window.location.href = item.href;
        });
    });

    // Lazy Loading Observer
    const images = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));

    // Back Button
    window.goBack = () => {
        window.history.back();
    };
});