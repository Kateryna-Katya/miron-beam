document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ AOS ---
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 1000,
          once: true,
          offset: 100
      });
  }

  // --- 2. ЭФФЕКТ СКРОЛЛА ХЕДЕРА ---
  const header = document.querySelector('.header');
  if (header) {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
              header.style.padding = '12px 0';
              header.style.background = 'rgba(10, 15, 30, 0.95)';
          } else {
              header.style.padding = '20px 0';
              header.style.background = 'rgba(10, 15, 30, 0.8)';
          }
      });
  }

  // --- 3. МОБИЛЬНОЕ МЕНЮ (ЛОГИКА) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (burger && mobileMenu) {
      const toggleMenu = () => {
          burger.classList.toggle('burger--active');
          mobileMenu.classList.toggle('mobile-menu--active');
          document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
      };

      burger.addEventListener('click', toggleMenu);

      mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (mobileMenu.classList.contains('mobile-menu--active')) toggleMenu();
          });
      });
  }

  // --- 4. SPOTLIGHT ЭФФЕКТ ДЛЯ КАРТОЧЕК ---
  const cards = document.querySelectorAll('.feature-card');
  if (cards.length > 0) {
      cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          });
      });
  }

  // --- 5. LOTTIE АНИМАЦИЯ ---
  const lottieContainer = document.getElementById('lottie-ai-process');
  if (lottieContainer && typeof lottie !== 'undefined') {
      lottie.loadAnimation({
          container: lottieContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets9.lottiefiles.com/packages/lf20_m9zragkd.json'
      });
  }

  // --- 6. ЛОГИКА ФОРМЫ (КАПЧА И ВАЛИДАЦИЯ) ---
  const form = document.getElementById('ai-contact-form');
  if (form) {
      const phoneInput = document.getElementById('phone');
      const phoneError = document.getElementById('phone-error');
      const captchaQuestion = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha');
      const successMsg = document.getElementById('form-success');
      let captchaResult;

      const generateCaptcha = () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          captchaResult = a + b;
          if (captchaQuestion) captchaQuestion.innerText = `${a} + ${b}`;
      };

      generateCaptcha();

      if (phoneInput) {
          phoneInput.addEventListener('input', (e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
              if (phoneError) {
                  phoneError.style.display = /[^0-9]/.test(e.target.value) ? 'block' : 'none';
              }
          });
      }

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(captchaInput.value) !== captchaResult) {
              alert('Неверный ответ капчи. Попробуйте снова.');
              generateCaptcha();
              captchaInput.value = '';
              return;
          }

          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.innerText = 'Отправка...';
          submitBtn.disabled = true;

          setTimeout(() => {
              if (successMsg) successMsg.style.display = 'flex';
          }, 1500);
      });
  }

  // --- 7. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieAccept = document.getElementById('cookie-accept');

  if (cookiePopup && cookieAccept) {
      if (!localStorage.getItem('cookieAccepted')) {
          setTimeout(() => {
              cookiePopup.classList.add('cookie-popup--active');
          }, 2000);
      }

      cookieAccept.addEventListener('click', () => {
          localStorage.setItem('cookieAccepted', 'true');
          cookiePopup.classList.remove('cookie-popup--active');
      });
  }
});

// --- 8. VANTA.JS (ИНИЦИАЛИЗАЦИЯ ПОСЛЕ ЗАГРУЗКИ ВСЕХ РЕСУРСОВ) ---
window.addEventListener('load', () => {
  const vantaElement = document.getElementById('vanta-canvas');
  if (vantaElement && typeof VANTA !== 'undefined') {
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
  }
});