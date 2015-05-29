'use strict';

angular.module('spmApp').factory('BlobStatisticsExport', function(SaveAs) {
	var header = ['X', 'Y', 'Width', 'Height', 'Max', 'Neighbor'].join('\t') + '\n';

	return {
		asTabSeparatedValues: function(blobs) {
			var data = _.map(blobs, function(blob) {
				return [blob.center.x, blob.center.y, blob.width, blob.height, blob.max, blob.distanceToNearestNeighbor].join('\t');
			}).join('\n');
			SaveAs('spm.txt', [header, data], 'text/plain');
		}
	};
});