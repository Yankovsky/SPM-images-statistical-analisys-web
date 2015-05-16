'use strict';

angular.module('spmApp').controller('TopoMatrixCtrl', function($state, $stateParams, $flash, TopoMatrices) {
	var ctrl = this;

	ctrl.topoMatrix = TopoMatrices.show($stateParams.id);
	if (!ctrl.topoMatrix) {
		$flash('Topo matrix with id ' + $stateParams.id + ' is not found.', {type: 'error'});
		$state.go('app.topo-matrices', null, {location: 'replace'})
	}

	ctrl.save = function() {
		TopoMatrices.update({
			_id: ctrl.topoMatrix._id,
			name: ctrl.topoMatrix.name
		}).then(function() {
			$flash('Topo matrix "' + ctrl.topoMatrix.name + '" successfully renamed!', {type: 'success'});
		});
	};
});
