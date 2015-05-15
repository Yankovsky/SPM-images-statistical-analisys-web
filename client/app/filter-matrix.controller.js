'use strict';

angular.module('spmApp').controller('FilterMatrixCtrl', function($http, $stateParams) {
	var ctrl = this;

	$http.get('/api/filter-matrices/' + $stateParams.id).success(function(filterMatrix) {
		ctrl.filterMatrix = filterMatrix;
		ctrl.filterMatrixSize = filterMatrix.data.length;
	});

	ctrl.setSize = function() {
		ctrl.filterMatrix.data = _.times(ctrl.filterMatrixSize, function(i) {
			return _.times(ctrl.filterMatrixSize, function(j) {
				var row = ctrl.filterMatrix.data[i];
				return row && row[j] || 0;
			});
		});
	};

	ctrl.save = function() {
		$http.put('/api/filter-matrices/' + ctrl.filterMatrix._id, ctrl.filterMatrix).success(function() {
			alert('Saved');
		});
	};
});
