// Подгрузка сторонних библиотек
import '../externals/jquery.validate';

// Подгрузка модуля отрисовки карты
import './map';

// Получение доступа к функциям другого модуля
import {onSubmitForm, getMessageOnUserLang} from './forms';

// Установка правил валидации формы
$('#contact-form').validate({
  rules: {
    user_name: {
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      required: true,
      email: true,
      minlength: 7,
      maxlength: 25
    },
    phone: {
      phone: true
    },
    message: {
      required: true,
      minlength: 10,
      maxlength: 255
    }
  },
  messages: {
    user_name: {
      required: getMessageOnUserLang().requiredErr,
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    },
    email: {
      required: getMessageOnUserLang().requiredErr,
      email: getMessageOnUserLang().emailErr,
      minlength: jQuery.validator.format(getMessageOnUserLang().minlengthErr),
      maxlength: jQuery.validator.format(getMessageOnUserLang().maxlengthErr)
    },
    message: {
      required: getMessageOnUserLang().requiredErr,
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
    $('#mail-OK').slideDown();
    $('#contact-form').trigger('reset');
    setTimeout(function() {
      $('#mail-OK').slideUp();
    }, 3000);
  }
});

// Установка custom-правил для поля мобильного телефона
$.validator.addMethod('phone', function(value) {
  if (!value || ((/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value))) ) {
    return true;
  } else {
    return false;
  }
}, getMessageOnUserLang().phoneErr);

// Навешивание обработчиков событий
$('#message-confirm').on('click', {element: '#contact-form'}, onSubmitForm);
