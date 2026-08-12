document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('backBtn');

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault(); // на случай, если вдруг будет ссылка

      // Вариант 1: стандартный «Назад» браузера
      window.history.back();

      /*
      // Вариант 2 (раскомментировать, если нужна другая логика):
      const container = document.querySelector('.dynamic-block');
      if (container) {
        container.style.display = 'none';
        // и т.д.
      }
      */
    });
  }
});


// const backBtn = document.getElementById('backBtn');

// if (backBtn) {
//   backBtn.addEventListener('click', () => {
//     window.history.back(); // стандартный «Назад» браузера
//   });
// }