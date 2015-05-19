'use strict';

angular.module('spmApp').factory('NewTopoMatrix', function(TopoMatrices, FilterMatrices) {
	return {
		getCurrent: function() {
			var topoMatrixData = TopoMatrices.getSelected().data.value;
			var filterMatrixData = FilterMatrices.getSelected().data;
			var topoMatrixSize = topoMatrixData.length;
			var filterMatrixSize = filterMatrixData.length;
			var newTopoMatrixSize = topoMatrixSize - filterMatrixSize;

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
	};
});