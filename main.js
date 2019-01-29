"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var mainWindow;
var windowConfig;
var serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
windowConfig = {
    width: 800,
    height: 700
};
function createWindow() {
    mainWindow = new electron_1.BrowserWindow(windowConfig);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools({
        mode: 'undocked'
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
