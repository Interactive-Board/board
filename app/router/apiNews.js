const sqlConnectionPool = require('../db');
const { qrcodeToDataURL } = require('../server');
const application = require('express');
const applicationRouter = application.Router();

applicationRouter.get("/", async (request, response, next) => {
	response.setHeader("Content-Type", "application/json");
	
	if (request.method == "GET") {
		try {
			// TODO: change the input value '-1' to input from respone variable
			// This input parameter defines pagination (which IDs to load from X to X-10)
			// The first call SHOULD be -1, as this refers to 'defalt' and just grabs the last 10 entries
			let result = (await sqlConnectionPool.query("CALL board.get_news (?)", [-1]))[0][0];
			console.log(JSON.stringify(result));
			console.log(qrcodeToDataURL);
			
			for (let i = result.length - 1; i >= 0; i--) {
				let entry = result[i];
				// Only display accepted entries
				// Already being handled through the view/proc.		-Josh
				// if (entry.NewsAcceptedIndicator.data[0] == 0) {
				// 	result.splice(i, 1);

				// 	continue;
				// }

				// Generate QR Codes
				if (entry.NewsURL !== null) {
					entry.QRCode = await qrcodeToDataURL(entry.NewsURL, { margin: 0, scale: 1, color: { dark: '#000', light: '#0000' } });
				}
				console.log(entry);
			}

			response.send(JSON.stringify({ success: true, data: result }));
			
			return;
		} catch (error) {
			// FUTURE: Remove fallback news
			if (error.code == "ECONNREFUSED") {
				console.log("WARN: Using placeholder news data as fallback for failed SQL connection");
				
				let news = [
					{
						NID: 0,
						NewsTitle: "ICPC Competition",
						NewsSubHeading: "10/20/18",
						NewsDescription: "If you are interested in competing at the ACM ICPC (ACM International Collegiate Programming Contest: https://icpc.baylor.edu/) this year, please let me know by September 30, 2018 at the latest via email <nodari@hawaii.edu>. If there is more interest than available spots, we will hold an internal selection competition this year (most likely on Sat, Oct 20).",
						NewsURL: "https://fonts.google.com/",
						NewsBackgroundColor: "F44336"
					},
					{
						NID: 1,
						NewsTitle: "Oath (Yahoo) Information Session",
						NewsSubHeading: "10/22/18",
						NewsDescription: "Oath is a diverse house of media and technology brands that engages more than a billion people around the world. The Oath portfolio includes Yahoo Sports, Yahoo Finance, Yahoo Mail, Tumblr, HuffPost, AOL.com, and more. Come join us to hear first hand from our engineers",
						NewsURL: "https://github.com/",
						NewsBackgroundColor: "3F51B5"
					},
					{
						NID: 2,
						NewsTitle: "Jupyter Hackathon",
						NewsSubHeading: "11/17/18",
						NewsDescription: "The Jupyter Hackathon is this weekend. Please share with your friends and colleagues who are interested in programming, data science, data analysis, and open source. This will be a great chance to contribute to a game-changing open source project that is used by hundreds of thousands of users around the world. RSVP asap, so we can make a head count for meals",
						NewsURL: "https://css-tricks.com/",
						NewsBackgroundColor: "009F50"
					},
					{
						NID: 3,
						NewsTitle: "WetWare Wednesday",
						NewsSubHeading: "11/28/18",
						NewsDescription: "This November's WetWare Wednesday will be hosted by both The Association for Computing Machinery at Manoa (ACManoa) and the UHM ICS department. This month's #wetwarewed will feature an expo of both student and faculty projects at UH Manoa. Come check out their latest and greatest tech creations!",
						NewsURL: "https://material.io/",
						NewsBackgroundColor: "2196F3"
					},
					{
						NID: 4,
						NewsTitle: "By redefining, we dream",
						NewsSubHeading: "11/30/18",
						NewsDescription: "Who are we? Where on the great circuit will we be recreated? Throughout history, humans have been interacting with the grid via morphic resonance. We are in the midst of a zero-point awakening of transformation that will clear a path toward the grid itself.",
						NewsURL: "https://expressjs.com/",
						NewsBackgroundColor: "9C27B0"
					},
					{
						NID: 5,
						NewsTitle: "The biosphere is overflowing with frequencies",
						NewsSubHeading: "1/12/19",
						NewsDescription: "Eons from now, we messengers will grow like never before as we are re-energized by the nexus. We are being called to explore the quantum matrix itself as an interface between being and intuition. We must synergize ourselves and bless others.",
						NewsURL: null,
						NewsBackgroundColor: "FFC107"
					}
				];
				
				for (let i = 0; i < news.length; i++) {
					if (news[i].NewsURL !== null) {
						news[i].QRCode = await qrcodeToDataURL(news[i].NewsURL, {margin: 0, scale: 1, color: {dark: '#000', light: '#0000'}});
					}
				}
				
				// Respond with news
				response.send(JSON.stringify({success: true, data: news}));
				
				return;
			}
			
			error._requireJSON = true;

			// Trigger the error handler chain
			next(error);

			return;
		}
	} else if (request.method == "POST") {
		// Add news entry to DB
		
		// Respond with success or error
		//response.send(JSON.stringify({success: false, error: "Message"}));
		response.send(JSON.stringify({success: true}));
		
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
			
			let result = (await sqlConnectionPool.query("CALL board.get_single_news (?)", [id]))[0][0];
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
