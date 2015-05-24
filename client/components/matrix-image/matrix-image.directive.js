'use strict';

angular.module('spmApp').directive('matrixImage', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/matrix-image/matrix-image.html',
		scope: {
			matrixImageData: '='
		},
		link: function(scope, element) {
			var canvasElement = element.find('canvas')[0],
				canvasContext = canvasElement.getContext('2d'),
				// for matrix of size 2x2 imageData.length is equal to 16
				size = Math.sqrt(scope.matrixImageData.data.length / 4);

			canvasElement.width = size;
			canvasElement.height = size;

			scope.$watch(function() {
				return scope.matrixImageData;
			}, function(matrixImageData) {
				canvasContext.putImageData(matrixImageData, 0, 0)
			});
		}
	};
});