var http = require('http');
var express = require('express');
var parser = require('body-parser');
var fs = require('fs');
var cookie = require('cookie-parser');

var router = require('./router');
var render = require('./render');
var control = require('./control');
var time = require('./time');

var app = express();
app.use(parser());
app.use(cookie());

var re_num = new RegExp(/^[0-9]{1,}$/);
var re_year = new RegExp(/^[0-9]{4,4}$/);
var re_month = new RegExp(/^[0-9]{2,2}$/);

//test
app.get('/test_log', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		//
	}
	else {
		res.redirect('/error');
	}
});
// end test

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
	if(render.auth_control(req.cookies[auth_cookie])) {
		var name = req.params.name;
		if(re_num.test(name)) {
			render.post(res, name, 1);
		}
		else {
			res.redirect('/error');
		}
	}
	else {
		var name = req.params.name;
		if(re_num.test(name)) {
			render.post(res, name, 0);
		}
		else {
			res.redirect('/error');
		}
	}
});
app.get('/post_pool/:name', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		var name = req.params.name;
		if(re_num.test(name)) {
			render.pool_post(res, name);
		}
		else {
			res.redirect('/error');
		}
	}
	else {
		res.redirect('/error');
	}
});
app.post('/post/:name', function(req, res) {
	var name = req.params.name;
	if(req.body.type) {
		if(render.auth_control(req.cookies[auth_cookie])) {
			control.postEdit(res, req.body, name);
		}
		else {
			res.redirect('/error');
		}
	}
	else {
		control.add_comment(req, res, name);
	}
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
app.get('/year/:name', function(req, res) {
	var name = req.params.name;
	if(re_year.test(name)) {
		render.list(res, 3, 0, name);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/year/:name/:page', function(req, res) {
	var name = req.params.name;
	var page = req.params.page;
	if(re_num.test(page) && re_year.test(name)) {
		render.list(res, 3, page, name);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/month/:name', function(req, res) {
	var name = req.params.name;
	if(re_month.test(name)) {
		render.list(res, 4, 0, name);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/month/:name/:page', function(req, res) {
	var name = req.params.name;
	var page = req.params.page;
	if(re_num.test(page) && re_month.test(name)) {
		render.list(res, 4, page, name);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/pool', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		render.list(res, 5, 0);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/pool/:name', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		var name = req.params.name;
		if(re_num.test(name)) {
			render.list(res, 5, name);
		}
		else {
			res.redirect('/error');
		}
	}
	else {
		res.redirect('/error');
	}
});
app.post('/post_pool/:name', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		var name = req.params.name;
		if(re_num.test(name)) {
			control.pool(res, name, req.body.type);
		}
		else {
			res.redirect('/error');
		}
	}
	else {
		res.redirect('/error');
	}
});
app.get('/links', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		render.links(res);
	}
	else {
		res.redirect('/error');
	}
});
app.post('/links', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		control.link(res, req.body);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/admin', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		render.jade(res, 'admin');
	}
	else {
		res.redirect('/error');
	}
});
app.get('/posting', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		render.jade(res, 'posting')
	}
	else {
		res.redirect('/error');
	}
});
app.post('/posting', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		control.add_post(req, res);
	}
	else {
		res.redirect('/error');
	}
});
app.post('/res', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		control.editing(req.body, res); 
	}
	else {
		res.redirect('/error');
	}
});
app.get('/settings', function(req, res) {
	render.setting(res);
});
app.get('/panel_data', function(req, res) {
	render.panel(res);
});
app.post('/edit_pic', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		control.editingBack(req.body, res); 
	}
	else {
		res.redirect('/error');
	}
});
app.post('/new_back', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		control.createBack(req, res);
	}
	else {
		res.redirect('/error');
	}
});
app.get('/background', function(req, res) {
	if(render.auth_control(req.cookies[auth_cookie])) {
		fs.readdir('blog/source/back-blog/', function(err, files) {
			render.jade(res, 'background', files);
		});
	}
	else {
		res.redirect('/error');
	}
});
app.get('/error', function(req, res) {
	render.jade(res, 'error')
});
app.get('*', function(req, res) {
	router.parse(req, res);
});

//Чтение спецификации
var specific;
var auth_cookie;
fs.readFile('blog/specification.json', function(err, resp) {
	if(err) {
		console.log(err);
	}
	else {
		specific = JSON.parse(resp);
		http.createServer(app).listen(specific.port);
		//Название нужного кука для авторизации
		auth_cookie = 'aut.' + specific.name + '.diege';
	}
});