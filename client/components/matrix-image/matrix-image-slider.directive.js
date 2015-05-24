'use strict';

angular.module('spmApp').directive('matrixImageSlider', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/matrix-image/matrix-image-slider.html',
		scope: {
			matrix: '=',
			onRangeChange: '&'
		},
		link: {
			pre: function(scope) {
				scope.sliderOptions = {
					range: {
						min: scope.matrix.data.min,
						max: scope.matrix.data.max
					}
				};
			}
		}
	};
});