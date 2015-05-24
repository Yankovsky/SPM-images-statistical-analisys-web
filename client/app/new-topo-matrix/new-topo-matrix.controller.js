'use strict';

angular.module('spmApp').controller('NewTopoMatrixCtrl', function(TopoMatrices, FilterMatrices, NewTopoMatrix, MatrixImage, Settings) {
	var ctrl = this;
	ctrl.topoMatrix = TopoMatrices.getSelected();
	ctrl.newTopoMatrix = NewTopoMatrix.getCurrent();


	tracking.ColorTracker.registerColor('white', function(r, g, b) {
		return r === 255 && g === 255 && b === 255;
	});

	var tracker = new tracking.ColorTracker('white');
	tracker.setMinDimension(0);
	tracker.setMinGroupSize(1);
	tracker.on('track', function(event) {
		ctrl.newTopoBlobs = event.data;
	});

	ctrl.calculateTopoMatrixImageData = function() {
		ctrl.topoMatrixImageData = MatrixImage.grayscale(ctrl.topoMatrix);
	};
	ctrl.calculateTopoMatrixImageData();

	ctrl.calculateNewTopoMatricesImagesData = function() {
		ctrl.grayscaleNewTopoMatrixImageData = MatrixImage.grayscale(ctrl.newTopoMatrix);
		ctrl.blackWhiteNewTopoMatrixImageData = MatrixImage.blackWhite(ctrl.newTopoMatrix);
		tracker.track(ctrl.blackWhiteNewTopoMatrixImageData.data, ctrl.blackWhiteNewTopoMatrixImageData.width, ctrl.blackWhiteNewTopoMatrixImageData.height);
	};
	ctrl.calculateNewTopoMatricesImagesData();

	ctrl.horizontalLayout = Settings.horizontalLayout();
	ctrl.setHorizontalLayout = function() {
		Settings.horizontalLayout(ctrl.horizontalLayout);
	};
});