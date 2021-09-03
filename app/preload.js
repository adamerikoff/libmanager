const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
})


window.addEventListener('DOMContentLoaded', () => {
})