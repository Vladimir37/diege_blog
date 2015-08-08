var http = require('http');
var express = require('express');
var router = require('./router');
var render = require('./render');
var parser = require('body-parser');
var fs = require('fs');
var control = require('./control');

var app = express();
app.use(parser());

app.get('/', function(req, res) {
	render.jade(res, 'index');
});
app.get('/admin', function(req, res) {
	render.jade(res, 'admin');
});
app.post('/res', function(req, res) {
	control.editing(req.body, res); 
});
app.get('/settings', function(req, res) {
	render.setting(res);
});
app.post('/edit_pic', function(req, res) {
	control.editingBack(req.body, res); 
});
app.post('/new_back', function(req, res) {
	control.createBack(req, res);
});
app.get('/background', function(req, res) {
	fs.readdir('blog/source/back-blog/', function(err, files) {
		render.jade(res, 'background', files);
	});
});
app.get('/image', function(req, res) {
	fs.readdir('blog/source/back-blog', function(err, resp) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(resp);
		}
	})
});
app.get('*', function(req, res) {
	router.parse(req, res);
});

http.createServer(app).listen(3000);