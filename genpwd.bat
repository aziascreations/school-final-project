@echo off

:: genpwd.bat
:: ----------
::
:: ----------
:: Retour: (Variable)
::  %pwd% - Texte contenant le mot de passe.
:: ----------
:: Sources:
::  http://stackoverflow.com/questions/25045985/random-alphanumeric
::  http://stackoverflow.com/questions/17750511/how-to-return-value-from-one-batch-file-to-caller-batch-file

setlocal enableextensions enabledelayedexpansion

rem Liste des caractères utilisés
set "alphabet=a b c d f g h i j k l m n p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"

rem Create an "array" with the elements of the alphabet
set "size=0"
for %%a in (%alphabet%) do (
	set "a.!size!=%%a"
	set /a "size+=1"
)

rem Generate the output, selecting 32 randoms elements from the array
set "k="
for /l %%a in (1 1 6) do (
	set /a "r=!random! %% size"
	for %%b in (!r!) do set "k=!k!!a.%%b!"
)

endlocal & set pwd=%k%

exit /b
