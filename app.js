'use strict';

let webpack = require('webpack');
let webpackMiddleware = require('webpack-dev-middleware');

let express = require('express');
let multiparty = require('multiparty');

let webpackConfig = require('./webpack.config');
let fs = require('fs');
let app = express();
let LOGO_PATH = 'avatar.png';

app.use(express.static('build'));
app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: '/',
  hot: true,
  stats: {
    colors: true
  }
}));

app.post('/upload', function(req, res) {
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
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
