// TODO: Find the correct home for this file
// https://www.electronjs.org/docs/latest/tutorial/context-isolation

export interface IElectronAPI {
  setTitle: (title: string) => void,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
