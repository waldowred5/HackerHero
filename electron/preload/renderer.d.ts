// https://www.electronjs.org/docs/latest/tutorial/context-isolation
import { ipcRenderer } from 'electron'

export interface IElectronAPI {

  // EXAMPLES
  // IPC DEMO - Renderer to Main (1-way)
  setTitle: (title: string | undefined) => void,
  // IPC DEMO - Renderer to Main (2-way)
  openFile: () => Promise<void>,
  // IPC DEMO - Main to Renderer (1-way)
  handleCounter: (callback: (event, value) => void) => ipcRenderer,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
