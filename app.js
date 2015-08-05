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
	render.jade(res, 'blog/pages/index');
});
app.get('/admin', function(req, res) {
	render.jade(res, 'blog/pages/admin');
});
app.post('/res', function(req, res) {
	control.editing(req.body);
	res.end();
});
app.get('/backgound', function(req, res) {
	res.end();
})
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
	console.log(req.url);
});

http.createServer(app).listen(3000);