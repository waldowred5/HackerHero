"use strict";
const electron = require("electron");
const os = require("os");
const path = require("path");
const node_os = require("node:os");
const node_path = require("node:path");
const electronUpdater = require("electron-updater");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
function update(win2) {
  electronUpdater.autoUpdater.autoDownload = false;
  electronUpdater.autoUpdater.disableWebInstaller = false;
  electronUpdater.autoUpdater.allowDowngrade = false;
  electronUpdater.autoUpdater.on("checking-for-update", function() {
  });
  electronUpdater.autoUpdater.on("update-available", (arg) => {
    win2.webContents.send("update-can-available", { update: true, version: electron.app.getVersion(), newVersion: arg == null ? void 0 : arg.version });
  });
  electronUpdater.autoUpdater.on("update-not-available", (arg) => {
    win2.webContents.send("update-can-available", { update: false, version: electron.app.getVersion(), newVersion: arg == null ? void 0 : arg.version });
  });
  electron.ipcMain.handle("check-update", async () => {
    if (!electron.app.isPackaged) {
      const error = new Error("The update feature is only available after the package.");
      return { message: error.message, error };
    }
    try {
      return await electronUpdater.autoUpdater.checkForUpdatesAndNotify();
    } catch (error) {
      return { message: "Network error", error };
    }
  });
  electron.ipcMain.handle("start-download", (event) => {
    startDownload(
      (error, progressInfo) => {
        if (error) {
          event.sender.send("update-error", { message: error.message, error });
        } else {
          event.sender.send("download-progress", progressInfo);
        }
      },
      () => {
        event.sender.send("update-downloaded");
      }
    );
  });
  electron.ipcMain.handle("quit-and-install", () => {
    electronUpdater.autoUpdater.quitAndInstall(false, true);
  });
}
function startDownload(callback, complete) {
  electronUpdater.autoUpdater.on("download-progress", (info) => callback(null, info));
  electronUpdater.autoUpdater.on("error", (error) => callback(error, null));
  electronUpdater.autoUpdater.on("update-downloaded", complete);
  electronUpdater.autoUpdater.downloadUpdate();
}
const initIpcHandlers = () => {
  function handleSetTitle(event, title) {
    const webContents = event.sender;
    const win2 = electron.BrowserWindow.fromWebContents(webContents);
    win2 == null ? void 0 : win2.setTitle(title);
  }
  electron.ipcMain.on("set-title", handleSetTitle);
  async function handleFileOpen() {
    const { canceled, filePaths } = await electron.dialog.showOpenDialog();
    if (!canceled) {
      return filePaths[0];
    }
  }
  electron.ipcMain.handle("dialog:openFile", handleFileOpen);
  electron.ipcMain.on("counter-value", (event, value) => {
    console.log(value);
  });
};
process.env.DIST_ELECTRON = node_path.join(__dirname, "../");
process.env.DIST = node_path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? node_path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (node_os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
const preload = node_path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = node_path.join(process.env.DIST, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: node_path.join(process.env.PUBLIC, "favicon.ico"),
    frame: false,
    fullscreen: true,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (url) {
    win.loadURL(url);
  } else {
    win.loadFile(indexHtml);
  }
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
  update(win);
}
electron.app.whenReady().then(async () => {
  initIpcHandlers();
  await createWindow();
  const reactDevToolsPath = path__namespace.join(
    os.homedir(),
    "/Documents/coding-projects/game-dev/react-dev-tools/ReactDevTools"
    // '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.27.8_0'
  );
  await electron.session.defaultSession.loadExtension(reactDevToolsPath);
});
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
//# sourceMappingURL=index.js.map
