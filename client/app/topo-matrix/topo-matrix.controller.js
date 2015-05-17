'use strict';

angular.module('spmApp').controller('TopoMatrixCtrl', function($state, $stateParams, $flash, TopoMatrices, $timeout) {
	var ctrl = this,
		canvasElement,
		canvasContext,
		topoMatrixSize;

	var $slider, $connect;

	function onSlide() {
		if (!$slider || !$slider.length) {
			$slider = $('.noUi-target');
		}
		if (!$connect || !$connect.length) {
			$connect = $('.noUi-origin.noUi-connect');
		}
		var width = (ctrl.range[1] - ctrl.range[0]) / (ctrl.topoMatrix.data.max - ctrl.topoMatrix.data.min) * $slider.width();
		$connect.css({
			background: 'linear-gradient(to right, black, white ' + width + 'px)'
		});
		drawFilteredTopoMatrixImage();
	}

	function getColorForValue(value) {
		var colorValue = (value - ctrl.range[0]) / (ctrl.range[1] - ctrl.range[0]) * 255;
		return parseInt(colorValue > 0 ? (colorValue < 255 ? colorValue : 255) : 0);
	}

	function drawFilteredTopoMatrixImage() {
		var topoMatrixData = ctrl.topoMatrix.data.value;
		var imageData = new ImageData(topoMatrixSize, topoMatrixSize);
		for (var row = 0; row < topoMatrixSize; ++row) {
			for (var column = 0; column < topoMatrixSize; ++column) {
				var i = (row * topoMatrixSize + column) * 4;
				imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = getColorForValue(topoMatrixData[row][column]);
				imageData.data[i + 3] = 255;
			}
		}
		canvasContext.putImageData(imageData, 0, 0);
	}

	ctrl.topoMatrix = TopoMatrices.show($stateParams.id);
	if (!ctrl.topoMatrix) {
		$flash('Topo matrix with id ' + $stateParams.id + ' is not found.', {type: 'error'});
		$state.go('app.topo-matrices', null, {location: 'replace'});
	} else {
		topoMatrixSize = ctrl.topoMatrix.data.value.length
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
		ctrl.sliderEvents = {
			slide: onSlide
		};
		canvasElement = $('#topo-matrix-canvas')[0];
		canvasContext = canvasElement.getContext('2d');
		canvasElement.width = topoMatrixSize;
		canvasElement.height = topoMatrixSize;
		$timeout(onSlide);
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