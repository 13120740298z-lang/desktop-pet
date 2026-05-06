# 🐱 小U桌面宠物

> 一个基于 Electron + AI 的可爱桌面宠物应用

![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-20+-green)

## ✨ 特性

- 🤖 **AI 对话** - 基于 Claude 大模型的智能对话
- 🎨 **精美界面** - 纯 CSS 绘制的可爱少女角色
- 🎭 **动态表情** - 眨眼、挥手、漂浮动画
- 💕 **情绪系统** - 心情气泡实时更新
- 🌟 **粒子效果** - 浮动装饰点缀界面
- 🪟 **窗口控制** - 最小化/关闭/托盘运行
- ⌨️ **快捷键** - `Ctrl+Shift+U` 切换显示

## 🚀 快速开始

### 开发模式
```bash
npm install
npm start
```

### 构建 Windows 安装包
```bash
npm run build
```

## 📂 项目结构

```
├── src/
│   ├── main.js        # Electron 主进程
│   ├── preload.js     # 预加载脚本
│   ├── index.html      # 应用界面
│   └── assets/         # 资源文件
├── .github/
│   └── workflows/
│       └── build.yml  # GitHub Actions 构建流程
├── package.json
└── README.md
```

## 🎮 操作说明

| 操作 | 方法 |
|------|------|
| 打开对话 | 点击小U 或 底部输入框 |
| 发送消息 | 输入文字 + 回车 或 点击发送 |
| 隐藏窗口 | 点击关闭按钮 / 托盘图标 |
| 全局切换 | `Ctrl+Shift+U` |

## 🔧 配置

API 已在代码中预配置：
- 地址: `https://token-plan-cn.xiaomimimo.com/v1`
- 模型: `anthropic/claude-3-5-sonnet-20241022`

## 📦 GitHub Actions 自动构建

推送代码到 `main` 分支后会自动构建 Windows 安装包：

1. 进入项目的 **Actions** 页面查看构建进度
2. 构建完成后在 **Artifacts** 下载安装包
3. 运行安装即可

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
