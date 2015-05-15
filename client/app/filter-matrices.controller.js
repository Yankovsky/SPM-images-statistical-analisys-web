'use strict';

angular.module('spmApp').controller('FilterMatricesCtrl', function($http, $state, Upload, SelectedFilterMatrix) {
	var ctrl = this;

	$http.get('/api/filter-matrices').success(function(filterMatrices) {
		ctrl.filterMatrices = filterMatrices;
		if (!SelectedFilterMatrix._id) {
			selectFirst();
		}
	});

	function createSuccess(filterMatrix) {
		$state.go('filter-matrix', {id: filterMatrix._id});
	}

	function selectFirst() {
		SelectedFilterMatrix.value = ctrl.filterMatrices[0];
	}

	ctrl.isSelected = function(filterMatrix) {
		return filterMatrix._id === SelectedFilterMatrix.value._id;
	};

	ctrl.upload = function(files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var fileReader = new FileReader();
				fileReader.readAsText(file);
				/*jshint loopfunc: true */
				fileReader.onload = function(e) {
					var data = _.map(e.target.result.split('\n'), function(row) {
						return _.map(row.split(' '), function(cell) {
							return +cell;
						});
					});
					$http.post('/api/filter-matrices', {
						name: file.name,
						data: data
					}).success(function(filterMatrix) {
						ctrl.filterMatrices.push(filterMatrix);
					});
				};
			}
		}
	};

	ctrl.select = function(filterMatrix) {
		SelectedFilterMatrix.value = filterMatrix;
	};

	ctrl.remove = function(filterMatrixToDelete) {
		$http.delete('/api/filter-matrices/' + filterMatrixToDelete._id).success(function() {
			var removedFilterMatrices = _.remove(ctrl.filterMatrices, function(filterMatrix) {
				return filterMatrix._id === filterMatrixToDelete._id;
			});
			if (ctrl.isSelected(removedFilterMatrices[0])) {
				selectFirst();
			}
		});
	};

	ctrl.clone = function(filterMatrix) {
		$http.post('/api/filter-matrices', {
			name: filterMatrix.name + ' copy',
			data: filterMatrix.data
		}).success(createSuccess);
	};

	ctrl.create = function() {
		$http.post('/api/filter-matrices', {
			name: 'New filter matrix',
			data: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
		}).success(createSuccess);
	};

	ctrl.save = function() {
		$http.put('/api/filter-matrices/' + ctrl.selectedFilterMatrix._id, ctrl.selectedFilterMatrix).success(function() {
			window.alert('Saved');
		});
	};
});
