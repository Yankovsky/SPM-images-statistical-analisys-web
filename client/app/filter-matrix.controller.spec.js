'use strict';

describe('Controller: FilterMatrixCtrl', function () {

  // load the controller's module
  beforeEach(module('spmApp'));

  var FilterMatrixCtrl,
      $httpBackend,
      data = [{name: 'Filter matrix', data: [[1, 2], [3, 4]]}];

  // Initialize the controller
  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/filter-matrices')
      .respond(data);

    FilterMatrixCtrl = $controller('FilterMatrixCtrl');
  }));

  it('should attach a list of filter matrices to the ctrl instance', function () {
    $httpBackend.flush();
    expect(FilterMatrixCtrl.filterMatrices.length).toBe(1);
    expect(FilterMatrixCtrl.filterMatrices).toEqual(data);
  });
});
