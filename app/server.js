console.log("\r---------------------INTERACTIVE BOARD SERVER---------------------");

const Directory = {};
Directory.SELF = __dirname + "/";
Directory.INCLUDE = Directory.SELF + "include/";
Directory.STATIC = Directory.SELF + "static/";
Directory.TEMPLATE = Directory.SELF + "template/";
const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const application = require("express")();
const http = require("http");
const https = require("https");
const server = http.createServer(application);
const fs = require("fs");
const handlebars = require("handlebars");
const qrcode = require("qrcode");
// Promisify qrcode.toDataURL
const qrcodeToDataURL = (text, options) => {
	return new Promise((resolve, reject) => {
		qrcode.toDataURL(text, options, (error, url) => {
			if (error) {
				reject(error);
			} else {
				resolve(url);
			}
		});
	});
};
const mysql = require("mysql2/promise");
const utility = require(Directory.INCLUDE + "utility.js");
const ServerError = require(Directory.INCLUDE + "ServerError.js");

const listenPort = process.env.PORT || 8080; // 3000;
const listenAddress = "0.0.0.0";

let sqlConnectionPool;

// Initialization
(() => {
	// TODO: Read real values from a config file
	let mysqlConfig = {
		host: "127.0.0.1",
		port: 3306,
		user: "root",
		password: "password",
		database: "board",
		pools: {
			connectionLimit: 10
		}
	};
	
	sqlConnectionPool = mysql.createPool({
		host: mysqlConfig.host,
		user: mysqlConfig.user,
		password: mysqlConfig.password,
		database: mysqlConfig.database,
		waitForConnections: true,
		connectionLimit: mysqlConfig.pools.connectionLimit,
		queueLimit: 0
	});
})();

// Add headers
application.use(async (request, response, next) => {
	// Request methods you wish to allow
	response.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS.join(", "));
	
	// Pass to next layer of middleware
	next();
});

