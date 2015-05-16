'use strict';

angular.module('spmApp').controller('FilterMatrixCtrl', function($stateParams, FilterMatrices) {
	var ctrl = this;

	ctrl.filterMatrix = FilterMatrices.show($stateParams.id);
	ctrl.filterMatrixSize = ctrl.filterMatrix.data.length;

	ctrl.setSize = function() {
		ctrl.filterMatrix.data = _.times(ctrl.filterMatrixSize, function(i) {
			return _.times(ctrl.filterMatrixSize, function(j) {
				var row = ctrl.filterMatrix.data[i];
				return row && row[j] || 0;
			});
		});
	};

	ctrl.save = function() {
		FilterMatrices.update(ctrl.filterMatrix).then(function() {
			window.alert('Saved');
		});
	};
});
