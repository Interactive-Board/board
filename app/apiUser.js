const application = require('express');
const applicationRouter = application.Router();

applicationRouter.get("/:userID", async (request, response, next) => {
	response.setHeader("Content-Type", "text/plain");
	
	/*
	if (check if request is malformed) {
		let error = new Error("400 Bad Request");
		error.status = 400;
		error._method = request.method;
		error._originalPath = request.path;
		
		// Trigger the error handler chain
		next(error);
		
		return;
	}
	*/
	
	// Get data on specified user
	//let data = getSomeData(request.params.userID);
	
	// Report some data
	//response.send(JSON.stringify(data));
});

module.exports = applicationRouter;
