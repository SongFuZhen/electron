const electron = require("electron");
const { app, Menu, Tray } = electron;
const path = require("path");

// 托盘展示
app.on("ready", () => {
    const iconName = process.platform === "win32" ? "../statics/images/icon.png" : "../statics/images/icon.png";
    const iconPath = path.join(__dirname, iconName);

    appTray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "退出",
            click: function() {
                if (process.platform !== "darwin") {
                    app.quit();
                }
            }
        }
    ]);
    appTray.setToolTip("Portal客户端");
    appTray.setContextMenu(contextMenu);
    appTray.on("click", function(event) {
        if (process.platform === "darwin") {
            app.show(); // macos
        }

        // win.show();
    });
});
