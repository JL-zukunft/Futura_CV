/**
 * FuturaCV 案例详情页生成器
 * 
 * 使用方法：
 * 1. 在 cases/ 目录下创建案例文档（JSON 格式）
 * 2. 运行此脚本自动生成 HTML 详情页
 * 3. 生成的文件位于 cases/ 目录
 */

const fs = require('fs');
const path = require('path');

// 案例数据目录
const CASES_DIR = path.join(__dirname, '..', 'cases');
const TEMPLATE_FILE = path.join(__dirname, '..', 'code.html');

/**
 * 生成案例详情页 HTML
 * @param {Object} caseData - 案例数据对象
 * @param {String} template - HTML 模板
 * @returns {String} 生成的 HTML 内容
 */
function generateCasePage(caseData, template) {
  let html = template;

  // 替换标题
  html = html.replace(/<title>.*?<\/title>/, `<title>${caseData.title} | 江来 Futura</title>`);
  
  // 替换案例编号
  html = html.replace(/CASE 01/, `CASE ${caseData.caseNumber.toString().padStart(2, '0')}`);
  
  // 替换项目名称
  html = html.replace(/Content Strategy AI/g, caseData.projectName);
  
  // 替换主标题
  const titleMatch = html.match(/<h1 class="text-5xl.*?>([\s\S]*?)<\/h1>/);
  if (titleMatch) {
    html = html.replace(titleMatch[0], `
      <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-8">
        ${caseData.mainTitle}
      </h1>
    `);
  }
  
  // 替换 Challenge
  html = html.replace(/品牌团队内部内容需求持续增长.*?核心矛盾.*?"/, caseData.challenge);
  
  // 替换 Approach
  html = html.replace(/建立基于品牌资产库的 AI Agent 生产集群.*?灵魂与商业逻辑。/, caseData.approach);
  
  // 替换问题解构标题
  html = html.replace(/问题解构与能力映射/, caseData.frameworkTitle);
  
  // 替换 Framework 内容
  const frameworkItems = caseData.frameworkItems.map((item, index) => `
    <div class="bg-white p-6 border border-futura-border rounded-sm hover:border-futura-green transition-all">
      <span class="text-futura-green font-bold text-sm mb-2 block">${item.number}</span>
      <h5 class="font-bold text-sm mb-2">${item.title}</h5>
      <p class="text-[11px] text-futura-text-light">${item.description}</p>
    </div>
  `).join('\n');
  
  const frameworkMatch = html.match(/(<div class="grid grid-cols-1 md:grid-cols-4 gap-4">)([\s\S]*?)(<\/div>)/);
  if (frameworkMatch) {
    html = html.replace(frameworkMatch[0], frameworkMatch[1] + frameworkItems + frameworkMatch[3]);
  }
  
  // 替换方法论标题
  html = html.replace(/核心实施方案/, caseData.methodologyTitle);
  
  // 替换 Methodology 内容
  const methodologyItems = caseData.methodologyItems.map((item, index) => `
    <div class="relative flex gap-8 z-10 group">
      <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-futura-green flex items-center justify-center text-futura-green font-bold text-sm transition-all group-hover:bg-futura-green group-hover:text-white">
        ${(index + 1).toString().padStart(2, '0')}
      </div>
      <div class="flex-1">
        <h3 class="text-xl font-bold mb-3">${item.title}</h3>
        <p class="text-futura-text-light text-sm mb-6">${item.description}</p>
        ${item.tags ? `
        <div class="flex flex-wrap gap-3">
          ${item.tags.map(tag => `<span class="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider">${tag}</span>`).join('')}
        </div>
        ` : ''}
      </div>
    </div>
  `).join('\n');
  
  const methodologyMatch = html.match(/(<div class="relative flex flex-col gap-12 mt-12">)([\s\S]*?)(<\/div>.*?<!-- END: Solutions -->)/s);
  if (methodologyMatch) {
    html = html.replace(methodologyMatch[0], methodologyMatch[1] + methodologyItems + methodologyMatch[3]);
  }
  
  // 替换 KPI 标题
  html = html.replace(/项目交付成果/, caseData.kpiTitle);
  
  // 替换 KPI 指标
  const kpiItems = caseData.kpiMetrics.map((metric, index) => `
    <div class="border-l-2 border-futura-green pl-6">
      <span class="block text-5xl font-black mb-1 tracking-tighter">${metric.value}</span>
      <p class="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold">${metric.label}</p>
      <p class="text-xs text-gray-300 leading-relaxed">${metric.description}</p>
    </div>
  `).join('\n');
  
  const kpiMatch = html.match(/(<div class="lg:col-span-5 flex flex-col gap-10 py-2">)([\s\S]*?)(<\/div>.*?<!-- END: Outcomes -->)/s);
  if (kpiMatch) {
    html = html.replace(kpiMatch[0], kpiMatch[1] + kpiItems + kpiMatch[3]);
  }
  
  // 替换侧边栏项目选择器
  const projectItems = caseData.allCases.map((c, index) => {
    const isActive = c.id === caseData.id;
    return `
      <div class="${isActive ? 'border-l-2 border-futura-green pl-3' : 'pl-3 opacity-60 hover:opacity-100'}">
        <p class="text-xs font-bold tracking-tight ${isActive ? 'text-futura-dark' : 'text-futura-text-light'}">${c.name}</p>
        ${!isActive ? `<a href="${c.id}.html" class="mt-2 block text-[10px] text-futura-text-light hover:text-futura-green">查看案例 →</a>` : ''}
      </div>
    `;
  }).join('\n');
  
  html = html.replace(/(<div class="group cursor-pointer">)([\s\S]*?)(<\/div>.*?<!-- Project Switcher -->)/s, 
    `$1${projectItems}$3`);
  
  // 替换侧边栏 Outline 链接
  html = html.replace(/href="#overview"/g, `href="#overview"`);
  
  // 替换底部返回链接
  html = html.replace(/href="#">Back to Portfolio/, 'href="../index.html">Back to Portfolio');
  
  return html;
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始生成案例详情页...\n');
  
  // 读取模板
  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error('❌ 模板文件不存在:', TEMPLATE_FILE);
    return;
  }
  
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  
  // 检查案例目录
  if (!fs.existsSync(CASES_DIR)) {
    fs.mkdirSync(CASES_DIR, { recursive: true });
    console.log('📁 创建案例目录:', CASES_DIR);
  }
  
  // 读取所有案例数据
  const caseFiles = fs.readdirSync(CASES_DIR).filter(file => file.endsWith('.json'));
  
  if (caseFiles.length === 0) {
    console.log('⚠️️  未找到案例 JSON 文件，请先在 cases/ 目录下创建案例数据文件');
    return;
  }
  
  console.log(`✅ 找到 ${caseFiles.length} 个案例文件\n`);
  
  // 读取所有案例数据
  const allCases = caseFiles.map(file => {
    const filePath = path.join(CASES_DIR, file);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  });
  
  // 生成每个案例的 HTML
  caseFiles.forEach((file, index) => {
    const filePath = path.join(CASES_DIR, file);
    const caseData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // 添加所有案例列表到数据中
    caseData.allCases = allCases;
    
    console.log(`📄 生成案例 ${index + 1}/${caseFiles.length}: ${caseData.projectName}`);
    
    const html = generateCasePage(caseData, template);
    
    // 保存 HTML 文件
    const outputFile = path.join(CASES_DIR, `${caseData.id}.html`);
    fs.writeFileSync(outputFile, html, 'utf-8');
    
    console.log(`   ✅ 生成成功：${outputFile}\n`);
  });
  
  console.log('🎉 所有案例详情页生成完成！\n');
}

// 运行
main();
