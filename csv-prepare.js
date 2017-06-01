/*
 * csv-prepare.js
 * --------------
 * Ce script prepare le fichier csv avec les infos ds élèves pour faciliter le
 *  travail dans les scripts batch.
 * Il génère le "username" et vérifie que le fichier est correctement formaté.
 * --------------
 * Utilisation:
 *  > node ./csv-prepare.js [fichier]
 * --------------
 * Retour: (exit code)
 *  0 - Fichier traité et ecrasé
 *  2 - Erreur
 */

// "Importe" les librairies et autres scripts requis.
var fs = require("fs");
var settings = require("./settings.js").data;

// Verifie si un fichier a été donné dans les paramètres de lancement.
if(process.argv.length < 3) {
	console.error("Erreur: Pas assez de paramètres.");
	process.exit(2);
}

// Vérifie si le fichier existe
if(!fs.existsSync(process.argv[2])) {
	console.error("Erreur: Le fichier est introuvable. ("+process.argv[2]+")");
	process.exit(2);
}

// Lis le fichier
var fileContent = fs.readFileSync(process.argv[2]).toString();

// Check de sécurité (Evite les NPE)
if(fileContent==null) {
	console.error("Erreur: fileContent est null ou undefined !");
	process.exit(2);
}

var linesIn = fileContent.split(/\r?\n/);
var linesOut = [];

// Vérifie si le fichier n'est pas vide (Evite les OOBE)
if(linesIn.length <= 1) {
	console.error("Erreur: Nombre d'entrée du CSV insufisante. ("+linesIn.length+" <= 1");
	process.exit(2);
}

// Prépare les regex
var rgx = {};
try {
	rgx.raw = new RegExp(settings.regexCsvRaw);
	rgx.processed = new RegExp(settings.regexCsvProcessed);
	//rgx.clean1 = new RegExp(settings.regexCsvClean1);
} catch(err) {
	console.error("Erreur: Impossible de prépare les regexs.");
	console.error(err);
	process.exit(2);
}

//Retirer les tirets!!! - transformer les e avec accent et les spec.
// Vérifie chaque lignes et ajoute les valides dans "linesOut".
linesIn.forEach(function(line) {
	if(rgx.processed.test(line)) {
		linesOut.push(line);
	} else if(rgx.raw.test(line)) {
		var parts = line.split(";");
		// J'ai séparé cette ligne pour y voir plus clair, c'est pas top, mais ça fonctionne.
		linesOut.push(
			(
				//Retire les caractères spéciaux du nom [^0-9a-z]
				parts[0].replace(/\W/g,"").substring(0,3) +
				parts[1].replace(/\W/g,"").substring(0,2)
			).toLowerCase() +
			";" + line
		);
	} else if(line.length < 3) {
		// Ligne vide, evite de lancer une erreur sur les lignes vides.
	} else {
		console.error("Erreur: Ligne mal formatée. ("+line+")");
		process.exit(2);
	}
});

// Combine toute les lignes pour écrire dans le fichier csv.
var out = linesOut.join("\r\n");
fs.truncate(process.argv[2], 0, function() {
	fs.writeFile(process.argv[2], out, function (err) {
		if (err) {
			console.error("Erreur: Impossible d'écraser/écrire dans le fichier csv." + err);
			console.error(err);
			process.exit(2);
		} else {
			process.exit(0);
		}
	});
});
