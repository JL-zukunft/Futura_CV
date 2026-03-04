# FuturaCV 案例详情页生成系统

## 📁 文件结构

```
e:\00jobs\self_html/
├── index.html                      # 首页（案例列表）
├── code.html                       # 详情页模板文件
├── cases/                          # 案例相关文件目录
│   ├── case-01.json               # 案例 1 数据
│   ├── case-01.html               # 生成的案例 1 详情页
│   ├── case-02.json               # 案例 2 数据
│   ├── case-02.html               # 生成的案例 2 详情页
│   ├── case-03.json               # 案例 3 数据
│   ├── case-03.html               # 生成的案例 3 详情页
│   ├── case-04.json               # 案例 4 数据
│   └── case-04.html               # 生成的案例 4 详情页
└── case-generator/
    └── generate-cases.js          # 案例生成器脚本
```

---

## 🚀 快速开始

### 1. 创建新的案例详情页

**Step 1: 创建案例数据文件**

在 `cases/` 目录下创建 JSON 文件，例如 `case-05.json`：

```json
{
  "id": "case-05",
  "caseNumber": 5,
  "title": "您的案例标题",
  "projectName": "项目名称",
  "mainTitle": "主标题（支持 HTML）",
  "challenge": "挑战描述",
  "approach": "方法描述",
  "frameworkTitle": "框架标题",
  "frameworkItems": [
    {
      "number": "01. 标题",
      "title": "小标题",
      "description": "描述文字"
    }
  ],
  "methodologyTitle": "方法论标题",
  "methodologyItems": [
    {
      "title": "方案标题",
      "description": "方案描述",
      "tags": ["Tag1", "Tag2"]
    }
  ],
  "kpiTitle": "KPI 标题",
  "kpiMetrics": [
    {
      "value": "10x",
      "label": "指标名称",
      "description": "指标描述"
    }
  ]
}
```

**Step 2: 运行生成器**

在项目根目录运行：

```bash
node case-generator/generate-cases.js
```

**Step 3: 查看生成的页面**

生成的 HTML 文件位于 `cases/case-05.html`

---

## 📝 JSON 字段说明

### 必填字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | string | 案例唯一标识 | `"case-05"` |
| `caseNumber` | number | 案例编号 | `5` |
| `title` | string | 案例短标题 | `"AI 内容策略" |
| `projectName` | string | 项目名称 | `"Content AI"` |
| `mainTitle` | string | 主标题（可含 HTML） | `"标题<br/><span>副标题</span>"` |
| `challenge` | string | 挑战描述 | `"问题描述..."` |
| `approach` | string | 解决方案描述 | `"方法描述..."` |

### Framework 框架部分

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `frameworkTitle` | string | 框架部分标题 |
| `frameworkItems` | array | 框架项目数组 |

**frameworkItems 项目结构：**
```json
{
  "number": "01. 拆解",
  "title": "业务场景拆解",
  "description": "描述文字"
}
```

### Methodology 方法论部分

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `methodologyTitle` | string | 方法论部分标题 |
| `methodologyItems` | array | 方法论项目数组 |

**methodologyItems 项目结构：**
```json
{
  "title": "方案标题",
  "description": "方案描述",
  "tags": ["Tag1", "Tag2"]  // 可选
}
```

### KPI 成果部分

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `kpiTitle` | string | KPI 部分标题 |
| `kpiMetrics` | array | KPI 指标数组 |

**kpiMetrics 项目结构：**
```json
{
  "value": "10x",
  "label": "Efficiency Gain",
  "description": "详细描述"
}
```

---

## 🎨 功能特性

### ✅ 已实现功能

1. **首页案例卡片点击跳转**
   - 点击"查看详情"按钮跳转到对应详情页
   - 按钮点击动画效果（缩放反馈）

2. **页面过渡动画**
   - 页面加载淡入 + 上滑动画
   - 平滑过渡效果（iOS/Google 风格）

3. **详情页案例选择器**
   - 左上角显示所有案例列表
   - 当前案例高亮显示
   - 点击其他案例快速跳转

4. **返回功能**
   - 详情页底部 BACK 按钮
   - 点击返回首页

5. **响应式设计**
   - 适配手机/平板/桌面
   - 自动调整布局和字体

---

## 🔄 更新现有案例

**修改案例内容：**
1. 编辑对应的 JSON 文件（如 `case-01.json`）
2. 重新运行生成器
3. 刷新页面查看更新

**修改模板样式：**
1. 编辑 `code.html` 模板
2. 重新运行生成器（会覆盖现有 HTML）
3. 或手动更新已生成的 HTML

---

## 💡 最佳实践

### 1. 内容编写建议

- **mainTitle**: 控制在 20 字以内，支持 HTML 标签
- **challenge**: 描述痛点，突出矛盾
- **approach**: 清晰阐述解决方案
- **frameworkItems**: 4 个为佳，保持对称
- **methodologyItems**: 2-3 个核心方案
- **kpiMetrics**: 3 个量化指标最有说服力

### 2. 文案技巧

- 使用具体数字（如 "10x"、"47%"）
- 突出前后对比
- 用商业语言而非技术术语
- 强调可量化的价值

### 3. 注意事项

- JSON 中的引号需要转义：`\"`
- 支持 HTML 标签的字段：`mainTitle`
- 所有字段都必填，避免页面显示空白

---

## 🛠️ 高级定制

### 修改模板布局

编辑 `code.html` 文件：
- 修改 CSS 变量调整配色
- 调整 HTML 结构改变布局
- 添加新的内容区块

### 添加新功能

在 `generate-cases.js` 中添加替换逻辑：

```javascript
// 示例：添加自定义内容
html = html.replace(/<!-- Custom Content -->/, caseData.customContent);
```

---

## 📊 示例案例

项目中已包含 4 个完整示例：

1. **case-01**: AI 内容策略引擎（内容生成）
2. **case-02**: 零售 UX 转型（用户体验）
3. **case-03**: 可持续供应链 AI（供应链优化）
4. **case-04**: AI Agent 工作流（自动化系统）

参考这些案例的 JSON 结构来创建您的新案例。

---

## 🐛 故障排查

### 生成器报错

**问题：** `JSON.parse` 错误
**解决：** 检查 JSON 格式，确保引号已转义

**问题：** 模板文件不存在
**解决：** 确认 `code.html` 在项目根目录

### 页面显示异常

**问题：** 样式错乱
**解决：** 检查 Tailwind CSS CDN 是否正常加载

**问题：** 内容缺失
**解决：** 检查 JSON 字段名是否与模板匹配

---

## 📞 技术支持

如有问题，请检查：
1. Node.js 版本 >= 14
2. 所有依赖文件存在
3. JSON 格式正确

---

**祝您创建出精彩的案例展示！** 🎉
