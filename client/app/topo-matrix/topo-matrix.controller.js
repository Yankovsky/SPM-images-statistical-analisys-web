'use strict';

angular.module('spmApp').controller('TopoMatrixCtrl', function($state, $stateParams, $flash, TopoMatrices, MatrixImage, Settings) {
	var ctrl = this;

	ctrl.calculateMatrixImageData = function() {
		ctrl.matrixImageData = MatrixImage.grayscale(ctrl.topoMatrix.data.value, ctrl.range)
	};

	ctrl.topoMatrix = _.cloneDeep(TopoMatrices.show($stateParams.id));
	if (!ctrl.topoMatrix) {
		$flash('Topo matrix with id ' + $stateParams.id + ' is not found.', {type: 'error'});
		$state.go('app.topo-matrices', null, {location: 'replace'});
	} else {
		ctrl.range = [ctrl.topoMatrix.from, ctrl.topoMatrix.to];
		ctrl.sliderOptions = {
			connect: true,
			range: {
				min: ctrl.topoMatrix.data.min,
				max: ctrl.topoMatrix.data.max
			}
		};
		ctrl.calculateMatrixImageData();
	}

	ctrl.save = function() {
		TopoMatrices.update({
			_id: ctrl.topoMatrix._id,
			name: ctrl.topoMatrix.name,
			distance: ctrl.topoMatrix.distance,
			from: ctrl.range[0],
			to: ctrl.range[1]
		}).success(function() {
			$flash('Topo matrix "' + ctrl.topoMatrix.name + '" successfully renamed!', {type: 'success'});
		});
	};

	ctrl.fitInPage = Settings.get('fitInPage');
	ctrl.setFitInPage = function() {
		Settings.set('fitInPage', ctrl.fitInPage);
	};
});