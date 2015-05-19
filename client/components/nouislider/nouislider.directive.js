'use strict';

angular.module('ya.nouislider', []).directive('noUiSlider', function() {
	return {
		restrict: 'A',
		scope: {
			from: '=',
			to: '=',
			noUiSlider: '=',
			onRangeChange: '&'
		},
		link: function(scope, element) {
			var $connect;
			scope.$watchCollection(function() {
				return [scope.from, scope.to];
			}, function(range) {
				element.val(range);
				if (!$connect || !$connect.length) {
					$connect = element.find('.noUi-origin.noUi-connect');
				}
				var width = (range[1] - range[0]) / (options.range.max - options.range.min) * element.width();
				$connect.css({
					background: 'linear-gradient(to right, black, white ' + width + 'px)'
				});
				if (scope.onRangeChange) {
					scope.onRangeChange();
				}
			});
			var options = angular.extend({connect: true}, scope.noUiSlider, {start: [scope.from, scope.to]});
			element.on('slide change', function(event, viewValue) {
				scope.$apply(function() {
					scope.from = +viewValue[0];
					scope.to = +viewValue[1];
				});
			});
			element.noUiSlider(options);
		}
	};
});