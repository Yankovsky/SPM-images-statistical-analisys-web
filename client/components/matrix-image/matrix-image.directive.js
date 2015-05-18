'use strict';

angular.module('spmApp').directive('matrixImage', function() {
	return {
		restrict: 'E',
		template: '<canvas></canvas>',
		scope: {
			matrixImageData: '=',
			matrixSize: '='
		},
		link: function(scope, element) {
			var canvasElement = element.find('canvas')[0],
				canvasContext = canvasElement.getContext('2d'),
				size = scope.matrixSize;

			scope.$watch(function() {
				return scope.matrixImageData;
			}, function() {
				canvasElement.width = size;
				canvasElement.height = size;
				canvasContext.putImageData(scope.matrixImageData, 0, 0);
			});
		}
	}
});