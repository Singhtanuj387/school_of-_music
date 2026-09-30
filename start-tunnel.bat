@echo off
setlocal enabledelayedexpansion
title ToneRoom - Cloudflare Public Tunnel

echo =======================================================
echo          ToneRoom - Cloudflare Tunnel Launcher
echo          Deploy Local Platform to Public Internet
echo =======================================================
echo.

cd /d "%~dp0"

:: 1. Locate cloudflared executable
set "CF_EXE=cloudflared"
where cloudflared >nul 2>&1
if %errorlevel% neq 0 (
    if exist "C:\Program Files (x86)\cloudflared\cloudflared.exe" (
        set "CF_EXE=C:\Program Files (x86)\cloudflared\cloudflared.exe"
    ) else if exist "C:\Program Files\cloudflared\cloudflared.exe" (
        set "CF_EXE=C:\Program Files\cloudflared\cloudflared.exe"
    ) else (
        echo [!] cloudflared is not found on your system.
        echo Installing cloudflared via winget...
        winget install --id Cloudflare.cloudflared -e --accept-package-agreements --accept-source-agreements
        if exist "C:\Program Files (x86)\cloudflared\cloudflared.exe" (
            set "CF_EXE=C:\Program Files (x86)\cloudflared\cloudflared.exe"
        ) else (
            echo.
            echo [ERROR] Could not install or find cloudflared automatically.
            echo Please download it manually from: https://github.com/cloudflare/cloudflared/releases
            pause
            exit /b 1
        )
    )
)

echo [OK] Using cloudflared: "%CF_EXE%"
echo.

:: 2. Check if local web server is running on port 3000
echo Checking if ToneRoom web server is listening on port 3000...
netstat -aon | findstr ":3000" | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [NOTE] ToneRoom web server is NOT currently running on port 3000.
    echo Please make sure you run start.bat first, or start the server now.
    echo.
    choice /c YN /m "Would you like to start ToneRoom now in another window"
    if !errorlevel! equ 1 (
        start "" cmd /c "start.bat"
        echo Waiting 8 seconds for server to start...
        ping -n 9 127.0.0.1 >nul
    )
) else (
    echo [OK] ToneRoom is active on http://localhost:3000
)

echo.
echo =======================================================
echo Choose Tunnel Mode:
echo [1] Quick Tunnel  - Instant public HTTPS URL (Free, no account needed)
echo [2] Custom Domain - Use your own Cloudflare-managed domain (e.g. meet.yourdomain.com)
echo =======================================================
echo.

set /p CHOICE="Enter 1 or 2 (Default is 1): "
if "%CHOICE%"=="" set CHOICE=1

if "%CHOICE%"=="1" goto QUICK_TUNNEL
if "%CHOICE%"=="2" goto CUSTOM_TUNNEL
goto QUICK_TUNNEL

:QUICK_TUNNEL
echo.
echo Starting Quick Tunnel targeting http://localhost:3000...
echo.
echo ======================================================================
echo Look for the line below starting with:
echo    "https://........trycloudflare.com"
echo.
echo Copy and share that URL with anyone in the world to access ToneRoom!
echo.
echo [NOTE FOR LIVE VIDEO LESSONS]:
echo If joining video rooms from other devices or across the internet,
echo configure a free LiveKit Cloud project in .env.local:
echo   NEXT_PUBLIC_LIVEKIT_URL="wss://<your-project>.livekit.cloud"
echo (Local Docker LiveKit ws://localhost:7880 only works on this laptop)
echo.
echo Press Ctrl+C in this window to stop the tunnel at any time.
echo ======================================================================
echo.

"%CF_EXE%" tunnel --url http://localhost:3000
goto END

:CUSTOM_TUNNEL
echo.
echo =======================================================
echo Custom Domain Setup Guide:
echo =======================================================
echo 1. Login to Cloudflare account:
echo    "%CF_EXE%" tunnel login
echo.
echo 2. Create a named tunnel:
echo    "%CF_EXE%" tunnel create toneroom
echo.
echo 3. Route your domain / subdomain:
echo    "%CF_EXE%" tunnel route dns toneroom meet.yourdomain.com
echo.
echo 4. Run the tunnel:
echo    "%CF_EXE%" tunnel run --url http://localhost:3000 toneroom
echo =======================================================
echo.
choice /c YN /m "Would you like to run 'cloudflared tunnel login' now"
if !errorlevel! equ 1 (
    "%CF_EXE%" tunnel login
)
goto END

:END
pause
