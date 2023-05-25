import { contextBridge, ipcRenderer } from 'electron';

// DO NOT DIRECTLY EXPOSE THE FOLLOWING APIs FOR SECURITY
// ipcRenderer.send, ipcRenderer.invoke(), ipcRenderer.on
// Ensure you only expose specific channels on these APIs


contextBridge.exposeInMainWorld('electronAPI', {

  // EXAMPLES
  // IPC DEMO - Renderer to Main (1-way)
  setTitle: (title) => ipcRenderer.send('set-title', title),
  // IPC DEMO - Renderer to Main (2-way)
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // IPC DEMO - Main to Renderer (1-way)
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
});
