/**
 * DOM-элемент, содержащий список доступных вариантов select
 * @type  {Element}
 */
let listContainer = $('.select .mCSB_container');

/**
 * Обработчик события нажатия на значение select (раскрытие
 * списка ли его свертывание)
 * @param  {Object}  event  Событие
 */
function _onChangeSelectState(event) {
  event.stopPropagation();
  $('.select').toggleClass('open');
  $('.select ul').slideToggle();
}

/**
 * Обработчик нажатия на варианты списка select. При этом
 * выбранный вариант устанавливается в качестве значения select
 * и скрывается из его списка,а ранее установленное значение select
 * добавляется в список
 */
function _onChangeSelectValue() {
  let currentValue = $('.select-value').val(),
    newValue = $(this).text();

  $('.select-value').val(newValue);
  $('.select ul').slideUp();
  $('.select').toggleClass('open');

  // Формирование нового списка доступных вариантов
  $(this).remove();
  listContainer.append('<li>' + currentValue + '</li>');

  // Отрисовка нового списка доступных вариантов
  _renderElementsList();
}

/**
 * Отрисовка списка доступных вариантов
 */
function _renderElementsList() {
  let sortedElementsList = _sortList(listContainer.children('li'));

  $.each(sortedElementsList, function(index, domElement) {
    listContainer.append(domElement);
  });
}

/**
 * Сортировка списка по алфавиту
 * @return  {Array}  Отсортированный о алфавиту список
 */
function _sortList(elements) {
  elements.sort(function(a, b) {
    let A = $(a).text().toUpperCase(),
      B = $(b).text().toUpperCase();
    return (A < B) ? -1 : (A > B) ? 1 : 0; // eslint-disable-line no-nested-ternary
  });
  return elements;
}

// Сортировка списка по умолчанию
_renderElementsList();

// Навешивание обработчиков событий
$('.select-value').on('click', _onChangeSelectState);
$('.select ul').on('click', 'li', _onChangeSelectValue);
