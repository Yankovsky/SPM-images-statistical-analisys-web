exports.show = function(req, res) {
	TopoMatrix.findById(req.params.id, function (err, topoMatrix) {
		if(err) { return handleError(res, err); }
		if(!topoMatrix) { return res.send(404); }
		return res.json(topoMatrix);
	});
};
