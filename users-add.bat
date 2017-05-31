@echo off

if [%1] == [] goto error-noarg
set csvPath=%1
if not exist %csvPath% goto error-nofile

call settings.bat

echo Fichier utilise pour l'ajout d'utilisateurs
echo %csvPath%


:choix-fichier
echo.
set /P qst=Etes-vous sur de vouloir utiliser ce fichier ? [o/n]
if /I "%qst%" equ "O" goto choix-type
if /I "%qst%" equ "N" goto end
goto choix-fichier


:choix-type
echo.
echo Quel type d'utilisateurs voullez-vous ajouter ?
set /P qst=[p - Professeur / e - Eleves / q - Quitter]
if /I "%qst%" equ "P" goto add-groups-p
if /I "%qst%" equ "E" goto add-groups-e
if /I "%qst%" equ "Q" goto end
goto choix-type


rem -- Partie pour les profs --
rem -- C'est possible de le faire avec seulement 2 goto, mais je ne suis pas assez maso pour le faire --
:add-groups-p
echo.
echo Verification du groupes des professeurs...

rem tester si le groupe pour les profs existe
rem Pas testé!!!

call exists-group.bat %groupeProfs%
if errorlevel 1 (
	rem goto handleerror1orhigher
)


if %groupExists% equ 1 (
	goto add-users-p
) else (
	rem Créer groupe
	rem A tester aussi
	rem ? dsadd group CN=Professeurs,%groupsRootFQDN%
	goto add-users-p
)

:add-users-p
echo.
echo Verification des utilisateurs pour les professeurs...

goto end


rem -- Partie pour les eleves --
:add-groups-e
echo.
echo Verification des groupes de classe...

goto add-users-e


:add-users-e
echo.
echo Verification des utilisateurs pour les eleves...

goto end


rem -- Erreurs et autres trucs inutiles --
:error-noarg
echo Veuillez glisser un fichier csv sur le script ou le lancer avec le chemin du fichier en premier argument.
echo.
goto end


:error-nofile
echo Le fichier indiqué est introuvable.
echo.
goto end


:end
pause
