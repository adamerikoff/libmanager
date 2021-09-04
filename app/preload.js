const { contextBridge, ipcRenderer, BrowserWindow } = require('electron');


contextBridge.exposeInMainWorld("api", {
  getDataAPI: (args) => ipcRenderer.invoke("getData", args),
  saveDataAPI: (data) => ipcRenderer.invoke("saveData", data),
  exitAPI: (args) => ipcRenderer.invoke("exit", args),
  deleteAPI: (id) => ipcRenderer.invoke("delete", id),
  addBookWindow: (id) => ipcRenderer.invoke("addWindow", id),
});

window.addEventListener('DOMContentLoaded', () => {

});