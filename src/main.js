document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(10, 15, 30, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(10, 15, 30, 0.8)';
        }
    });
});