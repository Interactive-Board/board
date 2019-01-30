const sqlConnectionPool = require('./db');
const application = require('express');
const applicationRouter = application.Router();

applicationRouter.get("/", async (request, response, next) => {
	response.setHeader("Content-Type", "application/json");

	if (request.method == "GET") {
		try {
			// TODO: change the input value '-1' to input from respone variable
			// This input parameter defines pagination (which IDs to load from X to X-10)
			// The first call SHOULD be -1, as this refers to 'defalt' and just grabs the last 10 entries
			let result = (await sqlConnectionPool.query("CALL board.get_directory (?)", [-1]))[0][0];
			result = JSON.stringify({ success: true, data: result });
			response.send(result);
			return;
		} catch (error) {
			error._requireJSON = true;

			// Trigger the error handler chain
			next(error);

			return;
		}
	} else if (request.method == "POST") {
		// Add news entry to DB

		// Respond with success or error
		//response.send(JSON.stringify({success: false, error: "Message"}));
		response.send(JSON.stringify({ success: true }));

		return;
	}

	// Unsupported method
	let error = new Error("405 Method Not Allowed");
	error.status = 405;
	error._method = request.method;
	error._originalPath = request.path;
	error._requireJSON = true;

	// Trigger the error handler chain
	next(error);
});

applicationRouter.get("/:singleID", async (request, response, next) => {
	response.setHeader("Content-Type", "application/json");

	if (request.method == "GET") {
		try {
			let id = parseInt(request.params.singleID);

			//Input value must be an integer
			if (!Number.isInteger(id)) {
				let error = new Error("400 Bad Request");
				error.status = 400;
				error._method = request.method;
				error._originalPath = request.path;
				error._requireJSON = true;

				next(error);
				return;
			}

			let result = (await sqlConnectionPool.query("CALL board.get_single_directory (?)", [id]))[0][0];
			result = JSON.stringify({ success: true, data: result });
			response.send(result);
			return;
		} catch (error) {
			error._requireJSON = true;

			// Trigger the error handler chain
			next(error);

			return;
		}
	} else if (request.method == "POST") {
		// Add news entry to DB

		// Respond with success or error
		//response.send(JSON.stringify({success: false, error: "Message"}));
		response.send(JSON.stringify({ success: true }));

		return;
	}

	// Unsupported method
	let error = new Error("405 Method Not Allowed");
	error.status = 405;
	error._method = request.method;
	error._originalPath = request.path;
	error._requireJSON = true;

	// Trigger the error handler chain
	next(error);
});

module.exports = applicationRouter;