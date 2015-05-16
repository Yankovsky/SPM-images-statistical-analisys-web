'use strict';

angular.module('spmApp').controller('TopoMatrixCtrl', function($http, $stateParams) {
	var ctrl = this;

	$http.get('/api/topo-matrices/' + $stateParams.id).success(function(topoMatrix) {
		ctrl.topoMatrix = topoMatrix;
	});

	ctrl.save = function() {
		$http.put('/api/topo-matrices/' + ctrl.topoMatrix._id, ctrl.topoMatrix).success(function() {
			window.alert('Saved');
		});
	};
});
