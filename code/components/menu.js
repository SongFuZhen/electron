// const { app, Menu } = require("electron");
const { Menu } = require("electron");

// // 菜单栏展示
// const template = [
//   {
//     label: "View",
//     submenu: [
//       { role: "reload" },
//       { role: "forcereload" },
//       { role: "toggledevtools" },
//       { type: "separator" },
//       { role: "resetzoom" },
//       { role: "zoomin" },
//       { role: "zoomout" },
//       { type: "separator" },
//       { role: "togglefullscreen" }
//     ]
//   },
//   {
//     role: "window",
//     submenu: [{ role: "minimize" }, { role: "close" }]
//   },
//   {
//     role: "help",
//     submenu: [
//       {
//         label: "Learn More",
//         click() {
//           require("electron").shell.openExternal("https://electronjs.org");
//         }
//       }
//     ]
//   }
// ];

// if (process.platform === "darwin") {
//   template.unshift({
//     label: app.getName(),
//     submenu: [
//       { role: "about" },
//       { type: "separator" },
//       { role: "services" },
//       { type: "separator" },
//       { role: "hide" },
//       { role: "hideothers" },
//       { role: "unhide" },
//       { type: "separator" },
//       { role: "quit" }
//     ]
//   });

//   // Edit menu
//   template[1].submenu.push(
//     { type: "separator" },
//     {
//       label: "Speech",
//       submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
//     }
//   );

//   // Window menu
//   template[3].submenu = [
//     { role: "close" },
//     { role: "minimize" },
//     { role: "zoom" },
//     { type: "separator" },
//     { role: "front" }
//   ];
// }

// const menu = Menu.buildFromTemplate(template);

// 不需要菜单栏
Menu.setApplicationMenu(null);
