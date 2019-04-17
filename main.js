const { app, BrowserWindow, Menu } = require('electron')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 290,
    height: 530,
    minWidth: 275,
    icon: 'public/assets/icon/favicon.ico',
    webPreferences: {
      webSecurity: false // Bypass CORS request
    }
  })
  mainWindow.loadFile('public/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => (mainWindow = null))
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
