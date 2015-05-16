'use strict';

angular.module('spmApp').factory('FilterMatrices', function($http, localStorageService) {
	var filterMatrices, selectedFilterMatrix;

	function select(filterMatrix) {
		selectedFilterMatrix = filterMatrix;
		if (filterMatrix) {
			localStorageService.set('selectedFilterMatrixId', filterMatrix._id);
		}
	}

	function isSelected(filterMatrix) {
		return filterMatrix == selectedFilterMatrix;
	}

	return {
		init: function() {
			return $http.get('/api/filter-matrices').success(function(filterMatricesFromServer) {
				filterMatrices = filterMatricesFromServer;
				var idFromLocalStorage = localStorageService.get('selectedFilterMatrixId');
				select(idFromLocalStorage && _.find(filterMatrices, function(filterMatrix) {
					return filterMatrix._id == idFromLocalStorage
				}) || filterMatrices[0]);
			})
		},
		getSelected: function() {
			return selectedFilterMatrix;
		},
		isSelected: isSelected,
		select: select,
		index: function() {
			return filterMatrices;
		},
		show: function(filterMatrixId) {
			return _.find(filterMatrices, function(filterMatrix) {
				return filterMatrix._id == filterMatrixId;
			})
		},
		create: function(filterMatrix) {
			return $http.post('/api/filter-matrices', {
				name: filterMatrix.name + ' copy',
				data: filterMatrix.data
			}).success(function(filterMatrix) {
				filterMatrices.push(filterMatrix);
				if (!selectedFilterMatrix) {
					select(filterMatrix);
				}
			});
		},
		update: function(filterMatrix) {
			return $http.put('/api/filter-matrices/' + filterMatrix._id, filterMatrix);
		},
		destroy: function(filterMatrixToDestroy) {
			return $http.delete('/api/filter-matrices/' + filterMatrixToDestroy._id).success(function() {
				var removedFilterMatrices = _.remove(filterMatrices, function(filterMatrix) {
					return filterMatrix._id === filterMatrixToDestroy._id;
				});
				if (isSelected(removedFilterMatrices[0])) {
					select(filterMatrices[0]);
				}
			});
		}
	}
});