'use strict';

angular.module('spmApp').controller('TopoMatricesCtrl', function($state, Upload, TopoMatrices) {
	var ctrl = this;

	ctrl.topoMatrices = TopoMatrices.index();

	ctrl.upload = function(files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var fileReader = new FileReader();
				fileReader.readAsText(file);
				/*jshint loopfunc: true */
				fileReader.onload = function(e) {
					TopoMatrices.create({
						name: file.name,
						data: e.target.result
					});
				};
			}
		}
	};

	ctrl.isSelected = TopoMatrices.isSelected;
	ctrl.select = TopoMatrices.select;
	ctrl.destroy = TopoMatrices.destroy;
});
