'use strict';

angular.module('spmApp').controller('NewTopoMatrixCtrl', function(TopoMatrices, FilterMatrices, NewTopoMatrix, MatrixImage) {
	var ctrl = this;
	ctrl.topoMatrix = TopoMatrices.getSelected();
	ctrl.newTopoMatrix = NewTopoMatrix();
	ctrl.MatrixImage = MatrixImage;
});