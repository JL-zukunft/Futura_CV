# 示例项目

EasyFolio 提供了三个精心设计的示例项目，涵盖设计师、开发者和求职者三个典型角色。你可以直接套用这些模板，快速创建你的个人作品集！

---

## 目录
1. [设计师示例](#设计师示例)
2. [开发者示例](#开发者示例)
3. [求职者示例](#求职者示例)
4. [如何使用示例](#如何使用示例)

---

## 设计师示例

### 角色介绍
**姓名：** 张明  
**职位：** UI/UX 产品设计师  
**经验：** 5年互联网产品设计经验

### 核心特点
- 作品集展示优先
- 强调视觉效果
- 案例卡片设计
- 设计工具技能展示

### 配置示例

```json
{
  "personal": {
    "name": "张明",
    "title": "UI/UX 产品设计师",
    "email": "zhang.design@example.com",
    "location": "上海, 中国",
    "bio": "专注于用户体验设计，拥有5年互联网产品设计经验，擅长从0到1的产品设计和设计系统搭建。",
    "social": {
      "linkedin": "https://linkedin.com/in/zhangming",
      "portfolio": "https://zhang.design"
    }
  },
  "skills": [
    {
      "name": "Figma",
      "level": "专家",
      "category": "设计"
    },
    {
      "name": "Sketch",
      "level": "进阶",
      "category": "设计"
    },
    {
      "name": "Adobe XD",
      "level": "进阶",
      "category": "设计"
    },
    {
      "name": "Photoshop",
      "level": "专家",
      "category": "设计"
    },
    {
      "name": "用户研究",
      "level": "进阶",
      "category": "设计"
    },
    {
      "name": "设计系统",
      "level": "专家",
      "category": "设计"
    }
  ],
  "projects": [
    {
      "title": "电商平台 App 重设计",
      "description": "为某知名电商平台进行移动端体验重构，优化用户购物流程，提升用户转化率30%",
      "date": "2023-08",
      "technologies": ["Figma", "Principle", "After Effects"],
      "image": "assets/images/design-project-1.jpg"
    },
    {
      "title": "企业 SaaS 设计系统",
      "description": "搭建企业级设计系统，包含100+组件，统一产品视觉语言，提升团队协作效率50%",
      "date": "2023-03",
      "technologies": ["Figma", "Storybook", "Zeroheight"],
      "image": "assets/images/design-project-2.jpg"
    },
    {
      "title": "健康管理 App",
      "description": "从0到1设计健康管理应用，覆盖用户全旅程，获得App Store健康类Top 10",
      "date": "2022-11",
      "technologies": ["Figma", "Maze", "Hotjar"],
      "image": "assets/images/design-project-3.jpg"
    }
  ]
}
```

### 文件位置
- `cases/designer/` - 设计师示例完整文件

---

## 开发者示例

### 角色介绍
**姓名：** 李华  
**职位：** 全栈开发工程师  
**经验：** 4年软件开发经验

### 核心特点
- 技术栈展示
- 开源项目突出
- GitHub 链接集成
- 代码示例展示

### 配置示例

```json
{
  "personal": {
    "name": "李华",
    "title": "全栈开发工程师",
    "email": "li.dev@example.com",
    "location": "深圳, 中国",
    "bio": "热爱技术的全栈开发者，专注于 Web 应用开发和云原生技术，拥有4年软件开发经验。",
    "social": {
      "github": "https://github.com/lihua",
      "linkedin": "https://linkedin.com/in/lihua"
    }
  },
  "skills": [
    {
      "name": "React",
      "level": "专家",
      "category": "前端"
    },
    {
      "name": "TypeScript",
      "level": "专家",
      "category": "前端"
    },
    {
      "name": "Node.js",
      "level": "进阶",
      "category": "后端"
    },
    {
      "name": "Python",
      "level": "进阶",
      "category": "后端"
    },
    {
      "name": "PostgreSQL",
      "level": "进阶",
      "category": "后端"
    },
    {
      "name": "Docker",
      "level": "进阶",
      "category": "其他"
    },
    {
      "name": "AWS",
      "level": "入门",
      "category": "其他"
    }
  ],
  "projects": [
    {
      "title": "在线协作平台",
      "description": "实时协作白板应用，支持多人同时编辑，使用 WebSocket 实现实时同步",
      "date": "2023-10",
      "technologies": ["React", "Node.js", "WebSocket", "Redis"],
      "link": "https://github.com/lihua/collab-board"
    },
    {
      "title": "API网关",
      "description": "高性能 API 网关，支持限流、熔断、负载均衡，日处理请求1000万+",
      "date": "2023-05",
      "technologies": ["Go", "Redis", "etcd"],
      "link": "https://github.com/lihua/api-gateway"
    },
    {
      "title": "个人博客系统",
      "description": "基于 Next.js 的静态博客系统，支持 Markdown，暗色模式，SEO 优化",
      "date": "2022-12",
      "technologies": ["Next.js", "MDX", "Tailwind CSS"],
      "link": "https://github.com/lihua/blog"
    }
  ]
}
```

### 文件位置
- `cases/developer/` - 开发者示例完整文件

---

## 求职者示例

### 角色介绍
**姓名：** 王芳  
**职位：** 市场营销专员  
**经验：** 3年营销工作经验

### 核心特点
- 工作经历详细
- 成就数据量化
- 软技能展示
- 教育背景突出

### 配置示例

```json
{
  "personal": {
    "name": "王芳",
    "title": "市场营销专员",
    "email": "wang.marketing@example.com",
    "phone": "+86 139-0000-0000",
    "location": "北京, 中国",
    "bio": "热情开朗的市场营销专员，拥有3年品牌营销和社交媒体运营经验，擅长数据驱动的营销策略制定。",
    "social": {
      "linkedin": "https://linkedin.com/in/wangfang"
    }
  },
  "education": [
    {
      "institution": "中国人民大学",
      "degree": "硕士",
      "field": "市场营销",
      "startDate": "2017-09",
      "endDate": "2019-06",
      "description": "GPA: 3.8/4.0，优秀毕业生"
    },
    {
      "institution": "北京大学",
      "degree": "学士",
      "field": "广告学",
      "startDate": "2013-09",
      "endDate": "2017-06",
      "description": "GPA: 3.6/4.0，学生会宣传部部长"
    }
  ],
  "experience": [
    {
      "company": "某知名互联网公司",
      "position": "市场营销专员",
      "startDate": "2021-03",
      "endDate": "至今",
      "description": "负责品牌营销和社交媒体运营",
      "achievements": [
        "策划并执行3次大型营销活动，品牌曝光量提升200%",
        "运营官方微信公众号，粉丝从10万增长至50万",
        "建立数据分析体系，营销ROI提升40%"
      ]
    },
    {
      "company": "某4A广告公司",
      "position": "客户执行",
      "startDate": "2019-07",
      "endDate": "2021-02",
      "description": "服务多个知名品牌客户",
      "achievements": [
        "独立负责5个品牌客户的日常维护",
        "参与策划10+营销方案，客户满意度95%",
        "获得年度最佳新人奖"
      ]
    }
  ],
  "skills": [
    {
      "name": "品牌营销",
      "level": "专家",
      "category": "产品"
    },
    {
      "name": "社交媒体运营",
      "level": "专家",
      "category": "产品"
    },
    {
      "name": "数据分析",
      "level": "进阶",
      "category": "其他"
    },
    {
      "name": "文案写作",
      "level": "专家",
      "category": "设计"
    },
    {
      "name": "活动策划",
      "level": "进阶",
      "category": "产品"
    }
  ]
}
```

### 文件位置
- `cases/job-seeker/` - 求职者示例完整文件

---

## 如何使用示例

### 步骤 1：选择适合的示例

根据你的职业选择：
- 设计师 → 使用设计师示例
- 开发者 → 使用开发者示例
- 求职者 → 使用求职者示例

### 步骤 2：复制示例文件

```bash
# 复制示例到根目录
cp cases/designer/config.json .
cp cases/designer/index.html .
```

### 步骤 3：修改个人信息

1. 打开复制的 `config.json`
2. 将示例信息替换为你的真实信息
3. 保存文件

### 步骤 4：预览和部署

按照 QUICKSTART.md 的步骤预览和部署！

---

## 自定义建议

### 设计师
- 添加更多高质量的项目图片
- 展示设计稿的前后对比
- 链接到 Behance、Dribbble 等平台

### 开发者
- 添加 GitHub 贡献图
- 展示开源项目的 Star 数量
- 添加技术博客链接

### 求职者
- 详细描述工作成就，用量化数据
- 添加证书和荣誉
- 展示语言能力

---

需要更多帮助？查看 USER_MANUAL.md 了解详细配置说明！
