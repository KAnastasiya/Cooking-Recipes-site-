// Подгрузка сторонних библиотек
import '../externals/upload/jquery.ui.widget';
import '../externals/upload/jquery.fileupload';
import '../externals/upload/jquery.fileupload-process';
import '../externals/upload/jquery.fileupload-image';
import '../externals/upload/jquery.fileupload-validate';

/**
 * Обработчик события нажатия на кнопку загрузки файла
 * @param  {Object}  event  Событие
 * @param  {[type]}  data   Информация о файле
 */
function _onUploadFile(event, data) {
  var file = data.files[0];
  if (file.preview) {
    $('#files').empty().prepend(file.preview);
  } else if (file.error) {
    $('#files').siblings('.error_msg').append(file.error);
  }
}

// Навешивание обработчика события загрузки файла
$('#fileupload').fileupload({
  url: '/upload',
  dataType: 'json',
  autoUpload: true,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|svg)$/i,
  previewMaxWidth: 160,
  previewMaxHeight: 160,
  previewCrop: true,
  previewCanvas: false
}).on('fileuploadprocessalways', _onUploadFile);
