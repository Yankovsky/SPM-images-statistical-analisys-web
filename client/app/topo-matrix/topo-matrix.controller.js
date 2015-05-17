'use strict';

angular.module('spmApp').controller('TopoMatrixCtrl', function($state, $stateParams, $flash, TopoMatrices, $timeout) {
	var ctrl = this;

	var $slider, $connect;
	function onSlide(e, range) {
		if (!$slider || !$slider.length) {
			$slider = $('.noUi-target');
		}
		if (!$connect || !$connect.length) {
			$connect = $('.noUi-origin.noUi-connect')
		}
		var width = (range[1] - range[0]) / (ctrl.topoMatrix.data.max - ctrl.topoMatrix.data.min) * $slider.width();
		$connect.css({
			background: 'linear-gradient(to right, black, white ' + width + 'px)'
		});
	}

	ctrl.topoMatrix = TopoMatrices.show($stateParams.id);
	if (!ctrl.topoMatrix) {
		$flash('Topo matrix with id ' + $stateParams.id + ' is not found.', {type: 'error'});
		$state.go('app.topo-matrices', null, {location: 'replace'});
	} else {
		ctrl.topoMatrix.from = ctrl.topoMatrix.from || ctrl.topoMatrix.data.min;
		ctrl.topoMatrix.to = ctrl.topoMatrix.to || ctrl.topoMatrix.data.max;
		ctrl.range = [ctrl.topoMatrix.from, ctrl.topoMatrix.to];
		ctrl.sliderOptions = {
			connect: true,
			range: {
				min: ctrl.topoMatrix.data.min,
				max: ctrl.topoMatrix.data.max
			}
		};
		$timeout(function() {
			onSlide(null, ctrl.range);
		});
		ctrl.sliderEvents = {
			slide: onSlide
		};
	}

	ctrl.save = function() {
		TopoMatrices.update({
			_id: ctrl.topoMatrix._id,
			name: ctrl.topoMatrix.name,
			from: ctrl.range[0],
			to: ctrl.range[1]
		}).then(function() {
			$flash('Topo matrix "' + ctrl.topoMatrix.name + '" successfully renamed!', {type: 'success'});
		});
	};
});