// Подгрузка библиотеки, реализующий custom-скролл
import './scroll';


/**
 * Перестроение структуры страницы при изменении размера окна браузера
 */
function _onResize() {
  $('#log-in-form, nav').removeClass('open');
  $('#show-log-in').removeClass('clicked');

  if ((window.matchMedia('(max-width: 600px)').matches)) {
    $('.page-header, .toast, .floating-toolbar, #log-in-form').addClass('collapse');
  } else {
    $('.page-header, .toast, .floating-toolbar, #log-in-form').removeClass('collapse');
  }

  if ((window.matchMedia('(max-width: 1024px)').matches)) {
    $('nav').addClass('list');
  } else {
    $('nav').removeClass('list');
  }
}

_onResize();

/**
 * Управление отображением формы авторизации
 * @param  {Object}  event  Событие
 */
function _onShowLoginForm(event) {
  event.stopPropagation();

  // Проверки для валидации формы загружаются только при
  // появлении формы на странице
  require.ensure([], function(require) {
    require('./log-in');
  }, 'auth');

  $('#log-in-form').toggleClass('open');
  $('#show-log-in').toggleClass('clicked');
}

/**
 * Успешная авторизация в системе
 */
(function() {
  if (localStorage.getItem('auth')) {
    $('#my-account').removeClass('hidden');
    $('.floating-toolbar').hide();
  }
})();

/**
 * Выход из системы
 * @return  {Boolean}
 */
function _onLogOut() {
  $('#my-account').addClass('hidden');
  $('.floating-toolbar').show();
  $('#show-log-in').removeClass('clicked');
  $(location).attr('href', 'index.html');
  window.localStorage.removeItem('auth');
  return false;
}

/**
 * При клике в любом месте экрана сворачиваются и скрываются все
 * открытые на тот момент элементы
 * @param   {Object}  event  Событие
 */
function _onCloseAll(event) {
  event.stopPropagation();

  if ($(event.target).closest('#log-in-form').length) {
    return;
  }

  $('nav.list, .select, #log-in-form').removeClass('open');
  $('.select ul').slideUp();
  $('#show-log-in').removeClass('clicked');
}

/**
 * Отрисовка/скрытие раскрывающегося меню
 * @param   {Object}  event  Событие
 */
function _onChangeDropdownMenuState(event) {
  event.stopPropagation();
  $('nav').toggleClass('open');
  $('.nav-icon').toggleClass('clicked');
}

// Навешивание обработчиков событий
$('#show-log-in a').on('click', _onShowLoginForm);
$('.nav-icon').on('click', _onChangeDropdownMenuState);
$('#exit').on('click', _onLogOut);
$(document).on('click', _onCloseAll);
$(window).on('resize', _onResize);
