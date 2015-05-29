'use strict';

angular.module('spmApp').factory('BlobStatistics', function() {
	function getForOne(blob, matrixData) {
		if (!blob.max) {
			var max = Number.NEGATIVE_INFINITY;
			var iMax = blob.top + blob.height;
			var jMax = blob.left + blob.width;
			for (var i = blob.top; i < iMax; i++) {
				for (var j = blob.left; j < jMax; j++) {
					var value = matrixData[i][j];
					max = value > max ? value : max;
				}
			}
			blob.max = max;
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