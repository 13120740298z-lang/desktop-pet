const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, nativeImage, screen, dialog } = require('electron');
const path = require('path');

// 禁用硬件加速以获得更好的透明效果
app.disableHardwareAcceleration();

let mainWindow = null;
let tray = null;
let isQuitting = false;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 380,
    height: 580,
    x: width - 420,
    y: height - 620,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    hasShadow: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

function createTray() {
  // 创建粉色的托盘图标
  const size = 16;
  const iconBuffer = Buffer.alloc(size * size * 4);
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const cx = size / 2, cy = size / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      
      if (dist < size / 2 - 1) {
        // 粉色圆形
        iconBuffer[idx] = 255;     // R
        iconBuffer[idx + 1] = 105; // G
        iconBuffer[idx + 2] = 180; // B
        iconBuffer[idx + 3] = 255; // A
        
        // 眼睛
        const eyeDist1 = Math.sqrt((x - 5) ** 2 + (y - 6) ** 2);
        const eyeDist2 = Math.sqrt((x - 11) ** 2 + (y - 6) ** 2);
        if (eyeDist1 < 1.5 || eyeDist2 < 1.5) {
          iconBuffer[idx] = 50;
          iconBuffer[idx + 1] = 50;
          iconBuffer[idx + 2] = 50;
        }
      } else {
        iconBuffer[idx + 3] = 0;
      }
    }
  }

  const icon = nativeImage.createFromBuffer(iconBuffer, { width: size, height: size });
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: '🐱 小U桌面宠物', enabled: false },
    { type: 'separator' },
    { label: '显示小U', click: () => mainWindow.show() },
    { label: '隐藏小U', click: () => mainWindow.hide() },
    { type: 'separator' },
    { label: '关于', click: () => {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: '关于小U',
        message: '🐱 小U桌面宠物 V1.0',
        detail: '一个活泼可爱的AI桌面伙伴\n让桌面不再孤单'
      });
    }},
    { type: 'separator' },
    { label: '退出', click: () => { isQuitting = true; app.quit(); }}
  ]);

  tray.setToolTip('🐱 小U - AI桌面宠物');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show());
}

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+Shift+U', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function setupIPC() {
  ipcMain.on('hide-window', () => mainWindow.hide());
  ipcMain.on('show-window', () => mainWindow.show());
  ipcMain.on('toggle-window', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
  
  ipcMain.handle('get-app-version', () => app.getVersion());
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  registerShortcuts();
  setupIPC();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('will-quit', () => globalShortcut.unregisterAll());
