'use strict';

angular.module('spmApp').controller('NewTopoMatrixCtrl', function(TopoMatrices, FilterMatrices, MatrixImage) {
	var ctrl = this,
		topoMatrixData = TopoMatrices.getSelected().data.value,
		filterMatrixData = FilterMatrices.getSelected().data,
		topoMatrixSize = topoMatrixData.length,
		filterMatrixSize = filterMatrixData.length,
		newTopoMatrixSize = topoMatrixSize - filterMatrixSize;

	function calculateNewTopoMatrix() {
		var matrixData = new Array(newTopoMatrixSize),
			min = Number.POSITIVE_INFINITY,
			max = Number.NEGATIVE_INFINITY;
		for (var n = filterMatrixSize - 1; n < topoMatrixSize - 1; ++n) {
			var row = new Array(newTopoMatrixSize);
			for (var m = filterMatrixSize - 1; m < topoMatrixSize - 1; ++m) {
				var cell = 0;
				for (var i = 0; i < filterMatrixSize; ++i) {
					for (var j = 0; j < filterMatrixSize; ++j) {
						cell += filterMatrixData[i][j] * topoMatrixData[n - i][m - j];
					}
				}
				min = cell < min ? cell : min;
				max = cell > max ? cell : max;
				row[m - filterMatrixSize + 1] = cell;
			}
			matrixData[n - filterMatrixSize + 1] = row;
		}

		return {
			from: min,
			to: max,
			data: {
				value: matrixData,
				min: min,
				max: max
			}
		};
	}

	ctrl.calculateMatrixImageData = function() {
		ctrl.matrixImageData = MatrixImage.grayscale(ctrl.newTopoMatrix.data.value, ctrl.range);
		ctrl.bwMatrixImageData = MatrixImage.blackWhite(ctrl.newTopoMatrix.data.value, ctrl.range);
	};

	if (topoMatrixData && filterMatrixData) {
		ctrl.newTopoMatrix = calculateNewTopoMatrix();
		ctrl.range = [ctrl.newTopoMatrix.from, ctrl.newTopoMatrix.to];
		ctrl.sliderOptions = {
			connect: true,
			range: {
				min: ctrl.newTopoMatrix.data.min,
				max: ctrl.newTopoMatrix.data.max
			}
		};
		ctrl.calculateMatrixImageData();
	}
});