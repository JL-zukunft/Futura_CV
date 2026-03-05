# 快速入门指南 - 10分钟完成你的第一个作品集

欢迎使用 EasyFolio！本指南将帮助你在10分钟内创建并部署你的个人作品集。

## 目录
1. [准备工作（1分钟）](#1-准备工作1分钟)
2. [获取代码（1分钟）](#2-获取代码1分钟)
3. [配置个人信息（3分钟）](#3-配置个人信息3分钟)
4. [生成作品集（1分钟）](#4-生成作品集1分钟)
5. [本地预览（1分钟）](#5-本地预览1分钟)
6. [部署上线（3分钟）](#6-部署上线3分钟)

---

## 1. 准备工作（1分钟）

确保你已准备好以下工具：

- 一个文本编辑器（推荐 VS Code）
- Node.js（用于运行案例生成器，可选）
- GitHub 账号（用于部署，推荐）

---

## 2. 获取代码（1分钟）

### 方式一：下载压缩包（最简单）

1. 访问项目仓库
2. 点击 **Code** → **Download ZIP**
3. 解压到本地文件夹

### 方式二：Git 克隆

```bash
git clone <repository-url>
cd easyfolio
```

---

## 3. 配置个人信息（3分钟）

### 3.1 准备你的信息

准备以下内容：
- 姓名和职位
- 联系方式（邮箱、电话）
- 个人简介（2-3句话）
- 教育经历
- 工作经历
- 技能列表
- 项目经验

### 3.2 使用 Coze Agent 辅助（推荐）

不想手动写？使用我们的 Coze Agent：

1. 打开 [COZE_AGENT_GUIDE.md](./COZE_AGENT_GUIDE.md)
2. 访问 Coze Agent
3. 粘贴你的简历，获取 JSON 数据
4. 保存为 `config.json`

### 3.3 手动配置（替代方案）

复制 `DATA_TEMPLATE.md` 中的模板，创建 `config.json` 并填入你的信息。

---

## 4. 生成作品集（1分钟）

如果你使用了案例生成器：

```bash
cd case-generator
node generate-cases.js
```

生成的 HTML 文件会出现在根目录。

**或者**，直接编辑 `index.html`，替换示例内容为你的信息。

---

## 5. 本地预览（1分钟）

### 使用 Python（推荐）

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 使用 Node.js

```bash
npx serve
```

然后在浏览器中打开：`http://localhost:8000`

---

## 6. 部署上线（3分钟）

推荐使用 GitHub Pages，最简单免费！

### 步骤

1. **创建 GitHub 仓库**
   - 登录 GitHub
   - 点击 **New repository**
   - 命名为 `easyfolio` 或你的用户名
   - 设为 Public

2. **上传代码**
   - 将所有文件上传到仓库

3. **启用 GitHub Pages**
   - 进入仓库 **Settings**
   - 点击左侧 **Pages**
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main` 或 `master`
   - 点击 **Save**

4. **等待部署**
   - 1-3 分钟后，页面会显示访问地址
   - 格式：`https://<username>.github.io/<repo>/`

详细步骤请参阅 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 恭喜！🎉

你已经成功创建并部署了你的第一个个人作品集！

### 下一步

- 阅读 [USER_MANUAL.md](./USER_MANUAL.md) 了解更多功能
- 查看 [FAQ.md](./FAQ.md) 解答常见问题
- 参考 [EXAMPLES.md](./EXAMPLES.md) 查看示例项目

---

## 需要帮助？

- 查看文档：[README.md](./README.md)
- 常见问题：[FAQ.md](./FAQ.md)
- 部署指南：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
