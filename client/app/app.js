'use strict';

angular.module('spmApp', [
	'ngFileUpload',
	'ui.router',
	'ui.bootstrap',
	'angular-loading-bar',
	'ngAnimate'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('topo-matrices', {
			url: '/',
			templateUrl: 'app/topo-matrices.html',
			controller: 'TopoMatricesCtrl as topoMatricesCtrl'
		})
		.state('topo-matrix', {
			url: '/topo-matrices/:id',
			templateUrl: 'app/topo-matrix.html',
			controller: 'TopoMatrixCtrl as topoMatrixCtrl'
		})
		.state('filter-matrices', {
			url: '/filter-matrices',
			templateUrl: 'app/filter-matrices.html',
			controller: 'FilterMatricesCtrl as filterMatricesCtrl'
		})
		.state('filter-matrix', {
			url: '/filter-matrices/:id',
			templateUrl: 'app/filter-matrix.html',
			controller: 'FilterMatrixCtrl as filterMatrixCtrl'
		})
		.state('new-topo-matrix', {
			url: '/new-topo-matrix',
			templateUrl: 'app/new-topo-matrix.html',
			controller: 'NewTopoMatrixCtrl as newTopoMatrixCtrl'
		})
		.state('settings', {
			url: '/settings',
			templateUrl: 'app/settings.html',
			controller: 'SettingsCtrl as settingsCtrl'
		});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
});