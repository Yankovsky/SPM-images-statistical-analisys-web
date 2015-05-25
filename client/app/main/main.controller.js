'use strict';

angular.module('spmApp').controller('MainCtrl', function() {
	var ctrl = this;
	ctrl.tabs = [
		{name: 'Topo matrix', state: 'app.topo-matrices'},
		{name: 'Filter matrix', state: 'app.filter-matrices'},
		{name: 'New topo matrix', state: 'app.new-topo-matrix'}/*,
		{name: 'Settings', state: 'app.settings'}*/
	];
});
