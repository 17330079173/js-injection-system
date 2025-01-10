const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const port = 3000;

// 解析 JSON 数据
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// 存储注入的脚本
let scripts = {};

// 提供一个页面，让用户输入 JS 代码
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'inject-form.html'));
});

// 接收和保存用户输入的 JS 代码
app.post('/inject', (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).send('No JavaScript code provided.');
    }

    // 为每个脚本生成一个唯一 ID
    const scriptId = Date.now();
    scripts[scriptId] = code;

    // 返回脚本 ID，以便前端请求该脚本
    res.json({ scriptId });
});

// 提供用户提交的 JavaScript 代码
app.get('/inject/:id', (req, res) => {
    const scriptId = req.params.id;
    const code = scripts[scriptId];

    if (!code) {
        return res.status(404).send('Script not found.');
    }

    res.setHeader('Content-Type', 'application/javascript');
    res.send(code);
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
