const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain       = electron.ipcMain;

const path  = require('path');
const isDev = require('electron-is-dev');

// const NeDB          = require('./tools/NeDB');
// const CategoryStore = require('./tools/CategoryStore');

let mainWindow;

// require('update-electron-app')({
//     repo           : 'kitze/react-electron-example',
//     updateInterval : '1 hour'
// });

// global.sharedObject = {
//     ...CategoryStore.R
// };

function createWindow() {
    mainWindow = new BrowserWindow({
        title          : 'Natas.X.Pass',
        width          : 960,
        height         : 600,
        x              : 0,
        y              : 0,
        webPreferences : {
            javascript      : true,
            plugins         : true,
            nodeIntegration : true, // 集成 Nodejs
            webSecurity     : false
        }
        // titleBarStyle  : 'hidden',
        // frame          : false
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:9000');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    }

    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
    // NeDB.Open();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// [CategoryStore.W].map((store) => {
//     for (let item in store) {
//         if (!store.hasOwnProperty(item)) continue;
//         ipcMain.on(item, store[item]);
//         console.log(item, store[item]);
//     }
// });
