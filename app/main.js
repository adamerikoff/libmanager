const fs = require('fs');
const path =  require('path');
const { app, BrowserWindow, ipcMain } = require('electron');



var win = null;


function createWindow () {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
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

ipcMain.handle("getData", async (event, args) => {
  let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'),'utf8'));
  return data;
});
ipcMain.handle("exit", async (event, args) => {
  app.quit();
});
ipcMain.handle("delete", async (event, id) => {
  let books = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'),'utf8'));
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) books.splice(i, 1);    
  }
  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(books));
});