// APPLICATION ROUTES
application.get("/", async (request, response) => {
	// Redirect to /mockup/slide
	// This is to emphasize that whatever is displayed is a mockup, and not intended to represent the final product
	
	// Send a 307 Temporary Redirect
	response.status(307);
	response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
	response.setHeader("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
	response.setHeader("Location", "/mockup/slide");
	response.send("");
});
//application.get("/", async (request, response) => {
//	response.sendFile(Directory.STATIC + "/mockup/slide.html");
//});
//application.get("/news", async (request, response) => {
//	response.sendFile(Directory.STATIC + "/mockup/news.html");
//});
//application.get("/publications", async (request, response) => {
//	response.sendFile(Directory.STATIC + "/mockup/publications.html");
//});
//application.get("/publicationdetails/:pubID", async (request, response) => {
//	//Use request.params.pubID and extract data from the table. For now, we're just going to return the page
//	console.log(request.params.pubID)
//	response.sendFile(Directory.STATIC + "/mockup/publication_details.html");
//});

// API ROUTES
application.get("/api/news", async (request, response, next) => {
	response.setHeader("Content-Type", "text/plain");
	
	if (request.method == "GET") {
		try {
			let result = (await sqlConnectionPool.query("SELECT * FROM board.view_news"))[0];
			
			for (let i = result.length - 1; i >= 0; i--) {
				// Only display accepted entries
				if (entry.NewsAcceptedIndicator.data[0] == 0) {
					result.splice(i, 1);
					
					continue;
				}
				
				// Generate QR Codes
				if (entry.NewsURL !== null) {
					entry.QRCode = await qrcodeToDataURL(entry.NewsURL, {margin: 0, scale: 1, color: {dark: '#000', light: '#0000'}});
				}
			}
			
			result = JSON.stringify({success: true, data: result});
			console.log(result);
			response.send(result);
			
			return;
		} catch (error) {
			if (error.code == "ECONNREFUSED") {
				console.log("WARN: Using placeholder news data as fallback for failed SQL connection");
				
				let news = [
					{
						NID: 0,
						NewsTitle: "ICPC Competition",
						NewsSubheading: "10/20/18",
						NewsDescription: "If you are interested in competing at the ACM ICPC (ACM International Collegiate Programming Contest: https://icpc.baylor.edu/) this year, please let me know by September 30, 2018 at the latest via email <nodari@hawaii.edu>. If there is more interest than available spots, we will hold an internal selection competition this year (most likely on Sat, Oct 20).",
						NewsURL: "https://fonts.google.com/",
						NewsImageColor: "F44336"
					},
					{
						NID: 1,
						NewsTitle: "Oath (Yahoo) Information Session",
						NewsSubheading: "10/22/18",
						NewsDescription: "Oath is a diverse house of media and technology brands that engages more than a billion people around the world. The Oath portfolio includes Yahoo Sports, Yahoo Finance, Yahoo Mail, Tumblr, HuffPost, AOL.com, and more. Come join us to hear first hand from our engineers",
						NewsURL: "https://github.com/",
						NewsImageColor: "3F51B5"
					},
					{
						NID: 2,
						NewsTitle: "Jupyter Hackathon",
						NewsSubheading: "11/17/18",
						NewsDescription: "The Jupyter Hackathon is this weekend. Please share with your friends and colleagues who are interested in programming, data science, data analysis, and open source. This will be a great chance to contribute to a game-changing open source project that is used by hundreds of thousands of users around the world. RSVP asap, so we can make a head count for meals",
						NewsURL: "https://css-tricks.com/",
						NewsImageColor: "009F50"
					},
					{
						NID: 3,
						NewsTitle: "WetWare Wednesday",
						NewsSubheading: "11/28/18",
						NewsDescription: "This November's WetWare Wednesday will be hosted by both The Association for Computing Machinery at Manoa (ACManoa) and the UHM ICS department. This month's #wetwarewed will feature an expo of both student and faculty projects at UH Manoa. Come check out their latest and greatest tech creations!",
						NewsURL: "https://material.io/",
						NewsImageColor: "2196F3"
					},
					{
						NID: 4,
						NewsTitle: "By redefining, we dream",
						NewsSubheading: "11/30/18",
						NewsDescription: "Who are we? Where on the great circuit will we be recreated? Throughout history, humans have been interacting with the grid via morphic resonance. We are in the midst of a zero-point awakening of transformation that will clear a path toward the grid itself.",
						NewsURL: "https://expressjs.com/",
						NewsImageColor: "9C27B0"
					},
					{
						NID: 5,
						NewsTitle: "The biosphere is overflowing with frequencies",
						NewsSubheading: "1/12/19",
						NewsDescription: "Eons from now, we messengers will grow like never before as we are re-energized by the nexus. We are being called to explore the quantum matrix itself as an interface between being and intuition. We must synergize ourselves and bless others.",
						NewsURL: null,
						NewsImageColor: "FFC107"
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
application.get("/api/user/:userID", async (request, response, next) => {
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

// Catch 405 errors
// Supported methods are in ALLOWED_METHODS
application.use(async (request, response, next) => {
	// Filter for methods
	if (ALLOWED_METHODS.indexOf(request.method) > -1) {
		// Pass the request down the chain
		next();
		
		return;
	}
	
	let error = new Error("405 Method Not Allowed");
	error.status = 405;
	error._method = request.method;
	error._originalPath = request.path;
	
	// Trigger the error handler chain
	next(error);
});

// Attempt to serve any file
application.use(async (request, response, next) => {
	let path = request.path;
	// Removes the leading slash
	let internalPath = Directory.STATIC + path.substring("/".length);
	
	if (path.charAt(path.length - 1) == "/") {
		// Try to route to an index if the request is for a directory
		internalPath += "index";
	}
	
	// Look for a file with the same path but with the .html extension appended
	// This allows /test to point to /test.html
	fs.access(internalPath + ".html", fs.constants.R_OK, (error) => {
		if (error) {
			// Look for the explicit file
			fs.access(internalPath, fs.constants.R_OK, (error) => {
				if (error) {
					let httpError = new Error("404 Not Found");
					httpError.status = 404;
					httpError._errorObject = error;
					httpError._method = request.method;
					httpError._originalPath = request.path;
					httpError._impliedPath = path;
					httpError._internalPath = internalPath;

					// Trigger the error handler chain
					next(httpError);
					
					return;
				}
				
				let redirect = undefined;
				
				// Redirect any relative /index.html to just the relative /
				// Redirect any .html file to the URL without the extension
				if (path.substring(path.length - "/index.html".length) == "/index.html") {
					redirect = path.substring(0, path.length - "index.html".length);
				} else if (path.substring(path.length - ".html".length) == ".html") {
					redirect = path.substring(0, path.length - ".html".length);
				}
					
				if (redirect !== undefined) {
					// Send a 301 Moved Permanently
					response.status(301);
					response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
					response.setHeader("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
					response.setHeader("Location", redirect);
					response.send("");
				} else {
					// Send the file
					response.sendFile(internalPath);
				}
			});
			
			return;
		}
		
		let redirect = undefined;
		
		// Redirect any relative /index to just the relative /
		if (path.substring(path.length - "/index".length) == "/index") {
			redirect = path.substring(0, path.length - "index".length);
		}
		
		if (redirect !== undefined) {
			// Send a 301 Moved Permanently
			response.status(301);
			response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
			response.setHeader("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
			response.setHeader("Location", redirect);
			response.send("");
		} else {
			// Send the file
			response.sendFile(internalPath + ".html");
		}
	});
});

// Handle errors
// Whenever an API endpoint should return an error, set _requireJSON on the error object to true
application.use(async (mainError, request, response, next) => {
	// If there is a specific error object for the given error, use it. Otherwise, use 500
	// Internal Server Error
	let errorType = mainError.status in ServerError ? ServerError[mainError.status] : ServerError[500];
	
	// Return the correct status code header
	response.status(errorType.code);
	
	let errorID;
	
	try {
		errorID = utility.randomString(25);
	} catch (error) {
		// Couldn't generate an ID
		console.error("Application error:");
		console.error(mainError);
		console.error("Error generating reference ID:");
		console.error(error);
		
		// Send a plain text error
		response.setHeader("Content-Type", "text/plain");
		response.send(errorType.code + " " + errorType.name);
		
		return;
	}
	
	console.error("Application error reference ID: " + errorID);
	console.error(mainError);
	
	// Whenever an API endpoint should return an error, set _requireJSON on the error object to true
	if (mainError._requireJSON) {
		response.setHeader("Content-Type", "text/plain");
		response.send(JSON.stringify({success: false, error: {status: {code: errorType.code, message: errorType.name}, reference_id: errorID}}));
		
		return;
	}
	
	fs.readFile(Directory.TEMPLATE + "error.html", "utf8", (error, data) => {
		if (error) {
			// Couldn't read the error template
			console.error("Error reading template:");
			console.error(error);

			// Send a plain text error
			response.setHeader("Content-Type", "text/plain");
			response.send(errorType.code + " " + errorType.name + "\nError Reference ID: " + errorID);

			return;
		}
		
		let errorTemplate = handlebars.compile(data);
		
		try {
			let errorPage = errorTemplate({
				errorCode: errorType.code,
				errorName: errorType.name,
				errorMessage: errorType.message,
				errorInformation: () => {
					if (typeof errorType.information == "function") {
						return errorType.information(request.method, request.path);
					}
					
					return errorType.information;
				},
				errorHelpText: () => {
					if (typeof errorType.helpText == "function") {
						return errorType.helpText(errorID);
					}
					
					return errorType.helpText;
				}
			});
			
			response.setHeader("Content-Type", "text/html");
			console.error("");
			
			response.send(errorPage);
		} catch (error) {
			// Couldn't compile the error template
			console.error("Error compiling template:");
			console.error(error);
			
			// Send a plain text error
			response.setHeader("Content-Type", "text/plain");
			response.send(errorType.code + " " + errorType.name + "\nError Reference ID: " + errorID);
		}
	});
});

async function start() {
	// Test SQL server connection
	try {
		console.log("Testing SQL server connection...");
		await sqlConnectionPool.query("SELECT 'test';");
	} catch(error) {
		if (error.code == "ECONNREFUSED") {
			let regex = /connect ECONNREFUSED (\d+\.\d+\.\d+\.\d+):?(\d+)?/g;
			let result = regex.exec(error.message);
			
			if (result) {
				console.log(`Unable to connect to SQL server at ${result[1]}${result.length > 2 ? ` on port ${result[2]}` : ""}`);
				//FUTURE: Remove later
				console.warn("WARN: Ignoring failed SQL connection");
			} else {
				console.log(error);
			}
		}

		//FUTURE: Uncomment later
		//exit();
	}
	
	server.listen(listenPort, listenAddress, () => {
		console.log("Listening on " + listenAddress + ":" + listenPort);
	});
}

function exit() {
	console.log("-------------------------SERVER SHUTDOWN-------------------------");
	process.exit();
}

process.on("SIGINT", () => {
	exit();
});

process.on("unhandledRejection", error => {
	console.log("Caught unhandledRejection");
	console.log(error);
});

start();
