const application = require('express');
const applicationRouter = application.Router();
const sqlConnectionPool = require('../db');
const path = require('path');

var static = path.resolve(__dirname + '/../static/mockup');

const checkAuth = (request, response, next) => {
	if(!request.user) {
		response.redirect('/auth/login');
	} else {
		next();
	}
}

applicationRouter.get('/', checkAuth, async (request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	response.sendFile(path + '/');
});

//Posts
applicationRouter.post('/formNews', checkAuth, async (request, response, next) => {
	let postType = request.body.postType;
	let userID = request.user.id;
	let title = request.body.title;
	let subheading = request.body.subheading;
	let description = request.body.description;
	let url = request.body.url;
	let imagereference = request.body.imagereference;
	let bgcolor = request.body.bgcolor;
	let newsAccepted = 1; //Should always be 1 at this point since everything is manually inputted through the administrator

	try {
		if (postType.toUpperCase() == "INSERT") {
			await sqlConnectionPool.query("CALL board.insert_news (?,?,?,?,?,?,?,?)", [userID, title, subheading, description, url, imagereference, bgcolor, newsAccepted]);
			response.send('completed');
		} else if (postType.toUpperCase() == "UPDATE") {
			let newsid = request.body.newsid;
			await sqlConnectionPool.query("CALL board.insert_news (?,?,?,?,?,?,?,?,?)", [newsid, userID, title, subheading, description, url, imagereference, bgcolor, newsAccepted]);
			response.send('completed');
		}
		return;
	} catch (error) {
		//TODO add defaults?

		error._requireJSON = true;

		// Trigger the error handler chain
		next(error);

		return;
	}
});


//Views for forms
/*
applicationRouter.get('/formsNews', checkAuth, async (request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	//response.sendFile(path + '/news');
});

applicationRouter.get('/formsAlumni', checkAuth, async (request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	//response.sendFile(path + '/alumni');
});

applicationRouter.get('/formsRecognitions', checkAuth, async (request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	//response.sendFile(path + '/recognitions');
});

applicationRouter.get('/formsDirectory', checkAuth, async (request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	//response.sendFile(path + '/directory');
});

applicationRouter.get('/formsPublications', checkAuth, async (request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	//response.sendFile(path + '/publications');
});
*/

module.exports = applicationRouter;
