var http = require('http');
var express = require('express');
var router = require('./router');
var render = require('./render');
var parser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(parser());

app.get('/', function(req, res) {
	render.jade(res, 'blog/index');
});
app.get('/admin', function(req, res) {
	render.jade(res, 'blog/admin');
});
app.post('/res', function(req, res) {
	console.log(req.body);
	res.end();
});
app.get('*', function(req, res) {
	router.parse(req, res);
	console.log(req.url);
});

http.createServer(app).listen(3000);