'use strict';

angular.module('spmApp').factory('MatrixImage', function() {
	function createImageFromMatrixData(matrixData, callback) {
		var size = matrixData.length;
		var imageData = new window.ImageData(size, size);
		for (var row = 0; row < size; ++row) {
			for (var column = 0; column < size; ++column) {
				var i = (row * size + column) * 4;
				callback(matrixData[row][column], imageData, i);
			}
		}
		return imageData;
	}

	return {
		grayscale: function(matrixData, range) {
			return createImageFromMatrixData(matrixData, function(matrixValue, imageData, i) {
				var colorValue = (matrixValue - range[0]) / (range[1] - range[0]) * 255;
				var limitedColorValue = parseInt(colorValue > 0 ? (colorValue < 255 ? colorValue : 255) : 0);
				imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = limitedColorValue;
				imageData.data[i + 3] = 255;
			});
		},
		blackWhite: function(matrixData, range) {
			var threshold = (range[0] + range[1]) / 2;
			return createImageFromMatrixData(matrixData, function(matrixValue, imageData, i) {
				imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = matrixValue > threshold ? 255 : 0;
				imageData.data[i + 3] = 255;
			});
		}
	}
});