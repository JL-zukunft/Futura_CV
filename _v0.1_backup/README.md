# EasyFolio - 个人作品集生成工具

轻量级但完整的个人作品集生成工具，让你快速创建专业的个人作品集网站。

## ✨ 特性

- 🚀 **零代码** - 不需要编程知识，10分钟即可完成
- 🎨 **美观设计** - 现代化界面，响应式布局
- 📱 **多设备适配** - 完美适配桌面、平板、手机
- 🌐 **多平台部署** - 支持 GitHub Pages、Vercel、Netlify、EdgeOne Pages
- 🤖 **AI 辅助** - Coze Agent 帮助你快速生成内容
- 📄 **多种案例** - 设计师、开发者、求职者三种模板

## 🎯 快速开始

### 1. 获取代码

```bash
# 方式一：下载 ZIP（推荐新手）
# 访问项目仓库，点击 Code → Download ZIP

# 方式二：Git 克隆
git clone <repository-url>
cd easyfolio
```

### 2. 配置个人信息

**方式一：使用 Coze Agent（推荐）**

1. 打开 [COZE_AGENT_GUIDE.md](./COZE_AGENT_GUIDE.md)
2. 访问 Coze Agent
3. 粘贴你的简历，获取 JSON 数据
4. 保存为 `config.json`

**方式二：手动配置**

参考 [DATA_TEMPLATE.md](./DATA_TEMPLATE.md) 创建配置文件。

### 3. 本地预览

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve
```

然后在浏览器中打开：`http://localhost:8000`

### 4. 部署上线

推荐使用 GitHub Pages，最简单免费！详细步骤请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

## 📚 文档

- [快速入门指南](./QUICKSTART.md) - 10分钟完成你的第一个作品集
- [用户手册](./USER_MANUAL.md) - 完整的功能说明
- [部署指南](./DEPLOYMENT_GUIDE.md) - 4种平台的详细部署步骤
- [常见问题](./FAQ.md) - 25个常见问题解答
- [示例项目](./EXAMPLES.md) - 设计师、开发者、求职者三种示例
- [Coze Agent 使用指南](./COZE_AGENT_GUIDE.md) - AI 辅助内容生成
- [数据格式模板](./DATA_TEMPLATE.md) - 配置文件说明

## 🏗️ 项目结构

```
easyfolio/
├── index.html                    # 主页面
├── README.md                     # 本文件
├── QUICKSTART.md                 # 快速入门
├── USER_MANUAL.md                # 用户手册
├── FAQ.md                        # 常见问题
├── DEPLOYMENT_GUIDE.md           # 部署指南
├── COZE_AGENT_GUIDE.md           # Coze Agent 指南
├── DATA_TEMPLATE.md              # 数据格式模板
├── EXAMPLES.md                   # 示例项目
├── case-generator/              # 案例生成器
│   └── generate-cases.js        # 生成脚本
├── cases/                        # 案例文件
│   ├── case-01.md
│   ├── case-02.md
│   └── ...
└── assets/                       # 静态资源
    ├── css/
    ├── js/
    └── images/
```

## 🚀 部署平台

| 平台 | 难度 | 免费 | 推荐指数 |
|------|------|------|---------|
| GitHub Pages | ⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐ | ✅ | ⭐⭐⭐⭐ |
| Netlify | ⭐⭐ | ✅ | ⭐⭐⭐⭐ |
| EdgeOne Pages | ⭐⭐⭐ | ✅ | ⭐⭐⭐ |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💡 设计理念

- **简单但强大** - 基础功能易用，高级功能可选
- **不做过度封装** - 保持代码的可定制性
- **灵活利用外部平台** - 不重复造轮子

## 👥 适用人群

- 🎨 **设计师** - 展示作品
- 💻 **开发者** - 展示项目和技能
- 🎯 **求职者** - 打造专业形象
- 📈 **自由职业者** - 建立个人品牌

## 📞 联系方式

如有问题，请提交 Issue 或查看文档。

---

**开始你的作品集之旅吧！** 🎉
