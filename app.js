
var express = require('express');
var multiparty = require('multiparty');
var fs = require('fs');
var app = express();
var LOGO_PATH = 'avatar.png';

app.use(express.static('CoockingRecipes'));

app.post('/upload', function(req, res) {
    // parse a file upload 
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
    	var fileName = Object.keys(files)[0];
    	var file = files[fileName][0];
    	fs.createReadStream(file.path).pipe(fs.createWriteStream(LOGO_PATH));
      	res.send('Ok');
    });
});

app.get('/avatar', function(req, res) {
	fs.readFile(LOGO_PATH, function(e, data) { 
		res.send(data);
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});