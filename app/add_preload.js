const { contextBridge, ipcRenderer, BrowserWindow } = require('electron');


contextBridge.exposeInMainWorld("addApi", {
  addBookApi: (book) => ipcRenderer.invoke("addBook", book),
  exitBookApi: (args) => ipcRenderer.invoke("exitBook", args),

});
