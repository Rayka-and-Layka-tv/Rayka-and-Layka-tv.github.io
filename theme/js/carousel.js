document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Кнопка «К подборке передач» ---
  const scrollBtn = document.querySelector('.btn-premium-scroll');
  const section = document.getElementById('tv-carousel-section');

  if (scrollBtn && section) {
    scrollBtn.addEventListener('click', () => {
      const rect = section.getBoundingClientRect();
      const offsetY = window.scrollY + rect.top - 300; // буфер 300px

      window.scrollTo({
        top: offsetY,
        behavior: 'smooth'
      });
    });
  }

  // --- 2. Логика карусели (без ошибки slide is not defined) ---
  const carousel = document.getElementById('tvCarousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.getElementById('carouselDots');

  let currentPage = 0;
  let slidesPerPage = 4;

  function updateSlidesPerPage() {
    const containerWidth = carousel.clientWidth;
    if (slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth;

    if (slideWidth === 0) {
      slidesPerPage = 4;
      return;
    }
    slidesPerPage = Math.max(1, Math.floor(containerWidth / slideWidth));
  }

  function getTotalPages() {
    return Math.ceil(slides.length / slidesPerPage);
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalPages = getTotalPages();

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === currentPage) dot.classList.add('active');
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateUI() {
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage);
    });

    const totalPages = getTotalPages();
    if (prevBtn) prevBtn.disabled = currentPage <= 0;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
  }

  function goToPage(page) {
    const totalPages = getTotalPages();
    currentPage = Math.max(0, Math.min(totalPages - 1, page));
    updateUI();

    const startIndex = currentPage * slidesPerPage;
    const activeSlide = slides[startIndex];
    if (activeSlide) {
      activeSlide.scrollIntoView({
        behavior: 'auto', // без авто-анимации при навигации кнопками
        block: 'nearest',
        inline: 'start'
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  }

  window.addEventListener('resize', () => {
    updateSlidesPerPage();
    buildDots();
    // Не делаем автоскролл при ресайзе — только обновляем UI
  });

  updateSlidesPerPage();
  buildDots();
  updateUI(); // без автоскролла при загрузке
});




document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.carousel-card');
  
  cards.forEach(card => {
    const imageWrapper = card.querySelector('.carousel-top-image-wrapper');
    
    if (!imageWrapper) {
      // Если картинки нет, добавляем класс для центрирования
      card.classList.add('no-top-image');
    }
  });
});
