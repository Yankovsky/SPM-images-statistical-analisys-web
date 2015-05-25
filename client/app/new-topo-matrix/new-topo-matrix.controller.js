'use strict';

angular.module('spmApp').controller('NewTopoMatrixCtrl', function(TopoMatrices, FilterMatrices, NewTopoMatrix, MatrixImage, Settings, BlobStatistics) {
	var ctrl = this;
	var filterMatrix = FilterMatrices.getSelected();
	var filterMatrixSizeDividedByTwo = Math.floor(filterMatrix.data.length / 2);
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
		ctrl.topoBlobs = _.map(ctrl.newTopoBlobs, function(blob) {
			return {
				width: blob.width,
				height: blob.height,
				left: blob.left + filterMatrixSizeDividedByTwo,
				top: blob.top + filterMatrixSizeDividedByTwo
			};
		});
	});

	ctrl.horizontalLayout = Settings.horizontalLayout();
	ctrl.setHorizontalLayout = function() {
		Settings.horizontalLayout(ctrl.horizontalLayout);
	};

	ctrl.findBlobsDynamically = Settings.findBlobsDynamically();
	ctrl.setFindBlobsDynamically = function() {
		if (ctrl.findBlobsDynamically) {
			ctrl.findBlobs();
		} else {
			ctrl.newTopoBlobs = [];
			ctrl.topoBlobs = [];
		}
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
		if (ctrl.findBlobsDynamically) {
			ctrl.findBlobs();
		} else {
			ctrl.newTopoBlobs = [];
			ctrl.topoBlobs = [];
		}
	};
	ctrl.calculateNewTopoMatricesImagesData();

	ctrl.calculateStatisticsForBlob = function(blob) {
		if (!blob.max) {
			var max = Number.NEGATIVE_INFINITY;
			var iMax = blob.top + blob.height;
			var jMax = blob.left + blob.width;
			for (var i = blob.top; i < iMax; i++) {
				for (var j = blob.left; j < jMax; j++) {
					var value = ctrl.topoMatrix.data.value[i][j];
					max = value > max ? value : max;
				}
			}
			blob.max = max;
			blob.center = {
				x: blob.left + blob.width / 2,
				y: blob.top + blob.height / 2
			};
		}
	};

	ctrl.calculateStatisticsForAllBlobs = function() {
		var topoBlobsLength = ctrl.topoBlobs.length;
		for (var i = 0; i < topoBlobsLength; i++) {
			var blob = ctrl.topoBlobs[i];
			ctrl.calculateStatisticsForBlob(blob);
			blob.distanceToNearestNeighbor = Number.POSITIVE_INFINITY;
			for (var j = 0; j < i; j++) {
				var otherBlob = ctrl.topoBlobs[j];
				var xPart = otherBlob.center.x - blob.center.x;
				var yPart = otherBlob.center.y - blob.center.y;
				var distance = xPart * xPart + yPart * yPart;
				blob.distanceToNearestNeighbor = distance < blob.distanceToNearestNeighbor ? distance : blob.distanceToNearestNeighbor;
				otherBlob.distanceToNearestNeighbor = distance < otherBlob.distanceToNearestNeighbor ? distance : otherBlob.distanceToNearestNeighbor;
			}
		}
		for (var i = 0; i < topoBlobsLength; i++) {
			var blob = ctrl.topoBlobs[i];
			blob.distanceToNearestNeighbor = Math.sqrt(blob.distanceToNearestNeighbor);
		}
	};
});