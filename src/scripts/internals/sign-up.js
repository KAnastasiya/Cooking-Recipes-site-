// Подгрузка сторонних библиотек
import '../externals/jquery.validate';

// Подгрузка модуля, реализующего компонент select
import './select';

// Подгрузка модуля, реализующего загрузку файлов
import './upload';

// Получение доступа к функциям другого модуля
import {onChangePassState, onSubmitForm, getMessageOnUserLang} from './forms';

// Установка правил валидации формы
$('#sign-up-form').validate({
  rules: {
    login: {
      required: true,
      minlength: 6,
      maxlength: 16,
      login: true
    },
    pass: {
      required: true,
      minlength: 6,
      maxlength: 20,
      pass: true
    },
    nacked_pass: {
      required: true,
      minlength: 6,
      maxlength: 20,
      pass: true
    },
    age: {
      required: true,
      age: true
    },
    email: {
      required: true,
      email: true,
      minlength: 7,
      maxlength: 25
    },
    comment: {
      minlength: 5,
      maxlength: 255
    }
  },
  messages: {
    login: {
      required: getMessageOnUserLang().requiredErr,
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    },
    pass: {
      required: getMessageOnUserLang().requiredErr,
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    },
    nacked_pass: {
      required: getMessageOnUserLang().requiredErr,
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    },
    age: {
      required: getMessageOnUserLang().requiredErr
    },
    email: {
      required: getMessageOnUserLang().requiredErr,
      email: getMessageOnUserLang().emailErr,
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    },
    comment: {
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    }
  },
  errorPlacement: function(error, element) {
    let errorElement = element.siblings('.error_msg');
    errorElement.children().empty();
    error.appendTo(errorElement);
  },
  submitHandler: function() {
    $('#sign-up-OK').slideDown();
    $('#sign-up-form').trigger('reset');
    setTimeout(function() {
      $('#sign-up-OK').slideUp();
    }, 3000);
  }
});

// Установка custom-правил для поля возраста
$.validator.addMethod('age', function(value) {
  if((new RegExp('^[0-9]{2}$').test(value))) {
    return true;
  } else {
    return false;
  }
}, getMessageOnUserLang().ageErr);

// Установка custom-правил для поля логина
$.validator.addMethod('login', function(value) {
  if((new RegExp('^[0-9a-zA-Z\_]{3,}$', '').test(value))) {
    return true;
  } else {
    return false;
  }
}, getMessageOnUserLang().loginErr);

// Установка custom-правил для поля пароля
$.validator.addMethod('pass', function(value) {
  if((/^[a-zA-Z\d\-\!\.\/\$\\\,\?\:\&\*\;\@\%\(\)\+\=\№\#\_\[\]]{6,}$/.test(value))) {
    return true;
  } else {
    return false;
  }
}, getMessageOnUserLang().passErr);

/**
 * Обработчик события нажатия на кнопку отмены регистрации
 */
function _onSignCancel() {
  location.href = $(this).attr('data-url');
}

// Навешивание обработчиков событий
$('#show-pass').on('click', onChangePassState);
$('#sign-up-confirm').on('click', {element: '#sign-up-form'}, onSubmitForm);
$('#sign-up-cancel').on('click', _onSignCancel);
