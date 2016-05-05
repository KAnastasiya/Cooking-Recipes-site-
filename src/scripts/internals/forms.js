// Подгрузка сторонних библиотек
import '../externals/jquery.validate';

// Экспорт функций данного модуля для их использования в других модулях
export {onChangePassState, onSubmitForm, getMessageOnUserLang};

/**
 * Показ пароля в явном или замаскированном виде
 */
function onChangePassState() {
  if ($(this).is(':checked')) {
    $('#nacked_pass').val($('#pass').val()).removeClass('hidden');
    $('#pass').addClass('hidden');
  } else {
    $('#pass').val($('#nacked_pass').val()).removeClass('hidden');
    $('#nacked_pass').addClass('hidden');
  }
}

/**
 * Обработчик события отправки формы
 * @param  {Object}  event  Событие
 */
function onSubmitForm(event) {
  $(event.element).validate();
}

/**
 * Устанавливает тексты всех сообщений об ошибках, возникающих при заполнении форм сайта,
 * на языке пользователя
 * @return  {Object}  Тексты сообщений об ошибках на языке пользователя
 */
function getMessageOnUserLang() {
  let lang = $('html').attr('lang'),
    requiredErr,
    minlengthErr,
    maxlengthErr,
    emailErr,
    loginErr,
    passErr,
    ageErr,
    phoneErr;

  if (lang === 'uk') {
    requiredErr = 'Обов\'язкове';
    minlengthErr = 'Мінімальна довжина - {0}';
    maxlengthErr = 'Максимальна довжина - {0}';
    emailErr = 'Невірний формат Email';
    loginErr = 'Дозволено числа 0-9, латиницю та символ _';
    passErr = 'Дозволено числа 0-9 та латиницю';
    ageErr = 'Має бути двозначним числом';
    phoneErr = 'Невірний формат мобільного';
  } else {
    requiredErr = 'Required';
    minlengthErr = 'Minimal lenght - {0}';
    maxlengthErr = 'Maximum lenght - {0}';
    emailErr = 'Wrong Email format';
    loginErr = 'Must contain 0-9, latin and symbol _';
    passErr = 'Must contain 0-9 and latin';
    ageErr = 'Must be two-digit number';
    phoneErr = 'Wrong Mobile phone format';
  }

  return {
    requiredErr: requiredErr,
    minlengthErr: minlengthErr,
    maxlengthErr: maxlengthErr,
    emailErr: emailErr,
    loginErr: loginErr,
    passErr: passErr,
    ageErr: ageErr,
    phoneErr: phoneErr
  };
}

/**
 * Обработчик события изменения значения полей формы
 * @param  {Object}  event  Событие
 */
function _onValidateForm(event) {
  $('form').validate().element($(event.target));
}

// Навешивание обработчиков событий
$('input:not([type="checkbox"]):not([type="radio"]), textarea').on('change', _onValidateForm);
