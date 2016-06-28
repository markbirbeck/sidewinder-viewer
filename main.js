const electron = require('electron');
const URL = require('url');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
const {shell} = electron;
let browserWindowOptions = {width: 800, height: 600};

/**
 * Parse command-line parameters:
 *
 * What we're after is a URL to say what page to open, with an XPointer
 * that provides metadata. For example:
 *
 *  electron . "http://inbox.google.com#meta(width=1000,height=800)"
 */

let opts = require('minimist')(process.argv.slice(2));
let url = opts._[0];

if (url) {

  /**
   * Parse the main parameter as a URL:
   */

  let urlObject = URL.parse(url);

  /**
   * If there is a 'hash' section of the URL then see if there is a
   * 'meta' XPointer:
   */

  if (urlObject.hash) {
    let match = urlObject.hash.match(/#meta\(([^\)]*)\)/);

    if (match) {
      let params = match[1].split(',');

      params.forEach(param => {
        let nvPair = param.split('=');
        let value = nvPair[1];

        if (value === undefined || value === 'true') {
          value = true;
        }

        if (value === 'false') {
          value = false;
        }

        if (isFinite(value) && !isNaN(parseFloat(value))) {
          value = Number(value);
        }

        browserWindowOptions[nvPair[0]] = value;
      });
    }

    /**
     * Remove the hash before reconstructing the URL:
     */

    urlObject.hash = undefined;
    url = URL.format(urlObject);
  }
} else {
  console.error('Please provide a URL');
  process.exit(-1);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow(browserWindowOptions);

  // and load the url of the app.
  win.loadURL(url);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  /**
   * If a new window is requested with a URL then open in the browser
   * (better navigating links from emails):
   *
   * [TODO] Make opening links in a browser app configurable.
   */

  win.webContents.on('new-window', (ev, url, name) => {
    ev.preventDefault();
    shell.openExternal(url);
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
