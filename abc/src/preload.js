const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  hideWindow: () => ipcRenderer.send('hide-window'),
  showWindow: () => ipcRenderer.send('show-window'),
  toggleWindow: () => ipcRenderer.send('toggle-window'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version')
});
