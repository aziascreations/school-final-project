var fs = require("fs");
var exports = module.exports = {};

var settings = {}

settings.raw = fs.readFileSync("./settings.json");
if(settings.raw==null) {
	console.error("Error: settings.raw is null or undefined !");
	process.exit(1);
}

// Utiliser un try catch
settings.data = JSON.parse(settings.raw);

exports.data = settings.data;

/*if (require.main === module) {
	// Ne sert à rien, les modifications sur process.env ne sortent pas du processus...
	for(var key in settings.data) {
		if(settings.data.hasOwnProperty(key)) {
			process.env[key] = settings.data[key];
		}
	}
} else {
	exports.data = settings.data;
}/**/
