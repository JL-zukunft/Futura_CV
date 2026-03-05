# 思维导图生成指南

## 1. 技术方案概述

利用Obsidian Canvas画布结合插件生成思维导图，实现案例的问题解构与能力映射的可视化呈现。

## 2. Obsidian Canvas 基本结构

Obsidian Canvas文件（.canvas）是一个JSON格式的文件，包含以下结构：

```json
{
  "nodes": [
    {
      "id": "n1",
      "type": "text",
      "x": 0,
      "y": 0,
      "width": 200,
      "height": 100,
      "text": "节点文本",
      "color": "#4a5d3e",
      "fontSize": 16,
      "textAlign": "center",
      "verticalAlign": "middle"
    }
  ],
  "edges": [
    {
      "id": "e1",
      "fromNode": "n1",
      "fromSide": "bottom",
      "toNode": "n2",
      "toSide": "top",
      "color": "#4a5d3e",
      "width": 2
    }
  ]
}
```

## 3. 数据结构设计

### 3.1 节点类型

| 节点类型 | 描述 | 颜色方案 |
|---------|------|----------|
| 根节点 | 案例主标题 | #4a5d3e（主色） |
| 能力节点 | 问题解构与能力映射 | #5c7249（次要色） |
| 方案节点 | 核心实施方案 | #2d5016（强调色） |
| 成果节点 | 项目交付成果 | #6b7164（中性色） |

### 3.2 连接关系

| 连接类型 | 描述 | 颜色方案 |
|---------|------|----------|
| 根节点到能力节点 | 问题拆解路径 | #4a5d3e |
| 能力节点到方案节点 | 解决方案路径 | #2d5016 |
| 方案节点到成果节点 | 成果输出路径 | #6b7164 |

## 4. 实现方法

### 4.1 手动创建

1. 在Obsidian中创建新的Canvas文件
2. 添加文本节点，输入案例信息
3. 连接节点，建立逻辑关系
4. 调整布局和样式

### 4.2 自动生成

使用以下步骤从案例MD文件生成Canvas文件：

1. 解析MD文件内容
2. 提取案例标题、能力项、方案和成果
3. 生成Canvas JSON结构
4. 保存为.canvas文件

## 5. 推荐插件

### 5.1 Obsidian插件

| 插件名称 | 功能 | 推荐理由 |
|---------|------|----------|
| Canvas | 核心画布功能 | 提供基本的画布编辑能力 |
| Canvas Enhancer | 增强画布功能 | 添加更多样式和布局选项 |
| Mind Map | 思维导图支持 | 提供思维导图专用工具 |
| Excalidraw | 手绘风格 | 支持更自由的绘图和样式 |

### 5.2 外部工具

| 工具名称 | 功能 | 推荐理由 |
|---------|------|----------|
| Draw.io | 流程图工具 | 支持导入/导出Canvas格式 |
| Mermaid | 图表生成 | 支持代码生成图表 |
| PlantUML | UML图表 | 支持复杂的图表类型 |

## 6. 最佳实践

### 6.1 布局原则

1. **层次分明**：根节点在上，能力节点在中，方案节点在下
2. **间距合理**：节点之间保持适当间距，避免拥挤
3. **方向一致**：连接方向保持一致，通常从左到右或从上到下
4. **颜色编码**：使用统一的颜色方案，增强视觉识别

### 6.2 内容组织

1. **简洁明了**：每个节点文本保持简洁，突出重点
2. **逻辑清晰**：连接关系反映真实的逻辑流程
3. **层次分明**：使用不同的节点大小和样式表示层级关系
4. **信息完整**：包含所有关键信息，但避免过度细节

### 6.3 维护管理

1. **版本控制**：使用Git管理Canvas文件的版本
2. **定期更新**：当案例内容更新时，同步更新Canvas文件
3. **备份存储**：定期备份Canvas文件，避免数据丢失
4. **命名规范**：使用与案例ID一致的命名方式

## 7. 示例文件

- `case-01.canvas`：案例1的思维导图示例

## 8. 技术实现示例

以下是一个简单的Node.js脚本示例，用于从MD文件生成Canvas文件：

```javascript
const fs = require('fs');
const path = require('path');

function generateCanvasFromMD(mdFilePath, canvasFilePath) {
  const mdContent = fs.readFileSync(mdFilePath, 'utf-8');
  
  // 解析MD内容
  const frontmatterMatch = mdContent.match(/^---\n([\s\S]*?)\n---\n/);
  const frontmatter = {};
  
  if (frontmatterMatch) {
    const frontmatterContent = frontmatterMatch[1];
    const lines = frontmatterContent.split('\n');
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        frontmatter[match[1]] = match[2];
      }
    });
  }
  
  // 生成Canvas结构
  const canvas = {
    nodes: [
      {
        id: "n1",
        type: "text",
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        text: frontmatter.title || "案例标题",
        color: "#4a5d3e",
        fontSize: 16,
        textAlign: "center",
        verticalAlign: "middle"
      }
      // 添加更多节点...
    ],
    edges: []
  };
  
  // 保存Canvas文件
  fs.writeFileSync(canvasFilePath, JSON.stringify(canvas, null, 2), 'utf-8');
  console.log(`Canvas file generated: ${canvasFilePath}`);
}

// 使用示例
generateCanvasFromMD('cases/case-01.md', 'cases/case-01.canvas');
```

## 9. 注意事项

1. **性能考虑**：Canvas文件过大可能影响Obsidian性能，建议保持节点数量合理
2. **兼容性**：确保使用的插件与Obsidian版本兼容
3. **导出选项**：如需导出为其他格式，可使用Obsidian的导出功能或第三方工具
4. **协作编辑**：多人协作时注意文件冲突，建议使用版本控制系统

## 10. 未来扩展

1. **自动化工具**：开发更完善的工具，自动从案例MD文件生成Canvas文件
2. **交互式展示**：将Canvas文件集成到网页中，实现交互式展示
3. **模板系统**：创建思维导图模板，提高创建效率
4. **数据可视化**：结合其他数据可视化工具，增强展示效果

---

此指南旨在帮助团队利用Obsidian Canvas生成专业、美观的思维导图，提升案例展示的可视化效果。