const { app, BrowserWindow } = require('electron');
const path = require('path');
const { execFile } = require('child_process');

let mainWindow;
let flaskProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL('http://localhost:5000');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
    const flaskExecutable = path.join(process.resourcesPath, 'translate_server.exe');

    flaskProcess = execFile(flaskExecutable, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
        }
        console.log(stdout);
        console.error(stderr);
    });

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

app.on('before-quit', () => {
    if (flaskProcess) {
        flaskProcess.kill('SIGINT');
    }
});
