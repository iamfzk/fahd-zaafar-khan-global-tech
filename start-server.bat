@echo off
echo Starting FZK Global Technologies server...
echo.
node server.js
if errorlevel 1 (
    echo.
    echo Node.js not found. Try: python -m http.server 8000
    pause
)
