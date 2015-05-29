'use strict';

angular.module('spmApp').controller('NewTopoMatrixCtrl', function(TopoMatrices, FilterMatrices, NewTopoMatrix, MatrixImage, Settings, BlobStatistics, BlobStatisticsExport) {
	var ctrl = this;
	var filterMatrix = FilterMatrices.getSelected();
	var filterMatrixSizeDividedByTwo = Math.floor(filterMatrix.data.length / 2);
	ctrl.blobAreaExpansion = 0;
	ctrl.topoMatrix = TopoMatrices.getSelected();
	ctrl.newTopoMatrix = NewTopoMatrix.getCurrent(ctrl.topoMatrix.data.value, filterMatrix.data);

	window.tracking.ColorTracker.registerColor('white', function(r, g, b) {
		return r === 255 && g === 255 && b === 255;
	});

	var tracker = new window.tracking.ColorTracker('white');
	tracker.setMinDimension(0);
	tracker.setMinGroupSize(1);
	tracker.on('track', function(event) {
		ctrl.newTopoBlobs = _.map(event.data, function(blob) {
			return {
				width: blob.width + 1,
				height: blob.height + 1,
				left: blob.x - 1,
				top: blob.y - 1
			};
		});
		ctrl.calculateTopoBlobs();
	});

	function findBlobs() {
		if (ctrl.findBlobsDynamically) {
			ctrl.findBlobs();
		} else {
			ctrl.newTopoBlobs = [];
			ctrl.topoBlobs = [];
		}
	}

	ctrl.calculateTopoBlobs = function() {
		ctrl.topoBlobs = _.map(ctrl.newTopoBlobs, function(blob) {
			return {
				width: blob.width + 2 * ctrl.blobAreaExpansion,
				height: blob.height + 2 * ctrl.blobAreaExpansion,
				left: blob.left + filterMatrixSizeDividedByTwo - ctrl.blobAreaExpansion,
				top: blob.top + filterMatrixSizeDividedByTwo - ctrl.blobAreaExpansion
			};
		});
	};

	ctrl.horizontalLayout = Settings.horizontalLayout();
	ctrl.setHorizontalLayout = function() {
		Settings.horizontalLayout(ctrl.horizontalLayout);
	};

	ctrl.findBlobsDynamically = Settings.findBlobsDynamically();
	ctrl.setFindBlobsDynamically = function() {
		findBlobs();
		Settings.findBlobsDynamically(ctrl.findBlobsDynamically);
	};

	ctrl.findBlobs = function() {
		tracker.track(ctrl.blackWhiteNewTopoMatrixImageData.data, ctrl.blackWhiteNewTopoMatrixImageData.width, ctrl.blackWhiteNewTopoMatrixImageData.height);
	};

	ctrl.calculateTopoMatrixImageData = function() {
		ctrl.topoMatrixImageData = MatrixImage.grayscale(ctrl.topoMatrix);
	};
	ctrl.calculateTopoMatrixImageData();

	ctrl.calculateNewTopoMatricesImagesData = function() {
		ctrl.grayscaleNewTopoMatrixImageData = MatrixImage.grayscale(ctrl.newTopoMatrix);
		ctrl.blackWhiteNewTopoMatrixImageData = MatrixImage.blackWhite(ctrl.newTopoMatrix);
		findBlobs();
	};
	ctrl.calculateNewTopoMatricesImagesData();

	ctrl.calculateStatisticsForBlob = function(blob) {
		BlobStatistics.getForOne(blob, ctrl.topoMatrix.data.value);
	};

	ctrl.calculateStatisticsForAllBlobs = function() {
		BlobStatistics.getForAll(ctrl.topoBlobs, ctrl.topoMatrix.data.value);
	};

	ctrl.exportStatistics = function() {
		if (!ctrl.topoBlobs.length) {
			ctrl.findBlobs();
		}
		if (!ctrl.topoBlobs[0].distanceToNearestNeighbor) {
			ctrl.calculateStatisticsForAllBlobs();
		}
		BlobStatisticsExport.asTabSeparatedValues(ctrl.topoBlobs);
	};
});