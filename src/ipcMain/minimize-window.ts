import { BrowserWindow, ipcMain } from "electron";

ipcMain.on('minimize-window', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.minimize();
    }
  });