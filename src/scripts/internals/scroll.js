// Подгрузка сторонних библиотек
import '../externals/scroll/jquery.mousewheel.js';
import '../externals/scroll/jquery.mCustomScrollbar.css';
import '../externals/scroll/jquery.mCustomScrollbar.js';

// Навешивание custom-скролла для страниц
$('body').mCustomScrollbar({
  theme: 'minimal-dark',
  scrollInertia: 200,
  callbacks: {
    whileScrolling: function() {
      // При проскроливании страницы на определенную высоту вниз ее header схлопывается
      if ((window.matchMedia('(min-width: 601px)').matches)) {
        if (this.mcs.top < -100) {
          $('.page-header, .toast, .floating-toolbar, #log-in-form').addClass('collapse');
          $('#log-in-form, nav').removeClass('open');
          $('#show-log-in').removeClass('clicked');
        } else {
          $('.page-header, .toast, .floating-toolbar, #log-in-form').removeClass('collapse');
          $('nav').removeClass('open');
        }
      }

      // Кнопка "Вверх" отображается только при проскроливании страницы на определнное расстояние вниз
      if ((window.matchMedia('(min-width: 601px)').matches)) {
        if (this.mcs.top < -300) {
          $('.scroll-up').fadeIn();
        } else {
          $('.scroll-up').fadeOut();
        }
      } else {
        $('.scroll-up').hide();
      }
    }
  }
});

// Навешивание custom-скролла для различных компонентов страниц
$('.select ul, .recipe-details-content').mCustomScrollbar({
  theme: 'minimal-dark',
  scrollInertia: 300
});

// Обработчик нажатия на кнопку "Вверх"
function _onToTop() {
  $('body').mCustomScrollbar(
    'scrollTo',
    'top',
    { scrollInertia: 800 },
    { scrollEasing: 'easeOut' }
  );
  return false;
}

// Навешивание обработчиков событий
$('.scroll-up').on('click', _onToTop);
