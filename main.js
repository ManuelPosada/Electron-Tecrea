const {app, BrowserWindow, Menu, dialog} = require('electron')
const { webFrame } = require('electron/renderer')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain

let win;

function createWindow () {
    win = new BrowserWindow({
        width:  1310,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            devTools: true
        }
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: true
    }))

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.allowRendererProcessReuse = false

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(win === null) {
        createWindow()
    }
})

/**
 * Menu build
 */
let showOpen = function() {
	dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ name: 'GPX', extensions: ['gpx'] }]});
};

let template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click: function() { showOpen(); }
        }
      ]
    }
  ]

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
