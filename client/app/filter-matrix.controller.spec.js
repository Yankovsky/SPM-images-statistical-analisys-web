'use strict';

describe('Controller: FilterMatricesCtrl', function () {

  // load the controller's module
  beforeEach(module('spmApp'));
  beforeEach(module(function($urlRouterProvider ) {
    $urlRouterProvider.deferIntercept();
  }));

  var FilterMatricesCtrl,
      $httpBackend,
      data = [{name: 'Filter matrix', data: [[1, 2], [3, 4]]}];

  // Initialize the controller
  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/filter-matrices')
      .respond(data);

    FilterMatricesCtrl = $controller('FilterMatricesCtrl');
  }));

  it('should attach a list of filter matrices to the ctrl instance', function () {
    $httpBackend.flush();
    expect(FilterMatricesCtrl.filterMatrices.length).toBe(1);
    expect(FilterMatricesCtrl.filterMatrices).toEqual(data);
  });
});
