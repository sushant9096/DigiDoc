const { ipcMain } = require('electron');
// Modules
const {BrowserWindow} = require('electron');

// BrowserWindow instance
exports.win;

// mainWindow createWindow fn
exports.createWindow = () => {

	this.win = new BrowserWindow({
		width: 1366,
		height: 720,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true
		},
		icon: __dirname + 'images/DigiDocLogo.ico'
	});

	// Devtools
	//this.win.webContents.openDevTools()

	// Load main window content
	this.win.loadURL(`file://${__dirname}/renderer/main.html`);

	// Handle window closed
	this.win.on('closed', () => {
		this.win = null
	})
};
