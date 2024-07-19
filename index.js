const { app, BrowserWindow } = require('electron');
const { execFile } = require('child_process');
const path = require('path');

let mainWindow;
let flaskProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // This is required if you're using `nodeIntegration: true`
        }
    });

    mainWindow.loadURL('http://localhost:5000'); 

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    const flaskExecutable = path.join(__dirname, 'translate_server.exe'); 

    flaskProcess = execFile(flaskExecutable, (err, stdout, stderr) => {
        if (err) {
            console.error('Error starting Flask server:', err);
            return;
        }
        console.log('Flask server started successfully:', stdout);
        console.error(stderr);
        
        // Create the window only after the Flask server has started
        createWindow();
    });
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

app.on('before-quit', () => {
    if (flaskProcess) {
        flaskProcess.kill();
    }
});
