/*
 *
 */

var fs = require("fs");
var faker = require("faker");
var group = "5Test";

console.log("Génération de 10 utilisateurs dans le groupe "+group);

var out = "";
for(var i=0; i<10; i++) {
  out += faker.fake("{{name.lastName}};{{name.firstName}};")+group+"\n";
}

console.log("\nResultat:");
console.log(out);

console.log("Sauvegarde dans users-test.csv...");
fs.truncate("./users-test.csv", 0, function() {
	fs.writeFile("./users-test.csv", out, function (err) {
		if (err) {
			console.error("Erreur: Impossible d'écraser/écrire dans le fichier csv." + err);
			console.error(err);
			process.exit(2);
		} else {
			process.exit(0);
		}
	});
});
