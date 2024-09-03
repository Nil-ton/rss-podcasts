import { BrowserWindow, ipcMain } from "electron";

ipcMain.on('close-window', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.close();
    }
  });