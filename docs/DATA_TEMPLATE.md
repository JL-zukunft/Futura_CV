# EasyFolio 数据格式模板

## 数据结构说明

EasyFolio 使用标准的 JSON 格式来存储个人信息、教育经历、工作经历、技能和项目数据。

## 完整数据模板

```json
{
  "personal": {
    "name": "您的姓名",
    "title": "职位 / 专业身份",
    "email": "your.email@example.com",
    "phone": "+86 138-0000-0000",
    "location": "城市, 国家",
    "bio": "简短的个人简介，2-3句话，突出您的核心优势和专业领域。",
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
      "description": "在校期间的主要成就、项目或相关课程描述"
    }
  ],
  "experience": [
    {
      "company": "公司名称",
      "position": "职位",
      "startDate": "2022-07",
      "endDate": "至今",
      "description": "工作描述，概述您的主要职责和工作内容",
      "achievements": [
        "成就1：具体描述您的成果，使用量化数据更佳",
        "成就2：突出您的贡献和影响力"
      ]
    }
  ],
  "skills": [
    {
      "name": "技能名称",
      "level": "熟练程度：入门 / 进阶 / 专家",
      "category": "分类：前端 / 后端 / 设计 / 产品 / 其他"
    }
  ],
  "projects": [
    {
      "title": "项目名称",
      "description": "项目描述，简要说明项目背景和目标",
      "date": "2023-06",
      "technologies": ["技术1", "技术2", "技术3"],
      "link": "https://project-link.com",
      "image": "assets/images/project-cover.jpg",
      "mindmap": "cases/mindmaps/project-canvas.canvas"
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

## 字段说明

### personal（个人信息）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | ✅ | 您的姓名 |
| title | string | ✅ | 职位或专业身份 |
| email | string | ✅ | 联系邮箱 |
| phone | string | ⚪ | 联系电话 |
| location | string | ⚪ | 所在城市 |
| bio | string | ✅ | 简短的个人简介（2-3句话） |
| social | object | ⚪ | 社交媒体链接 |
| social.linkedin | string | ⚪ | LinkedIn链接 |
| social.github | string | ⚪ | GitHub链接 |
| social.portfolio | string | ⚪ | 作品集链接 |

### education（教育经历）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| institution | string | ✅ | 学校名称 |
| degree | string | ✅ | 学位（本科、硕士、博士等） |
| field | string | ✅ | 专业 |
| startDate | string | ✅ | 开始日期（格式：YYYY-MM） |
| endDate | string | ✅ | 结束日期（格式：YYYY-MM，"至今"表示在读） |
| description | string | ⚪ | 在校期间的主要成就、项目或课程 |

### experience（工作经历）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| company | string | ✅ | 公司名称 |
| position | string | ✅ | 职位 |
| startDate | string | ✅ | 开始日期（格式：YYYY-MM） |
| endDate | string | ✅ | 结束日期（格式：YYYY-MM，"至今"表示在职） |
| description | string | ⚪ | 工作描述，概述主要职责 |
| achievements | string[] | ⚪ | 成就列表，建议使用量化数据 |

### skills（技能）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | ✅ | 技能名称 |
| level | string | ✅ | 熟练程度：入门 / 进阶 / 专家 |
| category | string | ✅ | 分类：前端 / 后端 / 设计 / 产品 / 其他 |

### projects（项目）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | ✅ | 项目名称 |
| description | string | ✅ | 项目描述，说明背景和目标 |
| date | string | ✅ | 项目日期（格式：YYYY-MM） |
| technologies | string[] | ✅ | 使用的技术栈 |
| link | string | ⚪ | 项目链接 |
| image | string | ⚪ | 项目封面图片路径 |
| mindmap | string | ⚪ | 思维导图文件路径 |

### config（配置）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| language | string | ✅ | 默认语言："zh"（中文）或 "en"（英文） |
| analytics | boolean | ⚪ | 是否启用数据统计 |
| edgeAcceleration | boolean | ⚪ | 是否启用边缘加速 |

## 使用示例

### 示例1：设计师个人信息

```json
{
  "personal": {
    "name": "张明",
    "title": "UI/UX 产品设计师",
    "email": "zhang.design@example.com",
    "bio": "专注于用户体验设计，拥有5年互联网产品设计经验，擅长从0到1的产品设计和设计系统搭建。",
    "social": {
      "linkedin": "https://linkedin.com/in/zhangming",
      "portfolio": "https://zhang.design"
    }
  }
}
```

### 示例2：开发者项目

```json
{
  "projects": [
    {
      "title": "电商平台重构",
      "description": "为某知名电商平台进行移动端体验重构，提升用户转化率30%",
      "date": "2023-08",
      "technologies": ["React", "TypeScript", "Node.js", "MongoDB"],
      "link": "https://github.com/username/ecommerce-refactor"
    }
  ]
}
```

## 注意事项

1. **日期格式**：统一使用 YYYY-MM 格式，例如 "2023-06"
2. **技能分类**：建议使用标准分类：前端、后端、设计、产品、其他
3. **成就描述**：尽量使用量化数据，例如"提升用户转化率30%"
4. **图片路径**：建议使用相对路径，例如 "assets/images/avatar.jpg"
5. **文件保存**：建议保存为 config.json 或 personal.json

## 下一步

编辑好数据后，可以运行案例生成器来生成您的个人作品集网站！
