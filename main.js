const { app, BrowserWindow, Menu } = require('electron')

process.env.tvIP = '192.168.1.12'
process.env.tvPort = 8080

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 290,
    height: 530,
    minWidth: 250,
    icon: 'public/assets/icon/favicon.ico'
  })
  mainWindow.loadFile('public/index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', () => {
  createWindow()
  Menu.setApplicationMenu(null)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
