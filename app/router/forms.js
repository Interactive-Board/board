const application = require('express');
const applicationRouter = application.Router();
const sqlConnectionPool = require('../db');

const checkAuth = (request, response, next) => {
	if(!request.user) {
		response.redirect('/auth/login');
	} else {
		next();
	}
}

applicationRouter.get("/", checkAuth, async (request, response, next) => {
	response.setHeader("Content-Type", "text/plain");
	console.log(request.user);
	response.send(request.user.email);
});

module.exports = applicationRouter;
