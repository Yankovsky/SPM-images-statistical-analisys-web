'use strict';

angular.module('spmApp').controller('TopoMatricesCtrl', function($http, $state, Upload, SelectedTopoMatrix) {
	var ctrl = this;

	$http.get('/api/topo-matrices').success(function(topoMatrices) {
		ctrl.topoMatrices = topoMatrices;
		if (!SelectedTopoMatrix.value._id) {
			selectFirst();
		}
	});

	function selectFirst() {
		SelectedTopoMatrix.value = ctrl.topoMatrices[0];
	}

	ctrl.isSelected = function(topoMatrix) {
		return topoMatrix._id === SelectedTopoMatrix.value._id;
	};

	ctrl.upload = function(files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var fileReader = new FileReader();
				fileReader.readAsText(file);
				/*jshint loopfunc: true */
				fileReader.onload = function(e) {
					$http.post('/api/topo-matrices', {
						name: file.name,
						data: e.target.result
					}).success(function(topoMatrix) {
						ctrl.topoMatrices.push(topoMatrix);
					});
				};
			}
		}
	};

	ctrl.select = function(topoMatrix) {
		SelectedTopoMatrix.value = topoMatrix;
	};

	ctrl.remove = function(topoMatrixToDelete) {
		$http.delete('/api/topo-matrices/' + topoMatrixToDelete._id).success(function() {
			var removedTopoMatrices = _.remove(ctrl.topoMatrices, function(topoMatrix) {
				return topoMatrix._id === topoMatrixToDelete._id;
			});
			if (ctrl.isSelected(removedTopoMatrices[0])) {
				selectFirst();
			}
		});
	};
});
