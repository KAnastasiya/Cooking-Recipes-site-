$(document).ready(function() {
    $('#fileupload').fileupload({
    	url: '/upload',
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|svg)$/i,
        previewMaxWidth: 160,
        previewMaxHeight: 160,
        previewCrop: true,
        previewCanvas: false
        }).on('fileuploadprocessalways', function (e, data) {
        	var file = data.files[0];
	        if (file.preview) { $('#files').empty().prepend(file.preview); }
	        if (file.error) { $('#files').siblings('.error_msg').append(file.error); }
    });
});

