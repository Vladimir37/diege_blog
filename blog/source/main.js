$(document).ready(function() {
	//Конструктор спектров
	function fabrColor(col) {
		this.showPaletteOnly = true,
		this.togglePaletteOnly = false,
		this.togglePaletteMoreText = 'more',
		this.togglePaletteLessText = 'less',
		this.color = col,
		this.palette = [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    	]
	};

	//Кнопки выбора
	$('.perm').buttonset();

	//Выбор цвета
	var select_color = ['m_tit_color', 's_tit_color', 'rib_font', 'rib_color_f', 'rib_color_s', 'panel_color', 'panel_color_tit', 'panel_color_li', 'back_cont', 'color_main_tit', 'color_main_te', 'but_col', 'but_back'];

	select_color.forEach(function(item) {
		$('#' + item).spectrum(new fabrColor($('#'+item).val()));
	});

	//Выделение пунктов по системным данным из фрейма
	$('#mtp' + $('#sys1').val()).click();
	$('#stp' + $('#sys2').val()).click();
	$('#rs' + $('#sys6').val()).click();
	$('#mp' + $('#sys9').val()).click();
	$('#rs' + $('#sys6').val()).click();
	$('#pp' + $('#sys10').val()).click();
	$('#news' + $('#sys14').val()).click();
	$('#bench' + $('#sys15').val()).click();
	$('#arc' + $('#sys16').val()).click();
	$('#vol' + $('#sys21').val()).click();
	$('#flo' + $('#sys22').val()).click();
	$('#com' + $('#sys23').val()).click();

	//Удаление второго цвета
	$('input[name="rib_sort"]').change(function(){
		if($('#rs1').is(':checked')) {
			$("#rib_color_s").next().fadeOut();
		}
		else {
			$("#rib_color_s").next().fadeIn();
		}
	});
	//Управление панелью
	$('input[name="pan_main"]').change(function() {
		if($('#mp1').is(':checked')) {
			$('#pan_cont').slideDown();
		}
		else {
			$('#pan_cont').slideUp();
		}
	});
	//Проверка панели при загрузке
	if($('#mp2').is(':checked')) {
		$('#pan_cont').hide();
	};
	//Управление прозрачностью
	$('#slide_opacity').slider({
		range: "min",
		value: $('#sys18').val()*10,
		min: 5,
		max: 10,
		slide: function( event, ui ) {
			$("#opacity").val(ui.value/10);
		}
	})
});