var http = require('http');
var express = require('express');
var router = require('./router');
var render = require('./render');
var parser = require('body-parser');
var fs = require('fs');

var control = require('./control');
var time = require('./time');

var app = express();
app.use(parser());

var re_num = new RegExp(/[0-9]/);

app.get('/', function(req, res) {
	res.redirect('/index');
});
app.get('/index', function(req, res) {
	render.list(res, 1, 0);
});
app.get('/index/:name', function(req, res) {
	var name = req.params.name;
	if(re_num.test(name)) {
		render.list(res, 1, name);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/post/:name', function(req, res) {
	var name = req.params.name;
	if(re_num.test(name)) {
		render.post(res, name);
	}
	else {
		res.redirect('/error');
	}
});
app.post('/post/:name', function(req, res) {
	var name = req.params.name;
	control.add_comment(req, res, name);
});
app.get('/rubric/:name', function(req, res) {
	var name = req.params.name;
	render.list(res, 2, 0, name);
});
app.get('/rubric/:name/:page', function(req, res) {
	var name = req.params.name;
	var page = req.params.page;
	if(re_num.test(page)) {
		render.list(res, 2, page, name);
	}
	else {
		res.redirect('/error');
	}
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
app.get('/panel_data', function(req, res) {
	render.panel(res);
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
app.get('/error', function(req, res) {
	render.jade(res, 'error')
});
app.get('*', function(req, res) {
	router.parse(req, res);
});

//Чтение спецификации
var specific;
fs.readFile('blog/specification.json', function(err, resp) {
	if(err) {
		console.log(err);
	}
	else {
		specific = JSON.parse(resp);
		http.createServer(app).listen(specific.port);
	}
});