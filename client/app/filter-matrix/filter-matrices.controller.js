'use strict';

angular.module('spmApp').controller('FilterMatricesCtrl', function($state, Upload, FilterMatrices) {
	var ctrl = this;

	ctrl.filterMatrices = FilterMatrices.index();

	function createSuccess(filterMatrix) {
		$state.go('app.filter-matrix', {id: filterMatrix._id});
	}

	ctrl.upload = function(files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var fileReader = new FileReader();
				fileReader.readAsText(file);
				/*jshint loopfunc: true */
				fileReader.onload = function(e) {
					FilterMatrices.create({
						name: file.name,
						data: e.target.result
					});
				};
			}
		}
	};

	ctrl.isSelected = FilterMatrices.isSelected;
	ctrl.select = FilterMatrices.select;
	ctrl.destroy = FilterMatrices.destroy;
	ctrl.clone = function(filterMatrix) {
		FilterMatrices.create(filterMatrix).success(createSuccess);
	};
	ctrl.create = function() {
		FilterMatrices.create({
			name: 'New filter matrix',
			data: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
		}).success(createSuccess);
	};
});