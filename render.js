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

//Рендер настроек
function setting(res) {
	fs.readFile('blog/blogger.json', function(err, data) {
		if(err) {
			console.log(err);
		}
		else {
			frame = JSON.parse(data);
			res.writeHead(200, {'Content-Type': 'text/css'});
			//res.write();
			res.write('h1 {text-align: ' + align(frame.head.one_or) + '; color: ' + frame.head.one_col + ';}\n');
			res.write('h2 {text-align: ' + align(frame.head.two_or) + '; color: ' + frame.head.two_col + ';}\n');
			res.write('.ribbon {background: ' + ribbon_color(frame.top_panel.back_type, frame.top_panel.back_color_f, frame.top_panel.back_color_s) + '; color: ' + frame.top_panel.color + '; height: ' + frame.top_panel.height * 50 + 'px;}\n');
			res.write('.panel {color: ' + frame.main_panel.color + '}\n');
			res.write('.pan_title {background: ' + frame.main_panel.back_title + '};\n');
			res.write('.pan_list {background: ' + frame.main_panel.back_main + '};\n');
			res.write('.post_tit {color: ' + frame.content.title_color + '}\n');
			res.write('.data_post {color: ' + frame.content.font_color + '}\n');
			res.write('.back { background-image: url("/source/back-blog/' + frame.content.background + '"); ');
			if(frame.content.back_type == 1) {
				res.write('background-size: cover; }\n');
			}
			else {
				res.write('background-repeat: repeat; }\n');
			}
			res.write('.main_field {background: ' + frame.content.back_color + ';');
			res.write('opacity: ' + frame.content.opacity + ';}');
			res.end();
		}
	});
};

//Расшифровка значений
function align(num) {
	switch(num) {
		case '1':
			return 'left'
			break;
		case '2':
			return 'center'
			break;
		case '3':
			return 'right'
			break;
		default:
			return 'left'
			break;
	}
};
//Определение цвета ленты
function ribbon_color(type, col_1, col_2) {
	if(type == 1) {
		return col_1;
	}
	else if(type == 2) {
		return 'linear-gradient(to bottom, ' + col_1 + ', ' + col_2 + ')';
	}
	else {
		return 'linear-gradient(to bottom, ' + col_1 + ', ' + col_2 + ', ' + col_1 + ')'
	}
}

exports.jade = renderJade;
exports.source = renderRes;
exports.setting = setting;