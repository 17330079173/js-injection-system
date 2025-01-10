// 用来插入远程脚本的函数
function injectScript(url) {
    var script = document.createElement('script');
    script.src = url; // 设置脚本的远程 URL
    script.type = 'text/javascript';
    script.onload = function() {
        console.log("脚本注入成功！");
    };
    script.onerror = function() {
        console.log("脚本注入失败！");
    };
    document.head.appendChild(script);
}

// 假设远程注入的 JS 地址
var remoteJsUrl = 'http://localhost:3000/remote-script.js'; // 指向后端服务

// 调用注入函数
injectScript(remoteJsUrl);
