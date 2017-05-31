var fs = require("fs");

if(!process.argv.length >= 3) {
	console.error("Error: Not enough parameters");
	process.exit(1);
}

var FileContent = fs.readFileSync(process.argv[2]).toString();

if(FileContent==null) {
	console.error("Error: fileContent is null or undefined !");
	process.exit(1);
}

// /\s+/g retire les retour à la ligne.
FileContent = FileContent.replace(/ /g, '');

fs.truncate(process.argv[2], 0, function() {
	fs.writeFile(process.argv[2], FileContent, function (err) {
		if (err) {
			console.log("Error writing file: " + err);
		} else {
			process.exit(0);
		}
	});
});
