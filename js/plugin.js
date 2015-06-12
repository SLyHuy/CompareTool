

/**
 * @name templatePlugin
 * @description description
 * @version 1.0
 * @copyright Huy Lý
 * @options
 *		option
 * @events
 *		event
 * @methods
 *		init
 *		publicMethod
 *		destroy
 */
;(function($, window, undefined) {
	var pluginName = 'templatePlugin';
	var privateVar = null;
	var privateMethod = function() {

	};

	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};

	Plugin.prototype = {
		init: function() {

		},
		publicMethod: function(param) {

		},
		destroy: function() {
       $.removeData(this.element, pluginName);
		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				alert(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};

	$.fn[pluginName].defaults = {
		option: 'value'
	};
}(jQuery, window));

/**
 * @name commonValid
 * @description Super valid plugin - by Huy Lý
 * @version 1.0
 * @copyright Huy Lý
 * @options
 *		option
 * @events
 *		event
 * @methods
 *		init
 *		publicMethod
 *		destroy
 */


window.displayMessTimeout = null;
window.displayMessage = function(mess, e){
	if (mess == undefined){
		return;
	}
	console.log(e);
	e[0] && e[0].focus();
	var validLayer = $('#form-validator-layer');
	if (validLayer.length == 0){
		var stHtml = '<div id="form-validator-layer" style="position: absolute; top: -3000px; left: 0px; z-index: 999999; display: block; opacity: 1;"><p></p></div>';
		$(document.body).append(stHtml);
		delete stHtml;
		validLayer = $('#form-validator-layer');
	}		
	clearTimeout(displayMessTimeout);
	validLayer.find('p').html(mess);
	var offset = e.offset();

	validLayer.css({
		display : 'block'
	});
	
	validLayer.stop().css({
		left : offset.left,
		top : offset.top + e.outerHeight(false) + 10,
		display : 'block',
		opacity : 0
	}).animate({
		opacity : 1
	}, 300);
		
	displayMessTimeout = setTimeout(function(){
		validLayer.animate({
			opacity : 0
		}, 1000, function(){
			$(this).css({
				display : 'none'
			});
		});
	}, 3000);
};

(function ($, window, undefined) {
	
	var pluginName = 'commonValid';
	var xhr;

	

	function Plugin(element, options) {
		this.form = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};
	
	Plugin.prototype = {
		init : function () {
			var that = this;
			that.inputs = [];
			that.form.unbind('submit.' + pluginName).bind('submit.' + pluginName, function(e){
				var valid = true;
				var exit = false;				
				$.each(that.options.listInput, function (i, ei){
					if (ei.typeTextArea) {
						var textArea = that.form.find('#' + ei.id);
						if (!textArea.is(':visible')) {
							return;
						}
						if (textArea.val() == '') {
							displayMessage(ei.mess[0], textArea);
							valid = false;
							exit = true;
							return false;
						}
					}
					
					var input = that.form.find('[name="' + ei.name + '"]');
					that.inputs.push(input);
					if (ei.regex) {
						$.each(ei.regex, function (j, ej) {
							if (ej != null) {
								if ($.isFunction(ej)){
									if (!ej.call(input)){
										displayMessage(ei.mess[j], input);
										valid = false;
										exit = true;
										return false;
									}
								}
								else if (! (ej.test(input.val())) ) {
									displayMessage(ei.mess[j], input);
									valid = false;
									exit = true;
									return false;
								}
							}
						});
					}
					else if (ei.confirm && ei.preInput) {
						var preInput = that.form.find('[name="' + ei.preInput + '"]');						
						if (!(preInput.val() == input.val())) {							
							displayMessage(ei.mess[0], input.first());							
							valid = false;
							exit = true;
							return false;
						}
					}
					else if (ei.mess) {
						var radioValue = false;
						input.each(function (i, eInput) {
							radioValue = radioValue || eInput.checked;
						});
						if (!radioValue) {
							displayMessage(ei.mess[0], input.first());
							valid = false;
							exit = true;
							return false;
						}
					}
					if (valid == false || exit == true){
						return false;
					}
				});
				
				if (!exit && $.isFunction(that.options.checkBeforeSubmit) && !that.options.checkBeforeSubmit.call(that.form, that.inputs)) {
					valid = false;
					exit = true;
					return false;
				}
				if (exit){
					e.preventDefault();
				}
			});
		}
	};
	
	$.fn[pluginName] = function (options, params) {
		return this.each(function () {
			//$.data(this, pluginName, new Plugin(this, options));
			
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console.warn(this, pluginName + ' plugin has been initialized');
			}
		});
	};
	
	$.fn[pluginName].defaults = {
		listInput : [
		]
	};
}(jQuery, window));


