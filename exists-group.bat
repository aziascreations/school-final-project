@echo off

if [%1] == [] goto exit-false

rem Tester si >nul influence le résultat
dsget group %1

if errorlevel 1 (
	goto exit-false
) else (
	goto exit-true
)

:exit-true
set groupExists=1
exit /b

:exit-false
set groupExists=0
exit /b
