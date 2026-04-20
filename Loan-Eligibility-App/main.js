const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1001,
    height: 626,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  win.webContents.setWindowOpenHandler(({ url }) => {
    return { action: 'allow' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.on('minimize-window', () => {
  if (win) {
    win.minimize();
  }
});

ipcMain.on('close-window', () => {
  if (win) {
    win.close();
  }
});

ipcMain.on('maximize-window', () => {
  if (!win) {
    return;
  }

  if (win.isMaximized()) {
    win.unmaximize();
    return;
  }

  win.maximize();
});

const { spawn } = require('child_process');

ipcMain.handle('predict-loan', async (event, formData) => {
  return new Promise((resolve, reject) => {
    const py = spawn('python', [path.join(__dirname, 'model/predict.py')]);

    let result = '';
    let error = '';

    py.stdin.write(JSON.stringify(formData));
    py.stdin.end();

    py.stdout.on('data', (data) => {
      result += data.toString();
    });

    py.stderr.on('data', (data) => {
      error += data.toString();
    });

    py.on('close', (code) => {
      if (code === 0) {
        try {
          const parsedResult = JSON.parse(result);
          resolve(parsedResult);
        } catch (parseError) {
          reject(`Error parsing prediction output: ${parseError.message}`);
        }
      } else {
        console.error(`Python process exited with code ${code}`);
        console.error(`Stderr: ${error}`);
        reject(`Prediction script failed with code ${code}.\nError: ${error}`);
      }
    });
  });
});
