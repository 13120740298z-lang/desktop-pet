@echo off
chcp 65001 >nul
echo ========================================
echo      🐱 小U桌面宠物 启动器
echo ========================================
echo.
echo 正在检查环境...

REM 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装: 
node --version

REM 检查 npm
echo.
echo 正在安装依赖...
cd /d "%~dp0"
call npm install 2>nul

if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    echo 请手动运行: npm install
    pause
    exit /b 1
)

echo.
echo ✅ 依赖安装完成！
echo.
echo ========================================
echo    正在启动小U桌面宠物...
echo ========================================
echo.
echo 💡 快捷键: Ctrl+Shift+U 切换显示/隐藏
echo 💡 点击窗口最小化按钮可隐藏到托盘
echo.
echo 按任意键启动...
pause >nul

REM 启动 Electron
npm start
