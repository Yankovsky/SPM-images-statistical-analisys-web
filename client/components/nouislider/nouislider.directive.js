'use strict';

angular.module('ya.nouislider', []).value('noUiSliderConfig', {}).directive('noUiSlider', function(noUiSliderConfig) {
	noUiSliderConfig = noUiSliderConfig || {};

	return {
		restrict: 'A',
		scope: {
			range: '=',
			noUiSlider: '=',
			onRangeChange: '&'
		},
		link: function(scope, element) {
			if (!scope.range) {
				return;
			}
			var $slider, $connect;
			scope.$watch(function() {
				return scope.range;
			}, function() {
				element.val(scope.range);
				if (!$slider || !$slider.length) {
					$slider = $('.noUi-target');
				}
				if (!$connect || !$connect.length) {
					$connect = $('.noUi-origin.noUi-connect');
				}
				var width = (scope.range[1] - scope.range[0]) / (options.range.max - options.range.min) * $slider.width();
				$connect.css({
					background: 'linear-gradient(to right, black, white ' + width + 'px)'
				});
				if (scope.onRangeChange) {
					scope.onRangeChange();
				}
			}, true);
			var options = angular.extend({}, noUiSliderConfig, scope.noUiSlider, {start: scope.range});
			element.on('slide change', function(event, viewValue) {
				scope.$apply(function() {
					scope.range[0] = +viewValue[0];
					scope.range[1] = +viewValue[1];
				});
			});
			element.noUiSlider(options);
		}
	};
});