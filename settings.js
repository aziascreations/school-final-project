/*
 * settings.js
 * -----------
 * 
 * -----------
 * 
 * -----------
 * Source: https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
 */

var fs = require("fs");
var exports = module.exports = {};

// Evite les erreurs "set property [x] of undefined"
var settings = {
	raw: {},
	data: {}
}

settings.raw.common = fs.readFileSync("./settings-common.json").toString();
settings.raw.js = fs.readFileSync("./settings-js.json").toString();

if(settings.raw.common == null) {
	console.error("Error: settings.raw.common is null or undefined !");
	process.exit(1);
}

if(settings.raw.js == null) {
	console.error("Error: settings.raw.js is null or undefined !");
	process.exit(1);
}

//console.log(settings.raw.common);
//console.log(settings.raw.js);

try {
	settings.data.common = JSON.parse(settings.raw.common);
} catch(err) {
	console.error("Erreur: settings-common.json mal formaté !");
	console.error(err);
	process.exit(1);
}

try {
	settings.data.js = JSON.parse(settings.raw.js);
} catch(err) {
	console.error("Erreur: settings-js.json mal formaté !");
	console.error(err);
	process.exit(1);
}

// Combine les 2 objets et l'exporte.
exports.data = Object.assign(settings.data.common, settings.data.js);

//console.log(exports.data);
