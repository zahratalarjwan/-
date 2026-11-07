@echo off
chcp 65001 >nul
title CineFlow AI Studio - Ultimate Filmmaking Platform
color 0B
echo =====================================================================
echo                CineFlow AI Studio v1.0.0
echo       من الفكرة إلى فيلم سينمائي متكامل بالذكاء الاصطناعي
echo =====================================================================
echo.
set PATH=C:\Program Files\nodejs;%PATH%

if exist "%~dp0cineflow-studio" (
    cd /d "%~dp0cineflow-studio"
) else (
    cd /d "%~dp0"
)

if not exist "node_modules" (
    echo [*] Installing dependencies for first run...
    call npm install
)

echo [*] Opening browser at http://localhost:3000
start "" http://localhost:3000

echo [*] Starting CineFlow AI Studio server...
call npm run dev

pause
