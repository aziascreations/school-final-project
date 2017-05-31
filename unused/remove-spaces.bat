@echo off
rem Ajoute le dossier .\nodejs au PATH, si il est déja installé, il ne sera pas utilisé.
set PATH=%PATH%;%cd%\nodejs
set originalDir=%cd%

rem Pour changer le chemin si un racourcis est utilisé.
rem !! Risque de causer des problèmes si ce batch est apellé depuis un autre script
rem %originalDir% fixera le problème, normalement
rem cd %~dp0

if exist %1 (
	goto cleanFile
) else (
	echo Error: No file given in first argument/File doesn't exist.
	goto exit-false
)

:cleanFile
node %~dp0\remove-spaces.js %1
goto exit-true

:exit-true
set fileCleaned=1
pause
exit /b

:exit-false
set fileCleaned=0
pause
exit /b
