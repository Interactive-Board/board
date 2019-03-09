const application = require('express');
const applicationRouter = application.Router();
const sqlConnectionPool = require('../db');
const path = require('path');

var static = path.resolve(__dirname + "/../static/mockup");

const checkAuth = (request, response, next) => {
	if(!request.user) {
		response.redirect('/auth/login');
	} else {
		next();
	}
}

applicationRouter.get("/", checkAuth, async (request, response, next) => {
	response.setHeader("Content-Type", "text/html");
	response.send(request.user.email);
});

module.exports = applicationRouter;
