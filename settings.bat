@echo off
rem Utiliser %1 si pas vide
set file=settings.json

for /f "tokens=1,* delims=:," %%a in (%file%) do ( 
	if not "%%b"=="" call :dequote %%b
	
	(for /f "tokens=* delims= " %%e in (%%a) do set atoken=%%e) 2>NUL 
	
	if not [!atoken!] == [] (
		set !atoken!=!btoken!
	)
)
goto end

:dequote
set btoken=%~1
GOTO:EOF

:end
