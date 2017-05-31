@echo off

if [%1] == [] goto exit-false

rem Tester si >nul influence le résultat
dsget user %1

if %ERRORLEVEL% neq 0 (
	goto exit-false
) else (
	goto exit-true
)

:exit-true
set userExists=1
exit /b

:exit-false
set userExists=0
exit /b
