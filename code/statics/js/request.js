const Request = {};

const url = "http://47.97.169.38:13000/v1/portal";

axios.defaults.headers.common["Authorization"] =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbl9pZCI6IjMiLCJleHAiOjE1NTc2NTM2Mjd9.bBHrm43wIiUWDmFYQGYTI2lMyT8yf7ZH47JGzNrZ8RI";

// 打开外部
Request.openExtral = function(router) {
    console.log(".....s", router);

    ipc.send("open-extral", router);
};

/**
 * 请求所有App 列表
 */
Request.getApps = function() {
    axios
        .post(url, { jsonrpc: "1.0", id: 1, method: "find_left_menu", params: {} })
        .then(function(response) {
            const result = response.data.result;

            if (result.ok) {
                const menuList = result.data.filter(d => d.visibility);

                /* <div class="app-icon" title="Portal"></div> */
                if (menuList.length > 9) {
                    for (let i = 0; i < 10; i++) {
                        var appIcon = document.createElement("div");
                        appIcon.setAttribute("class", "app-icon");
                        appIcon.setAttribute("title", result.data[i].name);
                        appIcon.addEventListener("click", function() {
                            Request.openExtral(result.data[i].route);
                        });
                        document.getElementById("app").appendChild(appIcon);
                    }

                    /* <img class="app-icon view-all" title="View All" alt="view all" src="statics/images/app_all.svg" /> */
                    var appMoreImg = document.createElement("img");
                    appMoreImg.setAttribute("class", "app-icon view-all");
                    appMoreImg.setAttribute("title", "View All");
                    appMoreImg.setAttribute("alt", "View All");
                    appMoreImg.setAttribute("src", "statics/images/app_all.svg");
                    document.getElementById("app").appendChild(appMoreImg);
                } else {
                    menuList.map(d => {
                        var appIcon = document.createElement("div");
                        appIcon.setAttribute("class", "app-icon");
                        appIcon.setAttribute("title", d.name);
                        appIcon.addEventListener("click", function() {
                            Request.openExtral(d.route);
                        });
                        document.getElementById("app").appendChild(appIcon);
                    });
                }
            } else {
                alert("请求报错了");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};

/**
 * 请求所有Shortcut
 */
Request.getShortcuts = function() {
    axios
        .post(url, { jsonrpc: "1.0", id: 1, method: "find_shortcut", params: {} })
        .then(function(response) {
            const result = response.data.result;

            if (result.ok) {
                result.data.map(d => {
                    // <div class="shortcut-icon" title="Portal" />
                    var shortcutIcon = document.createElement("div");
                    shortcutIcon.setAttribute("class", "shortcut-icon");
                    shortcutIcon.setAttribute("title", d.app_name);
                    shortcutIcon.addEventListener("click", () => {
                        // if (confirm("确认要前往？")) {
                        //     Request.openExtral(d.route);
                        // }

                        Request.openExtral(d.route);
                    });
                    document.getElementById("shortcut-images").appendChild(shortcutIcon);

                    // <div class="shortcut-item">
                    //                 <div class="item-logo">
                    //                     <img alt="Logo" src="statics/images/icon.png" />
                    //                 </div>
                    //                 <div class="item-content">
                    //                     <div class="item-name">APQP</div>
                    //                     <div class="item-desc">
                    //                         Create a New Plan
                    //                     </div>
                    //                 </div>
                    //             </div>

                    var shortcutItem = document.createElement("div");
                    shortcutItem.setAttribute("class", "shortcut-item");
                    shortcutItem.addEventListener("click", () => {
                        Request.openExtral(d.route);
                    });

                    var itemLogo = document.createElement("div");
                    itemLogo.setAttribute("class", "item-logo");
                    shortcutItem.appendChild(itemLogo);

                    var itemContent = document.createElement("div");
                    itemContent.setAttribute("class", "item-content");
                    var itemName = document.createElement("div");
                    itemName.setAttribute("class", "item-name");
                    itemName.innerHTML = d.app_name;
                    itemContent.appendChild(itemName);

                    var itemDesc = document.createElement("div");
                    itemDesc.setAttribute("class", "item-desc");
                    itemDesc.innerHTML = d.title;
                    itemContent.appendChild(itemDesc);

                    shortcutItem.appendChild(itemContent);

                    document.getElementById("shortcut-detail").appendChild(shortcutItem);
                });
            } else {
                alert("请求报错了");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};

/**
 * 请求todo list 列表
 */
Request.getTodoTasks = function() {
    axios
        .post(url, {
            jsonrpc: "1.0",
            id: 1,
            method: "find_tasks",
            params: {
                task: {
                    task_type: "100",
                    page: 1,
                    page_size: 10000000
                }
            }
        })
        .then(function(response) {
            const result = response.data.result;

            if (result.ok) {
                //   <div class="list-item">
                //     <div class="item-header">
                //         <img alt="logo" src="public/portal_icon.png" />
                //         <div></div>
                //         <p>APQP / Approval / Leave</p>
                //         <span>10min</span>
                //     </div>
                //     <div class="item-desc">
                //         Master Wang of the Ministry of Engineering sent a request for approval of workflow
                //     </div>
                // </div>

                currentMessageCount = result.data.content.length;

                if (result.data.content.length === 0) {
                    document.getElementById("list").style.display = "none";
                    document.getElementsByClassName("noTask")[0].style.display = "block";
                } else {
                    document.getElementById("list").style.display = "block";
                    document.getElementsByClassName("noTask")[0].style.display = "none";

                    result.data.content.map(d => {
                        var listItem = document.createElement("div");
                        listItem.setAttribute("class", "list-item");
                        listItem.addEventListener("click", function() {
                            Request.openExtral("/bpmn/tasks");
                        });

                        var itemHeader = document.createElement("div");
                        itemHeader.setAttribute("class", "item-header");

                        itemHeader.appendChild(document.createElement("div"));
                        var itemName = document.createElement("p");
                        itemName.innerHTML = d.app_name + "/" + d.process_name + "/" + d.task_name;
                        itemName.setAttribute("title", d.app_name + "/" + d.process_name + "/" + d.task_name);

                        itemHeader.appendChild(itemName);
                        var itemTime = document.createElement("span");
                        itemTime.innerHTML = d.due_date;
                        itemHeader.appendChild(itemTime);

                        listItem.appendChild(itemHeader);

                        var itemDesc = document.createElement("div");
                        itemDesc.setAttribute("class", "item-desc");
                        itemDesc.innerHTML = d.description;

                        listItem.appendChild(itemDesc);

                        document.getElementById("list").appendChild(listItem);
                    });
                }
            } else {
                alert("请求报错了");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};

/**
 * 请求todo Task的数量
 */
Request.getTodoCount = function() {
    console.log("task Count", new Date().getSeconds());
    axios
        .post(url, { jsonrpc: "1.0", id: 1, method: "task_count", params: {} })
        .then(function(response) {
            const result = response.data.result;

            if (result.ok) {
                const todoCount = result.data.todo_count;
                if (todoCount - currentMessageCount > 0) {
                    document.getElementsByClassName("unread")[0].style.display = "block";
                    document.getElementsByClassName("unread")[0].innerHTML = todoCount - currentMessageCount;
                } else {
                    document.getElementsByClassName("unread")[0].style.display = "none";
                }
            } else {
                alert("请求报错了");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};
