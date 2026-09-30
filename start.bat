@echo off
setlocal enabledelayedexpansion
title ToneRoom - Starting Platform...

echo =======================================================
echo          ToneRoom - Live Music Platform
echo                  START SCRIPT
echo =======================================================
echo.

cd /d "%~dp0"

:: 1. Check if Docker daemon is running
echo [1/3] Checking Docker daemon status...
docker info >nul 2>&1
if %errorlevel% equ 0 goto DOCKER_READY

echo Docker daemon is not responding. Attempting to start Docker Desktop...

set "DOCKER_EXE=%LocalAppData%\Programs\DockerDesktop\Docker Desktop.exe"
if not exist "%DOCKER_EXE%" set "DOCKER_EXE=%ProgramFiles%\Docker\Docker\Docker Desktop.exe"

if exist "%DOCKER_EXE%" (
    echo Launching: "%DOCKER_EXE%"
    start "" "%DOCKER_EXE%"
    echo Waiting for Docker engine to become ready...
) else (
    echo [!] Could not locate Docker Desktop.exe automatically.
    echo Please start Docker Desktop from your Start Menu.
)

set /a WAIT_COUNT=0

:WAIT_DOCKER
ping -n 4 127.0.0.1 >nul
docker info >nul 2>&1
if %errorlevel% equ 0 goto DOCKER_READY

set /a WAIT_COUNT+=3
echo Waiting for Docker engine... %WAIT_COUNT%s / 90s
if %WAIT_COUNT% geq 90 goto DOCKER_TIMEOUT
goto WAIT_DOCKER

:DOCKER_TIMEOUT
echo.
echo [ERROR] Timed out waiting for Docker engine.
echo Please check Docker Desktop in your taskbar, ensure it is running, and run start.bat again.
echo.
pause
exit /b 1

:DOCKER_READY
echo [OK] Docker daemon is running!
echo.

:: 2. Start Docker Containers (Postgres + LiveKit)
echo [2/3] Starting Database and LiveKit Server (docker compose up -d)...
docker compose up -d
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start Docker containers.
    echo.
    pause
    exit /b 1
)

echo [OK] Containers are up and healthy.
echo.

:: 3. Start Next.js Development Server
echo [3/3] Starting Next.js Web Server (npm run dev)...
echo.
echo ToneRoom will automatically open in your default browser at http://localhost:3000
echo.
echo =======================================================
echo ToneRoom is running!
echo To stop the platform, close this window or run stop.bat
echo =======================================================
echo.

:: Launch browser in the background after 3 seconds
start "" /b cmd /c "ping -n 4 127.0.0.1 >nul & start http://localhost:3000"

npm run dev
