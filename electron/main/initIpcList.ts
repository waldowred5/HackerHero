import { BrowserWindow, ipcMain, dialog } from 'electron';

export const initIpcHandlers = () => {

  // EXAMPLES
  // IPC DEMO - Renderer to Main (1-way)
  function handleSetTitle (event, title) {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win?.setTitle(title);
  }

  ipcMain.on('set-title', handleSetTitle);

  // IPC DEMO - Renderer to Main (2-way)
  async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (!canceled) {
      return filePaths[0];
    }
  }

  ipcMain.handle('dialog:openFile', handleFileOpen);

  // IPC DEMO - Main to Renderer (1-way)
  ipcMain.on('counter-value', (event, value) => {
    console.log(value); // will print value to Node console
  });
};
