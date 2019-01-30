const application = require('express');
const applicationRouter = application.Router();

applicationRouter.get("/", async (request, response, next) => {
	response.setHeader("Content-Type", "application/json");
	if (request.method == "GET") {
		try {
			// TODO: change the input value '-1' to input from respone variable
			// This input parameter defines pagination (which IDs to load from X to X-10)
			// The first call SHOULD be -1, as this refers to 'defalt' and just grabs the last 10 entries
			let result = (await sqlConnectionPool.query("CALL board.get_publications (?)", [-1]))[0][0];
			result = JSON.stringify({ success: true, data: result });
			response.send(result);
			return;
		} catch(error) {
			//TODO add defaults?

			error._requireJSON = true;

			// Trigger the error handler chain
			next(error);

			return;
		}
	}
});

module.exports = applicationRouter;