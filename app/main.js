const fs = require('fs');
const path =  require('path');
const { app, BrowserWindow, ipcMain } = require('electron');



var win = null;
var addWin = null;

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

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});



ipcMain.handle("getData", async (event, args) => {
  let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'),'utf8'));
  return data;
});

ipcMain.handle("saveData", async (event, data) => {
  saveData(data);
});

ipcMain.handle("exit", async (event, args) => {
  app.quit();
});

ipcMain.handle("delete", async (event, id) => {
  let books = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'),'utf8'));
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) books.splice(i, 1);    
  }
  saveData(books);
});

function saveData(data) {
  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data));
}








ipcMain.handle("addWindow", async (event, args) => {
  addWin = new BrowserWindow({
    width: 400,
    height: 700,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
    webPreferences: {
      preload: path.join(__dirname, 'add_preload.js'),

    }
  });
  addWin.loadFile(path.join(__dirname, 'add.html'));

  addWin.on('closed', () => {
    console.log("closing");
    addWin = null;
  });

  ipcMain.handle("addBook", async (event, book) => {
    console.log(book);
    let books = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'),'utf8'));
    books.push(book);
    saveData(books);
    console.log("closing");
    addWin.close();
    addWin = null;
  });
  ipcMain.handle("exitBook", async (event, args) => {
    console.log("closing");
    addWin.destroy();
    addWin = null;
  });

});