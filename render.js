var fs = require('fs');
var jade = require('jade');

//Рендеринг jade
function renderJade(res, name, addon) {
	fs.readFile('blog/blogger.json', function(err, data) {
	if(err) {
		console.log(err);
	}
	else {
		frame = JSON.parse(data);
		frame.added = addon;
		jade.renderFile('blog/pages/' + name + '.jade', frame, function(error, resp) {
		if(err) {
			console.log(error);
		}
		else {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.end(resp);
		}
		});
	}
	});
};

//Рендеринг ресурсов
function renderRes(res, name) {
	fs.readFile(name, function(err, resp) {
		if(err) {
			console.log(err);
		}
		else {
			res.end(resp);
		}
	});
};

exports.jade = renderJade;
exports.source = renderRes;