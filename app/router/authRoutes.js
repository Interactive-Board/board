const application = require('express');
const applicationRouter = application.Router();
const sqlConnectionPool = require('../db');
const passport = require('passport');
const path = require('path');


//Login route
applicationRouter.get("/login", async (request, response, next) => {
	response.setHeader("Content-Type", "text/html");
	response.sendFile(path.resolve(__dirname + "/../static/mockup/") + "/login.html");
});

// Authenticate
applicationRouter.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}), async (request, response) => {
	if(!request.user) {
		console.log('here');
	} else {
		console.log('here2');
	}
});

// Callback route
applicationRouter.get('/google/redirect', passport.authenticate('google'), async (request, response) => {
	response.redirect('/forms');
});

module.exports = applicationRouter;