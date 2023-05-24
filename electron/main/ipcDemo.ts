import {BrowserWindow, ipcMain} from "electron";

// IPC DEMO - Renderer to Main (1-way)
function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
}

ipcMain.on('set-title', handleSetTitle);
