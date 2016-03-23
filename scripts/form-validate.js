$(document).ready(function() {
    var requiredErr, minlengthErr, maxlengthErr, emailErr, loginErr, passErr, ageErr, phoneErr,
        lang = $('html').attr('lang');
        msg = (function(lang) {
            if (lang == 'uk') {
                requiredErr  = "Обов'язкове";
                minlengthErr = 'Мінімальна довжина - {0}';
                maxlengthErr = 'Максимальна довжина - {0}';
                emailErr     = 'Невірний формат Email';
                loginErr     = 'Дозволено числа 0-9, латиницю та символ _';
                passErr      = 'Дозволено числа 0-9 та латиницю';
                ageErr       = 'Має бути двозначним числом';
                phoneErr     = 'Невірний формат мобільного';
            }
            else {
                requiredErr  = 'Required';
                minlengthErr = 'Minimal lenght - {0}';
                maxlengthErr = 'Maximum lenght - {0}';
                emailErr     = 'Wrong Email format';
                loginErr     = 'Must contain 0-9, latin and symbol _';
                passErr      = 'Must contain 0-9 and latin';
                ageErr       = 'Must be two-digit number';
                phoneErr     = 'Wrong Mobile phone format';
            }
        })(lang);
    //--------------------------------------------------------------------------------------
    $.validator.addMethod('login', function(value, element, param) {
        if((new RegExp("^[0-9a-zA-Z\_]{3,}$", "").test(value))) { return true; }
        return false;
    }, loginErr);
    $('input[name="login"]').addClass('login');
    
    $.validator.addMethod("pass", function(value, element) {
        if((/^[a-zA-Z\d\-\!\.\/\$\\\,\?\:\&\*\;\@\%\(\)\+\=\№\#\_\[\]]{6,}$/.test(value))) { return true; }
        return false;
    }, passErr);
    $('input[name="pass"]').addClass('pass');
    
    $.validator.addMethod("age", function(value, element) {
        if((new RegExp("^[0-9]{2}$").test(value))) { return true; }
        return false;
    }, ageErr);
    $('input[name="age"]').addClass('age');
    
    $.validator.addMethod("phone", function(value, element) {
        if (!value || ((/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value))) ) { return true; }
        return false;
    }, phoneErr);
    $('input[name="phone"]').addClass('phone');
    //--------------------------------------------------------------------------------------
    $('#log-in-form').validate({
        rules: {
            login: {
                required:  true,
                minlength: 6,
                maxlength: 16,
                login:     true
            },
            pass: {
                required:  true,
                minlength: 6,
                maxlength: 20,
                pass:      true
            },
            nacked_pass: {
                required:  true,
                minlength: 6,
                maxlength: 20,
                pass:      true
            }
        },
        messages: {
            login: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            pass: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            nacked_pass: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            }
        },
        errorPlacement: function(error, element) { 
            element.siblings('.error_msg *').empty();
            error.appendTo(element.siblings('.error_msg')); 
        }, 
        submitHandler: function() {
            localStorage.setItem('auth', 'true');
            $('#my-account').removeClass('hidden');
            $('#log-in-form').fadeOut(200);
            $('.floating-toolbar').hide();
            $('.news').addClass('auth');
        }
    });
    //--------------------------------------------------------------------------------------
    $('#sign-up-form').validate({
        rules: {
            login: {
                required:  true,
                minlength: 6,
                maxlength: 16,
                login:     true
            },
            pass: {
                required:  true,
                minlength: 6,
                maxlength: 20,
                pass:      true
            },
            nacked_pass: {
                required:  true,
                minlength: 6,
                maxlength: 20,
                pass:      true
            },
            age: {
                required:  true,
                age:       true
            },
            email: {
                required:  true,
                email:     true,
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
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            pass: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            nacked_pass: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            age: {
                required:  requiredErr
            },
            email: {
                required:  requiredErr,
                email:     emailErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            comment: {
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            }
        },
        errorPlacement: function(error, element) { 
            element.siblings('.error_msg *').empty();
            error.appendTo(element.siblings('.error_msg')); 
        }, 
        submitHandler: function() {
            $('#sign-up-OK').slideDown();
            $("#sign-up-form").trigger('reset');
            setTimeout(function() { $('#sign-up-OK').slideUp(); }, 3000);
        }
    });
    //--------------------------------------------------------------------------------------
    $('#contact-form').validate({
        rules: {
            user_name: {
                required:  true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                required:  true,
                email:     true,
                minlength: 7,
                maxlength: 25
            },
            phone: {
                phone:    true
            },
            message: {
                required:  true,
                minlength: 10,
                maxlength: 255
            }
        },
        messages: {
            user_name: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            email: {
                required:  requiredErr,
                email:     emailErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            },
            message: {
                required:  requiredErr,
                minlength: jQuery.validator.format(minlengthErr),
                maxlength: jQuery.validator.format(maxlengthErr)
            }
        },
        errorPlacement: function(error, element) { 
            element.siblings('.error_msg *').empty();
            error.appendTo(element.siblings('.error_msg')); 
        }, 
        submitHandler: function() {
            $('#mail-OK').slideDown();
            $("#contact-form").trigger('reset');
            setTimeout(function() { $('#mail-OK').slideUp(); }, 3000);
        }
    });
    //--------------------------------------------------------------------------------------
    $('#log-in').click(function(event) { $('#log-in-form').validate(); });    
    $('#sign-up-confirm').click(function() { $('#sign-up-form').validate(); });
    $('#message-confirm').click(function() { $('#contact-form').validate(); });    
    $('input:not([type="checkbox"]):not([type="radio"]), textarea').change(function(e) { $('form').validate().element($(e.target));  }) 
    //--------------------------------------------------------------------------------------
    $('#show-pass').click(function() {
        var isChecked = $(this).is(":checked");
        if (isChecked) {
            var nackedPass = $('#pass').val();
            $('#nacked_pass').val(nackedPass).removeClass('hidden');    
            $('#pass').addClass('hidden');
        }
        else {
            var pass = $('#nacked_pass').val();
            $('#pass').val(pass).removeClass('hidden');
            $('#nacked_pass').addClass('hidden');  
        }
    });
    //--------------------------------------------------------------------------------------
    $('#sign-up-cancel').click(function() { location.href = $(this).attr('data-url'); });
});
