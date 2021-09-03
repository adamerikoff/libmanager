const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

var win = null;


function createWindow () {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    autoHideMenuBar:true,
    resizable:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),

    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})