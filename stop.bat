@echo off
setlocal enabledelayedexpansion
title ToneRoom - Stopping Platform...

echo =======================================================
echo          ToneRoom - Live Music Platform
echo                  STOP SCRIPT
echo =======================================================
echo.

cd /d "%~dp0"

:: 1. Stop Next.js processes running on port 3000
echo [1/3] Stopping web server processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    if not "%%a"=="" (
        echo Stopping web server process PID: %%a...
        taskkill /F /PID %%a >nul 2>&1
    )
)
echo [OK] Web server stopped.
echo.

:: 2. Stop Cloudflare Tunnel if running
echo [2/3] Stopping any active Cloudflare Tunnel processes...
taskkill /F /IM cloudflared.exe >nul 2>&1
echo [OK] Cloudflare Tunnel stopped.
echo.

:: 3. Stop Docker background containers
echo [3/3] Stopping Docker containers (docker compose down)...
docker compose down
if %errorlevel% neq 0 (
    echo [Note] Docker was not running or containers already stopped.
) else (
    echo [OK] Docker containers stopped.
)

echo.
echo =======================================================
echo [SUCCESS] ToneRoom platform has been completely stopped!
echo =======================================================
echo.
pause
