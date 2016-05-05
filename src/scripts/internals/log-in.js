// Получение доступа к функциям другого модуля
import {onChangePassState, onSubmitForm, getMessageOnUserLang} from './forms';

// Установка правил валидации формы
$('#log-in-form').validate({
  rules: {
    login: {
      required: true,
      minlength: 6,
      maxlength: 16
    },
    pass: {
      required: true,
      minlength: 6,
      maxlength: 20
    },
    nacked_pass: {
      required: true,
      minlength: 6,
      maxlength: 20
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
    }
  },
  errorPlacement: function(error, element) {
    let errorElement = element.siblings('.error_msg');
    errorElement.children().empty();
    error.appendTo(errorElement);
  },
  submitHandler: function() {
    localStorage.setItem('auth', 'true');
    $('#my-account').removeClass('hidden');
    $('#log-in-form').fadeOut(200);
    $('.floating-toolbar').hide();
    $('.news').addClass('auth');
  }
});

// Навешивание обработчиков событий
$('#show-pass').on('click', onChangePassState);
$('#log-in').on('click', {element: '#log-in-form'}, onSubmitForm);
