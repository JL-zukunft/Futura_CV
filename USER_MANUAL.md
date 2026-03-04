# EasyFolio 用户手册

## 目录
1. [产品介绍](#产品介绍)
2. [项目结构](#项目结构)
3. [配置详解](#配置详解)
4. [高级功能](#高级功能)
5. [自定义主题](#自定义主题)
6. [常见操作](#常见操作)

---

## 产品介绍

EasyFolio 是一个轻量级、易用的个人作品集生成工具，专为设计师、开发者和求职者设计。

### 核心特性
- 🚀 **零代码** - 不需要编程知识
- 🎨 **美观设计** - 现代化界面
- 📱 **响应式** - 完美适配各种设备
- 🌐 **多平台部署** - 支持 GitHub Pages、Vercel 等
- 🤖 **AI 辅助** - Coze Agent 帮助生成内容
- 📄 **多种案例** - 设计师、开发者、求职者模板

### 设计理念
- **简单但强大** - 基础功能易用，高级功能可选
- **不做过度封装** - 保持代码的可定制性
- **灵活利用外部平台** - 不重复造轮子

---

## 项目结构

```
easyfolio/
├── index.html                    # 主页面
├── config.json                   # 个人配置（可选）
├── README.md                     # 项目说明
├── QUICKSTART.md                 # 快速入门
├── USER_MANUAL.md                # 用户手册（本文件）
├── FAQ.md                        # 常见问题
├── DEPLOYMENT_GUIDE.md           # 部署指南
├── COZE_AGENT_GUIDE.md           # Coze Agent 使用指南
├── DATA_TEMPLATE.md              # 数据格式模板
├── EXAMPLES.md                   # 示例项目
├── case-generator/              # 案例生成器
│   ├── generate-cases.js        # 生成脚本
│   └── templates/               # 模板文件
├── cases/                        # 案例文件
│   ├── designer/                # 设计师案例
│   ├── developer/               # 开发者案例
│   └── job-seeker/              # 求职者案例
└── assets/                       # 静态资源
    ├── css/
    ├── js/
    └── images/
```

---

## 配置详解

### config.json 完整说明

```json
{
  "personal": {
    "name": "你的姓名",
    "title": "你的职位",
    "email": "your@email.com",
    "phone": "+86 138-0000-0000",
    "location": "北京, 中国",
    "bio": "个人简介，2-3句话",
    "social": {
      "linkedin": "https://linkedin.com/in/yourprofile",
      "github": "https://github.com/yourusername",
      "portfolio": "https://yourportfolio.com"
    }
  },
  "education": [
    {
      "institution": "学校名称",
      "degree": "学位",
      "field": "专业",
      "startDate": "2018-09",
      "endDate": "2022-06",
      "description": "在校成就描述"
    }
  ],
  "experience": [
    {
      "company": "公司名称",
      "position": "职位",
      "startDate": "2022-07",
      "endDate": "至今",
      "description": "工作描述",
      "achievements": ["成就1", "成就2"]
    }
  ],
  "skills": [
    {
      "name": "技能名称",
      "level": "入门/进阶/专家",
      "category": "前端/后端/设计/产品/其他"
    }
  ],
  "projects": [
    {
      "title": "项目名称",
      "description": "项目描述",
      "date": "2023-06",
      "technologies": ["React", "Node.js"],
      "link": "https://project-link.com",
      "image": "assets/images/project.jpg",
      "mindmap": "cases/mindmaps/project.canvas"
    }
  ],
  "theme": "default",
  "config": {
    "language": "zh",
    "analytics": true,
    "edgeAcceleration": false
  }
}
```

### 字段详细说明

#### personal（个人信息）
- **name**: 你的姓名（必填）
- **title**: 你的职位或专业身份（必填）
- **email**: 联系邮箱（必填）
- **phone**: 联系电话（可选）
- **location**: 所在城市（可选）
- **bio**: 个人简介，2-3句话（必填）
- **social**: 社交媒体链接（可选）

#### education（教育经历）
- **institution**: 学校名称（必填）
- **degree**: 学位（必填）
- **field**: 专业（必填）
- **startDate**: 开始日期，格式 YYYY-MM（必填）
- **endDate**: 结束日期，"至今"表示在读（必填）
- **description**: 在校成就描述（可选）

#### experience（工作经历）
- **company**: 公司名称（必填）
- **position**: 职位（必填）
- **startDate**: 开始日期（必填）
- **endDate**: 结束日期，"至今"表示在职（必填）
- **description**: 工作描述（可选）
- **achievements**: 成就列表，建议使用量化数据（可选）

#### skills（技能）
- **name**: 技能名称（必填）
- **level**: 熟练程度：入门/进阶/专家（必填）
- **category**: 分类：前端/后端/设计/产品/其他（必填）

#### projects（项目）
- **title**: 项目名称（必填）
- **description**: 项目描述（必填）
- **date**: 项目日期（必填）
- **technologies**: 使用的技术栈（必填）
- **link**: 项目链接（可选）
- **image**: 项目封面图片（可选）
- **mindmap**: 思维导图文件路径（可选）

---

## 高级功能

### 1. 多语言支持

在 `config.json` 中设置语言：

```json
{
  "config": {
    "language": "zh"  // 或 "en"
  }
}
```

### 2. 自定义图片

将图片放入 `assets/images/` 文件夹，然后在 `config.json` 中引用：

```json
{
  "projects": [
    {
      "image": "assets/images/my-project.jpg"
    }
  ]
}
```

### 3. 思维导图集成

使用 Obsidian Canvas 创建思维导图，保存到 `cases/mindmaps/`，然后在项目中引用：

```json
{
  "projects": [
    {
      "mindmap": "cases/mindmaps/my-project.canvas"
    }
  ]
}
```

### 4. 数据统计

启用 Google Analytics：

```json
{
  "config": {
    "analytics": true
  }
}
```

在 `index.html` 中配置你的 GA ID。

---

## 自定义主题

### 修改配色

编辑 `assets/css/style.css` 中的 CSS 变量：

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --text-color: #1f2937;
  --background-color: #ffffff;
}
```

### 自定义字体

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

---

## 常见操作

### 添加新技能

在 `config.json` 的 `skills` 数组中添加：

```json
{
  "name": "Vue.js",
  "level": "进阶",
  "category": "前端"
}
```

### 添加新项目

在 `config.json` 的 `projects` 数组中添加：

```json
{
  "title": "新电商平台",
  "description": "从零构建的电商平台，支持多商户",
  "date": "2024-01",
  "technologies": ["React", "Node.js", "MongoDB"],
  "link": "https://github.com/username/ecommerce"
}
```

### 更新作品集内容

1. 修改 `config.json` 或 `index.html`
2. 如果使用生成器，重新运行 `node case-generator/generate-cases.js`
3. 提交代码到 Git 仓库
4. 平台会自动重新部署

---

## 获取帮助

- 快速入门：[QUICKSTART.md](./QUICKSTART.md)
- 常见问题：[FAQ.md](./FAQ.md)
- 部署指南：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Coze Agent：[COZE_AGENT_GUIDE.md](./COZE_AGENT_GUIDE.md)
