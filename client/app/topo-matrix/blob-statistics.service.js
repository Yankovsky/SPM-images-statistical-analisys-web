'use strict';

angular.module('spmApp').factory('BlobStatistics', function() {
	function getForOne(blob, matrixData) {
		if (!blob.maxDifference) {
			var matrixDataSize = matrixData.length - 1;
			var min = Number.POSITIVE_INFINITY;
			var max = Number.NEGATIVE_INFINITY;
			var iMin = Math.max(blob.top, 0);
			var iMax = Math.min(blob.top + blob.height, matrixDataSize);
			var jMin = Math.max(blob.left, 0);
			var jMax = Math.min(blob.left + blob.width, matrixDataSize);
			for (var i = iMin; i < iMax; i++) {
				for (var j = jMin; j < jMax; j++) {
					var value = matrixData[i][j];
					min = value < min ? value : min;
					max = value > max ? value : max;
				}
			}
			blob.maxDifference = max - min;
			blob.center = {
				x: blob.left + blob.width / 2,
				y: blob.top + blob.height / 2
			};
		}
	}

	function getForAll(blobs, matrixData) {
		var topoBlobsLength = blobs.length;
		for (var i = 0; i < topoBlobsLength; i++) {
			var blob = blobs[i];
			getForOne(blob, matrixData);
			blob.distanceToNearestNeighbor = Number.POSITIVE_INFINITY;
			for (var j = 0; j < i; j++) {
				var otherBlob = blobs[j];
				var xPart = otherBlob.center.x - blob.center.x;
				var yPart = otherBlob.center.y - blob.center.y;
				var distance = xPart * xPart + yPart * yPart;
				blob.distanceToNearestNeighbor = distance < blob.distanceToNearestNeighbor ? distance : blob.distanceToNearestNeighbor;
				otherBlob.distanceToNearestNeighbor = distance < otherBlob.distanceToNearestNeighbor ? distance : otherBlob.distanceToNearestNeighbor;
			}
		}
		_.each(blobs, function(blob) {
			blob.distanceToNearestNeighbor = Math.sqrt(blob.distanceToNearestNeighbor);
		});
	}

	return {
		getForOne: getForOne,
		getForAll: getForAll
	};
});