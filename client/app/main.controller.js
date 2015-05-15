'use strict';

angular.module('spmApp').controller('MainCtrl', function() {
	var ctrl = this;
	ctrl.tabs = [
		{name: 'Topo matrix', state: 'topo-matrix'},
		{name: 'Filter matrix', state: 'filter-matrices'},
		{name: 'New topo matrix', state: 'new-topo-matrix'},
		{name: 'Settings', state: 'settings'}
	];
});
