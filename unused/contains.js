/*
 * contains.js
 * -----------
 *
 * -----------
 * Utilisation:
 *  > node contains.js [Texte base] [Texte à chercher]
 * -----------
 * Retour: (Exit code)
 * 0 - Trouvé
 * 1 - Pas trouvé ou erreur
 */

 // Verifie si 2 String ont été données dans les paramètres de lancement.
 if(process.argv.length < 4) {
 	console.error("Erreur: Pas assez de paramètres.");
 	process.exit(1);
 }

//process.exit((process.argv[2].indexOf(process.argv[3]) !== -1) ? 0 : 0);

 if(process.argv[2].indexOf(process.argv[3]) !== -1) {
   console.log(0);
   process.exit(0);
 } else {
   console.log(1);
   process.exit(1);
 }
