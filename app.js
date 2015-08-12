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
app.get('/posting', function(req, res) {
	render.jade(res, 'posting')
});
app.post('/posting', function(req, res) {
	control.add_post(req, res);
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
app.get('*', function(req, res) {
	router.parse(req, res);
});

var specific;
fs.readFile('blog/specification.json', function(err, resp) {
	if(err) {
		console.log(err);
	}
	else {
		specific = JSON.parse(resp);
		http.createServer(app).listen(specific.port);
	}
})