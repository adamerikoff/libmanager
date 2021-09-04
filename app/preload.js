const { contextBridge, ipcRenderer } = require('electron')
const path =  require('path');
const fs = require('fs');

contextBridge.exposeInMainWorld("api", {
  getDataAPI: (args) => ipcRenderer.invoke("getData", args),
  exitAPI: (args) => ipcRenderer.invoke("exit", args),
  deleteAPI: (id) => ipcRenderer.invoke("delete", id),
});

window.addEventListener('DOMContentLoaded', () => {

})


function saveData(books) {
  let data = JSON.stringify(books);
  fs.writeFile(path.join(__dirname, 'data2.json'), data, (err) => {
    if (err) throw err;
    alert('saved')
});
}