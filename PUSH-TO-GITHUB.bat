@echo off
echo ========================================
echo   GitHub par Code Push
echo ========================================
echo.
cd /d "%~dp0"
echo Pushing to https://github.com/iamfzk/fahd-zaafar-khan-global-tech
echo.
git push -u origin master --force
echo.
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Code push ho gaya.
    echo Ab GitHub Settings - Pages enable karo.
) else (
    echo Push fail - credentials check karo.
    echo Password = Personal Access Token (GitHub Settings - Developer settings)
)
echo.
pause
