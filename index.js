const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Server = require("node-osc").Server;
const Client = require("node-osc").Client;
const Message = require("node-osc").Message;

const isDev = process.env.DEV;
const oscPort = 9010;
const oscOutPort = 9020;
let client = new Client("127.0.0.1", oscOutPort);

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "./frontend/build/index.html")}`;
  win.loadURL(url);
}
ipcMain.on("midi2osc", (event, arg) => {
  const message = new Message("/kls/io/midi2osc");
  message.append(arg.type);
  message.append(arg.channel);
  message.append(arg.note);
  message.append(arg.velocity);

  client.send(message, (err) => {
    if (err) {
      console.error(new Error(err));
    }
  });
});
ipcMain.on("setOscHost", (event, arg) => {
  client.close();
  console.log(arg);
  client = new Client(arg, oscOutPort);
});

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

var oscServer = new Server(oscPort, "127.0.0.1", () => {
  console.log("OSC Server is listening");
});

oscServer.on("message", function (msg) {
  const address = msg[0];
  if (address === "/kls/io/crank") {
    win.webContents.send("osc2midi", msg);
  }
});
