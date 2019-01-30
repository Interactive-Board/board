const Directory = {};
Directory.SELF = __dirname + "/";
Directory.CONFIG = Directory.SELF + "config/";
Directory.INCLUDE = Directory.SELF + "include/";
Directory.STATIC = Directory.SELF + "static/";
Directory.TEMPLATE = Directory.SELF + "template/";

const mysql = require("mysql2/promise");
const fs = require("fs");

let config;
// Initialization
// FUTURE: Read all json files in config directory

// Read settings.json configuration file
try {
	config = fs.readFileSync(Directory.CONFIG + "settings.json");
	config = JSON.parse(config);
} catch (error) {
	if (error.code == "ENOENT") {
		console.error("FATAL: Missing settings.json. Use sample.settings.json in the config directory to create one.");
	} else if (error.name == "SyntaxError") {
		console.error(`FATAL: Unable to parse settings.json. ${error.message}`);
	} else {
		console.log(error);
	}
	console.log("--------------------------SERVER STOPPED--------------------------");
	process.exit((typeof exitCode) == "number" ? exitCode : 0);
}

const sqlConnectionPool = mysql.createPool({
	host: config.sql.host,
	port: config.sql.port,
	user: config.sql.user,
	password: config.sql.password,
	database: config.sql.database,
	waitForConnections: true,
	connectionLimit: config.sql.poolConnectionLimit,
	queueLimit: 0
});

module.exports = sqlConnectionPool;