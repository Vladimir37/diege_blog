var fs = require('fs');

//Обработка изменений в настройках
function editing(changed) {
	fs.readFile('blog/blogger.json', function(err, data) {
		frame = JSON.parse(data);
		frame.head.one = changed.main_tit;
		frame.head.two = changed.sec_tit;
		frame.head.one_or = changed.m_tit_pos;
		frame.head.two_or = changed.s_tit_pos;
		frame.head.one_col = changed.m_tit_color;
		frame.head.two_col = changed.s_tit_color;
		frame.top_panel.color = changed.rib_font;
		frame.top_panel.back_type = changed.rib_sort;
		frame.top_panel.back_color_f = changed.f_rib_color;
		frame.top_panel.back_color_s = changed.s_rib_color;
		frame.top_panel.height = changed.rib_he;
		frame.main_panel.enabled = changed.pan_main;
		frame.main_panel.position = changed.pan_pos;
		frame.main_panel.color = changed.panel_color;
		frame.main_panel.back_title = changed.panel_color_tit;
		frame.main_panel.back_main = changed.panel_color_li;
		frame.main_panel.news = changed.news;
		frame.main_panel.brenchs = changed.bench;
		frame.main_panel.archives = changed.arc;
		frame.content.back_color = changed.back_cont;
		frame.content.font_color = changed.color_main_tit;
		frame.content.title_color = changed.color_main_te;
		frame.content.opacity = changed.opacity;
		frame.main.comments = changed.com;
		frame.button.background = changed.but_back;
		frame.button.color = changed.but_col;
		frame.button.volime = changed.vol;
		frame.button.flow = changed.flo;
		var result = JSON.stringify(frame);
		fs.open('blog/blogger.json', 'w', function(err, desc) {
			if(err) {
				console.log(err);
			}
			else {
				fs.write(desc, result, function(err) {
					if(err) {
						console.log(err);
					}
					else {
						console.log('Win!');
					}
				})
			}
		});
	});
}

function editingBack(changed) {
	fs.readFile('blog/blogger.json', function(err, data) {
		frame = JSON.parse(data);
		frame.content.background = changed.pic;
		frame.content.back_type = changed.back_type;
		var result = JSON.stringify(frame);
		fs.open('blog/blogger.json', 'w', function(err, desc) {
			if(err) {
				console.log(err);
			}
			else {
				fs.write(desc, result, function(err) {
					if(err) {
						console.log(err);
					}
					else {
						console.log('Win!');
					}
				});
			}
		});
	});
};

exports.editing = editing;
exports.editingBack = editingBack;