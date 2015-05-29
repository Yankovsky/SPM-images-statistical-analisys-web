'use strict';

angular.module('spmApp').factory('BlobStatisticsExport', function(SaveAs) {
	var header = ['#', 'X', 'Y', 'Width', 'Height', 'Max difference', 'Neighbor distance'].join('\t') + '\n';

	return {
		asTabSeparatedValues: function(blobs) {
			var data = _.map(blobs, function(blob, i) {
				return [i + 1, blob.center.x, blob.center.y, blob.realWidth, blob.realHeight, blob.maxDifference, blob.distanceToNearestNeighbor].join('\t');
			}).join('\n');
			SaveAs('spm.txt', [header, data], 'text/plain');
		}
	};
});