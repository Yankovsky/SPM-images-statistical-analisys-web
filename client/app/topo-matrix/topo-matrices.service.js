'use strict';

angular.module('spmApp').factory('TopoMatrices', function($http, localStorageService) {
	var topoMatrices, selectedTopoMatrix;

	function select(topoMatrix) {
		selectedTopoMatrix = topoMatrix;
		localStorageService.set('selectedTopoMatrixId', topoMatrix && topoMatrix._id);
	}

	function isSelected(topoMatrix) {
		return topoMatrix == selectedTopoMatrix;
	}

	return {
		init: function() {
			return $http.get('/api/topo-matrices').success(function(topoMatricesFromServer) {
				topoMatrices = topoMatricesFromServer;
				var idFromLocalStorage = localStorageService.get('selectedTopoMatrixId');
				select(idFromLocalStorage && _.find(topoMatrices, function(topoMatrix) {
					return topoMatrix._id == idFromLocalStorage
				}) || topoMatrices[0]);
			})
		},
		getSelected: function() {
			return selectedTopoMatrix;
		},
		isSelected: isSelected,
		select: select,
		index: function() {
			return topoMatrices;
		},
		show: function(topoMatrixId) {
			return _.find(topoMatrices, function(topoMatrix) {
				return topoMatrix._id == topoMatrixId;
			})
		},
		create: function(topoMatrix) {
			return $http.post('/api/topo-matrices', topoMatrix).success(function(topoMatrix) {
				topoMatrices.push(topoMatrix);
				if (!selectedTopoMatrix) {
					select(topoMatrix);
				}
			});
		},
		update: function(topoMatrix) {
			return $http.put('/api/topo-matrices/' + topoMatrix._id, topoMatrix);
		},
		destroy: function(topoMatrixToDestroy) {
			return $http.delete('/api/topo-matrices/' + topoMatrixToDestroy._id).success(function() {
				var removedTopoMatrices = _.remove(topoMatrices, function(topoMatrix) {
					return topoMatrix._id === topoMatrixToDestroy._id;
				});
				if (isSelected(removedTopoMatrices[0])) {
					select(topoMatrices[0]);
				}
			});
		}
	}
});