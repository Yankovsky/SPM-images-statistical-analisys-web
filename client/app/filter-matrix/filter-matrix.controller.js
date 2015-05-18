'use strict';

angular.module('spmApp').controller('FilterMatrixCtrl', function($state, $stateParams, $flash, FilterMatrices) {
	var ctrl = this;

	ctrl.filterMatrix = _.cloneDeep(FilterMatrices.show($stateParams.id));
	if (!ctrl.filterMatrix) {
		$flash('Filter matrix with id ' + $stateParams.id + ' is not found.', {type: 'error'});
		$state.go('app.filter-matrices', null, {location: 'replace'});
	}
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
		FilterMatrices.update(ctrl.filterMatrix).success(function() {
			$flash('Filter matrix "' + ctrl.filterMatrix.name + '" successfully updated!', {type: 'success'});
		});
	};
});
