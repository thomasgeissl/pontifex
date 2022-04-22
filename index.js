const { app, BrowserWindow } = require("electron");
const path = require("path");
const Server = require("node-osc").Server;

const isDev = process.env.DEV;
let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "./frontend/build/index.html")}`;
  win.loadURL(url);
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const oscPort = 9010;

var oscServer = new Server(oscPort, "127.0.0.1", () => {
  console.log("OSC Server is listening");
});

oscServer.on("message", function (msg) {
  const address = msg[0];
  if (address === "/kls/io/crank") {
    console.log(msg);
    win.webContents.send("osc", msg);
  }
});
