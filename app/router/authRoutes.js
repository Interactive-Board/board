const application = require('express');
const applicationRouter = application.Router();
const sqlConnectionPool = require('../db');
const passport = require('passport');


//Login route
applicationRouter.get("/login", async (request, response, next) => {
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

// Authenticate
applicationRouter.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

// Callback route
applicationRouter.get('/google/redirect', passport.authenticate('google'), async (request, response) => {
	response.send('callback');
});

module.exports = applicationRouter;