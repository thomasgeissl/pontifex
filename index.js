const { app, BrowserWindow } = require("electron");
const path = require("path");
const Server = require("node-osc").Server;
const Client = require("node-osc").Client;
const easymidi = require("easymidi");

const isDev = process.env.DEV;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "./frontend/build/index.html")}`;
  console.log(url);

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

const portName = "IAC Driver Bus 1";
const oscPort = 9009;
const controller = 1;
const channel = 1;

const output = new easymidi.Output(portName);

var oscServer = new Server(oscPort, "127.0.0.1", () => {
  console.log("OSC Server is listening");
});

oscServer.on("message", function (msg) {
  const address = msg[0];
  console.log(address);
  console.log(msg.length);
  //   TODO: map value
  output.send("cc", {
    controller,
    value: 1,
    channel,
  });
});

const client = new Client("127.0.0.1", oscPort);
client.send("/address", 200, () => {});
