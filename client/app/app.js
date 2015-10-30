'use strict';

angular.module('spmApp', [
	'LocalStorageModule',
	'ngFileUpload',
	'ya.nouislider',
	'ui.router',
	'ui.bootstrap',
	'angular-loading-bar',
	'ngAnimate',
	'ngFlash'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('app', {
			template: '<ui-view></ui-view>',
			abstract: true,
			resolve: {
				filterMatrices: function(FilterMatrices) {
					return FilterMatrices.init();
				},
				topoMatrices: function(TopoMatrices) {
					return TopoMatrices.init();
				}
			}
		})
		.state('app.topo-matrices', {
			url: '/',
			templateUrl: 'app/topo-matrix/topo-matrices.html',
			controller: 'TopoMatricesCtrl as topoMatricesCtrl'
		})
		.state('app.topo-matrix', {
			url: '/topo-matrices/:id',
			templateUrl: 'app/topo-matrix/topo-matrix.html',
			controller: 'TopoMatrixCtrl as topoMatrixCtrl'
		})
		.state('app.filter-matrices', {
			url: '/filter-matrices',
			templateUrl: 'app/filter-matrix/filter-matrices.html',
			controller: 'FilterMatricesCtrl as filterMatricesCtrl'
		})
		.state('app.filter-matrix', {
			url: '/filter-matrices/:id',
			templateUrl: 'app/filter-matrix/filter-matrix.html',
			controller: 'FilterMatrixCtrl as filterMatrixCtrl'
		})
		.state('app.new-topo-matrix', {
			url: '/new-topo-matrix',
			templateUrl: 'app/new-topo-matrix/new-topo-matrix.html',
			controller: 'NewTopoMatrixCtrl as newTopoMatrixCtrl'
		})
		.state('app.about', {
			url: '/about',
			templateUrl: 'app/about/about.html'
		});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
});