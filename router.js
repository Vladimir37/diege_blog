var render = require('./render')

//Разбиение запроса на части
function parse(req, res) {
	var result = delEmpty(req.url.split('/'));
	if(result[0] == 'source'){
		result.unshift('blog');
		var resName = result.join('/');
		render.source(res, resName)
	}
};
function delEmpty(arr) {
	var new_arr = arr;
	for (var i = 0; i < new_arr.length; i++) {
		if(new_arr[i].length === 0) {
			arr.splice(i, 1);
		}
	};
	return new_arr;
};


exports.parse = parse