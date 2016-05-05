/**
 * Номер текущего слайда
 * @type  {Number}
 */
let slideNum = 0;

/**
 * Таймер для слайдера
 * @type  {Number}
 */
let slideTimer = 0;

/**
 * Вставка в DOM-дерево элементов для управления слайдером
 */
(function _addSliderControlsToDom() {
  let spanDot = '';

  // Формирование по одной "точке" для каждого слайда. Каждой точке
  // присваивается свой уникальный числовой идентификатор
  $('.slide').each(function(index) {
    spanDot += '<li>' + '<div class="dot">' + '</div>' + '<span>' + index + '</span>' + '</li>';
  });

  // Вставка в DOM иконок "Следующий слайд" и "Предыдущий слайд", а также
  // индикаторов количества слайдов
  $('<ul class="dots-list">' + spanDot + '</ul>').appendTo('.slider');
  $('<a href="#" class="slideNav prev">' + '</a>').appendTo('.slider');
  $('<a href="#" class="slideNav next">' + '</a>').appendTo('.slider');

  // Установка в качестве слайда по умолчанию первого слайда
  $('.dot:first').addClass('dotActive');
  _onSlideToNextSlide(0);
})();

/**
 * Переход к другому слайду
 * @param  {Number}  nextSlide  Номер другого слайда
 */
function _onSlideToNextSlide(slide) {
  clearTimeout(slideTimer);

  // Скрытие текущего слайда
  $('.slide').eq(slideNum).fadeOut(200);
  $('.slideActive').removeClass('slideActive');
  $('.dot').removeClass('dotActive');

  // Отображение следующего слайда
  _setNextSlide(slide);
  $('.slide').eq(slideNum).fadeIn(600).addClass('slideActive');
  $('.dot').eq(slideNum).addClass('dotActive');

  // Слайды автоматически пролистываются вперед (Следующий слайд)
  // через каждые 4 секунды
  slideTimer = setTimeout(function() {
    _onSlideToNextSlide('next');
  }, 4000);
}

/**
 * Определение номера слайда, который будет показан следующим
 * @param  {String}  slide  Идентификатор следующего слайда
 */
function _setNextSlide(slide) {
  let slideCount = $('.slide').length;

  switch(slide) {
    case 'next':
      slideNum = (slideNum === (slideCount - 1)) ? 0 : (slideNum + 1);
      break;
    case 'prev':
      slideNum = (slideNum === 0) ? (slideCount - 1) : (slideNum - 1);
      break;
    default:
      slideNum = slide;
  }
}

/**
 * Обработчик события нажатия на кнопку "Следующий слайд"
 */
function _onSlideToNext() {
  _onSlideToNextSlide('next');
}

/**
 * Обработчик события нажатия на кнопку "Предыдущий слайд"
 */
function _onSlideToPrev() {
  _onSlideToNextSlide('prev');
}

/**
 * Обработчик события нажатия на идентификатор конкретного слайда
 */
function _onSlideToSelected() {
  if ( !($(this).is('.dotActive')) ) {
    _onSlideToNextSlide( parseFloat( $(this).siblings().text() ) );
  }
}

// Навешивание обработчиков событий
$('.next').on('click', _onSlideToNext);
$('.prev').on('click', _onSlideToPrev);
$('.dot').on('click', _onSlideToSelected);
