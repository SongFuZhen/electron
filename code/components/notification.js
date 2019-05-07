const electron = require("electron");
const path = require("path");
const { app, Notification } = electron;

app.on("ready", () => {
    console.log("enerere....");
    const notification = new Notification({
        title: "Portal",
        subtitle: "New Tasks",
        body: "您有新通知了",
        silent: true,
        icon: path.join(__dirname, "../statics/images/icon.png")
    });

    notification.show();
});
