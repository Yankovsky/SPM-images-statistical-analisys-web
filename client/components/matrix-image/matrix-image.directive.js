'use strict';

angular.module('spmApp').directive('matrixImage', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/matrix-image/matrix-image.html',
		scope: {
			matrix: '=',
			matrixImageFunction: '&',
			sliderDisabled: '='
		},
		link: function(scope, element) {
			var canvasElement = element.find('canvas')[0],
				canvasContext = canvasElement.getContext('2d'),
				size = scope.matrix.data.value.length;

			canvasElement.width = size;
			canvasElement.height = size;

			scope.sliderOptions = {
				range: {
					min: scope.matrix.data.min,
					max: scope.matrix.data.max
				}
			};

			scope.updateImageData = function() {
				canvasContext.putImageData(scope.matrixImageFunction()(scope.matrix), 0, 0);
			};

			// move to controller
			if (scope.sliderDisabled) {
				scope.$watchCollection(function() {
					return [scope.matrix.from, scope.matrix.to];
				}, function() {
					scope.updateImageData();
				});
			}
		}
	};
});