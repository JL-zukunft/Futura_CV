# 多平台部署指南

## 概述

EasyFolio 支持四种主流的静态网站部署平台，每种平台都有其独特的优势。本指南将帮助您选择最适合自己的部署方式。

## 平台对比

| 平台 | 免费额度 | 自定义域名 | CDN加速 | 易用性 | 推荐指数 |
|------|---------|-----------|---------|--------|---------|
| GitHub Pages | 无限 | ✅ | ❌ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Vercel | 无限 | ✅ | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Netlify | 无限 | ✅ | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| EdgeOne Pages | 免费版 | ✅ | ✅ | ⭐⭐⭐ | ⭐⭐⭐ |

## 推荐部署顺序

对于新手，建议按以下顺序尝试：
1. **GitHub Pages** - 最简单，与GitHub完美集成
2. **Vercel** - 功能强大，体验极佳
3. **Netlify** - 配置灵活
4. **EdgeOne Pages** - 适合国内用户

---

## GitHub Pages 部署指南

### 优势
- 完全免费
- 与GitHub完美集成
- 支持自定义域名
- 全球CDN（通过GitHub）

### 步骤

#### 1. 准备代码仓库

1. 在 GitHub 上创建新仓库
2. 将 EasyFolio 代码推送到仓库

#### 2. 启用 GitHub Pages

1. 进入仓库的 **Settings**
2. 找到 **Pages** 选项（在左侧菜单）
3. 在 **Build and deployment** 部分：
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main` 或 `master` 分支
   - Folder: 选择 `/ (root)`
4. 点击 **Save**

#### 3. 等待部署完成

- GitHub 会自动开始部署
- 通常需要 1-3 分钟
- 部署完成后，页面会显示访问地址：`https://<username>.github.io/<repo>/`

#### 4. 配置自定义域名（可选）

1. 在 Pages 设置页面的 **Custom domain** 部分
2. 输入您的域名
3. 点击 **Save**
4. 在域名 DNS 提供商处添加 CNAME 记录，指向 `<username>.github.io`

---

## Vercel 部署指南

### 优势
- 完全免费
- 自动 HTTPS
- 全球边缘网络
- 自动部署（Git 推送时）
- 预览部署功能

### 步骤

#### 1. 准备

1. 访问 https://vercel.com
2. 注册/登录账号（推荐使用 GitHub 账号）

#### 2. 导入项目

1. 点击 **Add New Project**
2. 在 **Import Git Repository** 中找到您的 EasyFolio 仓库
3. 点击 **Import**

#### 3. 配置项目

- **Project Name**: 输入项目名称（自动生成访问地址）
- **Framework Preset**: 选择 `Other`
- **Root Directory**: 保持默认
- **Build Command**: 留空（不需要构建）
- **Output Directory**: 留空
- **Install Command**: 留空

#### 4. 部署

1. 点击 **Deploy**
2. 等待 1-2 分钟
3. 部署完成后会显示访问地址

#### 5. 配置自定义域名（可选）

1. 进入项目的 **Settings** → **Domains**
2. 输入您的域名
3. 按照提示配置 DNS

---

## Netlify 部署指南

### 优势
- 完全免费
- 拖拽部署
- 表单处理
- 自动 HTTPS
- 全球 CDN

### 步骤

#### 方式一：Git 部署（推荐）

1. 访问 https://netlify.com
2. 注册/登录账号
3. 点击 **Add new site** → **Import an existing project**
4. 选择 GitHub（或其他 Git 提供商）
5. 授权并选择 EasyFolio 仓库
6. 配置部署设置：
   - **Build command**: 留空
   - **Publish directory**: 留空（或输入 `.`）
7. 点击 **Deploy site**

#### 方式二：拖拽部署（最简单）

1. 访问 https://app.netlify.com/drop
2. 将整个 EasyFolio 文件夹拖拽到页面上
3. 等待上传完成
4. 获得访问地址

#### 配置自定义域名

1. 进入站点设置 → **Domain management**
2. 点击 **Add custom domain**
3. 输入域名并按提示配置 DNS

---

## EdgeOne Pages 部署指南

### 优势
- 国内访问速度快
- 腾讯云生态
- 免费额度充足
- 中国大陆 CDN 节点

### 步骤

#### 1. 准备

1. 访问 https://edgeone.qq.com
2. 注册/登录腾讯云账号

#### 2. 创建站点

1. 进入 **Pages** 服务
2. 点击 **新建项目**
3. 选择 **Git 仓库** 或 **直接上传**

#### 3. Git 部署（推荐）

1. 关联 GitHub/GitLab/Gitee 仓库
2. 选择 EasyFolio 仓库
3. 配置构建设置：
   - **框架**: 选择 `静态网站`
   - **构建命令**: 留空
   - **输出目录**: 留空
4. 点击 **开始构建**

#### 4. 配置自定义域名

1. 进入项目设置 → **域名管理**
2. 添加自定义域名
3. 按照提示配置 DNS 解析

---

## 验证部署成功

部署完成后，请检查以下内容：

1. **页面可以正常访问** - 打开部署后的地址
2. **所有资源加载正常** - 检查浏览器控制台是否有错误
3. **响应式布局** - 在不同设备尺寸下测试
4. **链接可跳转** - 测试所有导航链接

## 常见问题

### Q: 部署后页面显示 404？

A: 检查以下几点：
- 确认部署的分支正确
- 确认 index.html 在根目录
- 等待几分钟让部署生效

### Q: 如何更新网站？

A: 根据部署方式：
- **Git 部署**: 推送代码到仓库，自动重新部署
- **拖拽部署**: 重新上传文件夹

### Q: 可以同时部署到多个平台吗？

A: 可以！您可以将同一个仓库同时部署到多个平台。

---

## 下一步

部署成功后，继续阅读快速入门指南开始创作您的作品集！
