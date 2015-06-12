/**
 * Global variables and functions
 */
var CompareTool = (function($, window, undefined){	 	
	var SITEPATH = '';
	isLoading = false;

	function showLoading(){
		isLoading = true;
		$('#compare-form button').prepend('<span id="loader" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
		$('#compare-table').html('');
		$('footer').addClass('loading');
		$('#form-alert').remove();

	};

	function hideLoading(){
		$('#loader').remove();
		$('footer').removeClass('loading');
		isLoading = false;
	};

	window.jsonpCallback = function(result){
		//console.log(result);
	}

	function buildProduct(texts){
		window.texts = texts;


		//Build header
		var thead = $('<thead><tr></tr></thead>');
		//Product name
		thead.find('tr').append('<th class="s-column-1">' + Config.nameProduct.name + '</th>');

		for (var i = 0; i < texts.length; i++){
			var pname = $.trim($(texts[i]).find(Config.nameProduct.jquery).text());

			var styleText = $(texts[i]).find(Config.rating.jquery).attr('style');
			var rating;
			if (styleText && styleText.indexOf(':') > 0){
				rating = parseInt(styleText.split(':')[1], 10);
			}
			else{
				rating = null;
			}

			var countRating;
			if (rating){
				countRating = parseInt($(texts[i]).find(Config.countRating.jquery).text().replace('(', ''), 10);
			}	

			var th = '<th>\
						<a href="#">' + pname + '</a>;';

			if (rating){
				th = th + '<div class="wrap-rating">\
							<div class="inner-rating" title="' + (rating / 100) * 5 + ' sao">\
								<div class="rating" style="width: ' + rating + '%;"></div>\
							</div>\
							<span class="small-text">(' + countRating + ' đánh giá)</span>\
						</div>';
			}
						
			th = th	+ '</th>'
			thead.find('tr').append(th);
		}
		$('#compare-table').append(thead);

		//Build tbody
		var tbody = $('<tbody></tbody>');
		var tr;

		//Image
		tr = $('<tr>').appendTo(tbody);
		tr.append('<td>' + Config.image.name + '</td>');
		for (var i = 0; i < texts.length; i++){
			var image = $(texts[i]).find(Config.image.jquery).attr('data-zoom-image');
			tr.append('<td><img src="' + image + '" class="product-image img-responsive img-thumbnail" alt="Image"></td>')
		}

		//Price
		tr = $('<tr>').appendTo(tbody);
		tr.append('<td>' + Config.price.name + '</td>');
		for (var i = 0; i < texts.length; i++){
			var price = $(texts[i]).find(Config.price.jquery).text();
			tr.append('<td><span class="price label label-danger">' + price + '</span></td>')
		}

		//In stock
		tr = $('<tr>').appendTo(tbody);
		tr.append('<td>' + Config.inStock.name + '</td>');
		for (var i = 0; i < texts.length; i++){
			var style = $(texts[i]).find(Config.inStock.jquery).attr('style');
			var inStock = false;
			if (style == 'display: none'){
				inStock = true;
			}
			var classInStock = inStock ? 'text-success glyphicon-ok' : 'text-danger glyphicon-remove';
			tr.append('<td><span class="' + classInStock + ' glyphicon"></span></td>');
		}

		//In Box
		tr = $('<tr>').appendTo(tbody);
		tr.append('<td>' + Config.inBox.name + '</td>');
		for (var i = 0; i < texts.length; i++){
			var items = $(texts[i]).find(Config.inBox.jquery);
			var str = '<td><ul>';
			for (var j = 0; j < items.length; j++){
				str += '<li>' + items.eq(j).text() + '</li>'
			}
			str += '</ul></td>';
			tr.append(str);
		}

		//Other

		$.each(Config.crawlerInfo, function(i, e){
			var check = false;
			tr = $('<tr>').appendTo(tbody);
			tr.append('<td>' + e.name + '</td>');
			for (var i = 0; i < texts.length; i++){
				var text = $(texts[i]).find(e.jquery).text();
				if (text){
					check = true;
				}
				tr.append('<td>' + text + '</td>');
			}
			if (!check){
				tr.remove();
			}
		});

		$('#compare-table').append(tbody);


		hideLoading();
	}

	function loadUrl(url, index, callback){
		$.support.cors = true;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql?q=select * from html where url="' + url + '"and xpath="\/\/article"&format=html&callback=jsonpCallback',
			type: 'GET',
			crossDomain: true,
			dataType: 'jsonp',
			jsonpCallback: 'jsonpCallback',
			success: function(result){
				//console.log(result, result.results, result.results[0]);
				if (result && result.results && result.results[0]){
					var textHtml = result.results[0];
					//var gia = $(textHtml).find('.specification-table td:contains("Giá") + td').text();
					callback && callback(textHtml, index);
				}
				else{
					whenError();
				}
				
			},
			error: function(){
				whenError();
			}
		});

		function whenError(){
			$('<div id="form-alert" class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Network error, please try again.</div>')
			.appendTo($('#compare-form').parent());
			callback && callback(false);
			hideLoading();
			$('footer').addClass('loading');
		}
	};

	function doCompare(url1, url2){
		if (isLoading){
			return false
		}
		showLoading();

		var n = 2;
		var i = 0;
		var texts = ['', ''];
		function syncLoad(result, index){
			if (!result){
				return;
			}
			i++;
			texts[index] = result;
			if (i == n){
				buildProduct(texts);
			}
		}

		loadUrl(url1, 0, syncLoad);
		loadUrl(url2, 1, syncLoad);
	}

	return {
		isLoading: isLoading,
		showLoading: showLoading,
		hideLoading: hideLoading,
		doCompare: doCompare
	};
})(jQuery, window);

/**************************
	Website start here
***************************/

jQuery(document).ready(function($){

	/* Input for testing */
	$('#url1').val('http://www.lazada.vn/apple-iphone-6-16gb-xam-hang-nhap-khau-240697.html');
	$('#url2').val('http://www.lazada.vn/alcatel-one-touch-idol-x-6040d-16gb-do-150683.html');
	/* End input for testing */


	$('#compare-form').commonValid({
		listInput: [{
			name: 'url1',
			regex: [/\d|\w/, /https?\:\/\/\w+((\:\d+)?\/\S*)?/],
			mess: ['Vui lòng nhập URL', 'Vui lòng nhập URL hợp lệ. Ví dụ: http://google.com']
		},{
			name: 'url2',
			regex: [/\d|\w/, /https?\:\/\/\w+((\:\d+)?\/\S*)?/],
			mess: ['Vui lòng nhập URL', 'Vui lòng nhập URL hợp lệ. Ví dụ: http://google.com']
		}],
		checkBeforeSubmit: function(inputs){
			CompareTool.doCompare(inputs[0].val(), inputs[1].val());
			return false;
		}
	});
	
});