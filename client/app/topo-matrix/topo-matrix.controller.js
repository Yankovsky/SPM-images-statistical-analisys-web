'use strict';

angular.module('spmApp').controller('TopoMatrixCtrl', function($state, $stateParams, $flash, TopoMatrices, MatrixImage, Settings) {
	var ctrl = this;

	ctrl.topoMatrix = _.cloneDeep(TopoMatrices.show($stateParams.id));
	if (!ctrl.topoMatrix) {
		$flash('Topo matrix with id ' + $stateParams.id + ' is not found.', {type: 'error'});
		$state.go('app.topo-matrices', null, {location: 'replace'});
	}

	ctrl.calculateMatrixImageData = function() {
		ctrl.topoMatrixImageData = MatrixImage.grayscale(ctrl.topoMatrix);
	};
	ctrl.calculateMatrixImageData();

	ctrl.save = function() {
		TopoMatrices.update(_.omit(ctrl.topoMatrix, 'data')).success(function() {
			$flash('Topo matrix "' + ctrl.topoMatrix.name + '" successfully renamed!', {type: 'success'});
		});
	};

	ctrl.fitInPage = Settings.fitInPage();
	ctrl.setFitInPage = function() {
		Settings.fitInPage(ctrl.fitInPage);
	};
});