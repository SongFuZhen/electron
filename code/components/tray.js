const electron = require("electron");
const { app, Menu, Tray } = electron;
const path = require("path");

// 托盘展示
let tray = null;
app.on("ready", () => {
  const iconName =
    process.platform === "win32"
      ? "../public/portal_icon.png"
      : "../public/portal_icon.png";
  const iconPath = path.join(__dirname, iconName);

  appTray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出",
      click: function() {
        app.quit();
      }
    }
  ]);
  appTray.setToolTip("Portal客户端");
  appTray.setContextMenu(contextMenu);
  appTray.on("click", function(event) {
    // app.show();
    win.show();
  });
});
