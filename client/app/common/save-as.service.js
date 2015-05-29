'use strict';

angular.module('spmApp').factory('SaveAs', function() {
	var body = document.body;

	return function(fileName, data, type) {
		var blob = new Blob(data, {type: type});
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		body.appendChild(a);
		a.style.display = 'none';
		a.href = url;
		a.download = fileName;
		a.click();
		body.removeChild(a);
		URL.revokeObjectURL(url);
	};
});