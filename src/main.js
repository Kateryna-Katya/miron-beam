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
// Initialize Vanta.js Net effect
window.addEventListener('load', () => {
  VANTA.NET({
      el: "#vanta-canvas",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x00ffd1,
      backgroundColor: 0x0a0f1e,
      points: 12.00,
      maxDistance: 24.00,
      spacing: 16.00
  });
});
// Lottie Animation
lottie.loadAnimation({
  container: document.getElementById('lottie-ai-process'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets9.lottiefiles.com/packages/lf20_m9zragkd.json' // Технологичная AI анимация
});
// Feature cards Spotlight effect
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
// --- FORM LOGIC ---
const form = document.getElementById('ai-contact-form');
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');
const captchaQuestion = document.getElementById('captcha-question');
const captchaInput = document.getElementById('captcha');
const successMsg = document.getElementById('form-success');

// 1. Generate Math Captcha
let captchaResult;
function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    captchaQuestion.innerText = `${a} + ${b}`;
}
generateCaptcha();

// 2. Phone validation (numbers only)
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (/[^0-9]/.test(e.target.value)) {
        phoneError.style.display = 'block';
    } else {
        phoneError.style.display = 'none';
    }
});

// 3. Form Submission Handling
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check Captcha
    if (parseInt(captchaInput.value) !== captchaResult) {
        alert('Неверный ответ капчи. Попробуйте снова.');
        generateCaptcha();
        captchaInput.value = '';
        return;
    }

    // Simulate AJAX Request
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    setTimeout(() => {
        successMsg.style.display = 'flex';
        // Здесь можно добавить реальный fetch()
    }, 1500);
});
// --- MOBILE MENU LOGIC ---
const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function toggleMenu() {
    burger.classList.toggle('burger--active');
    mobileMenu.classList.toggle('mobile-menu--active');
    document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(mobileMenu.classList.contains('mobile-menu--active')) toggleMenu();
    });
});

// --- COOKIE POPUP LOGIC ---
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

window.addEventListener('load', () => {
    if (!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('cookie-popup--active');
        }, 2000);
    }
});

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookiePopup.classList.remove('cookie-popup--active');
});