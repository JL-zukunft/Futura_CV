/**
 * ============================================
 * Portfolio API 客户端
 * ============================================
 * 功能：封装所有与后端 API 的交互
 * 使用：在 portfolio.html 中引入此文件
 * ============================================
 */

// API 基础 URL（部署后替换为实际的 Workers URL）
const API_BASE_URL = 'https://portfolio-api.your-domain.workers.dev';

// 生成访客唯一标识（浏览器指纹）
function generateVisitorId() {
  // 简单实现：使用随机 ID + 时间戳
  // 生产环境可以使用更复杂的指纹算法
  let visitorId = localStorage.getItem('portfolio_visitor_id');
  
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('portfolio_visitor_id', visitorId);
  }
  
  return visitorId;
}

// 通用请求函数
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const config = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// ============================================
// API 调用函数
// ============================================

/**
 * 获取所有案例列表
 * @returns {Promise<Array>} 案例列表
 */
async function getCases() {
  const response = await apiRequest('/api/cases');
  return response.data || [];
}

/**
 * 获取单个案例详情
 * @param {number} caseId - 案例 ID
 * @returns {Promise<Object>} 案例详情
 */
async function getCaseDetail(caseId) {
  const response = await apiRequest(`/api/cases/${caseId}`);
  return response.data;
}

/**
 * 记录页面访问
 * @param {string} page - 页面 URL
 * @param {number} duration - 停留时间（秒）
 */
async function trackVisit(page, duration = 0) {
  const visitorId = generateVisitorId();
  
  await apiRequest('/api/track/visit', {
    method: 'POST',
    body: JSON.stringify({
      visitorId,
      page,
      duration,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    })
  });
}

/**
 * 记录案例浏览
 * @param {number} caseId - 案例 ID
 * @param {number} duration - 浏览时长（秒）
 */
async function trackCaseView(caseId, duration = 0) {
  const visitorId = generateVisitorId();
  
  await apiRequest('/api/track/case-view', {
    method: 'POST',
    body: JSON.stringify({
      visitorId,
      caseId,
      duration
    })
  });
}

/**
 * 获取统计数据
 * @returns {Promise<Object>} 统计数据
 */
async function getStats() {
  const response = await apiRequest('/api/stats');
  return response.data;
}

/**
 * 获取翻译内容
 * @param {string} lang - 语言代码 (zh/en)
 * @returns {Promise<Object>} 翻译内容对象
 */
async function getTranslations(lang = 'zh') {
  const response = await apiRequest(`/api/translations?lang=${lang}`);
  return response.data;
}

/**
 * 获取网站配置
 * @returns {Promise<Object>} 配置对象
 */
async function getConfig() {
  const response = await apiRequest('/api/config');
  return response.data;
}

/**
 * 渲染案例卡片到页面
 * @param {Array} cases - 案例列表
 * @param {string} containerSelector - 容器选择器
 */
function renderCases(cases, containerSelector = '.cases-accordion') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error('Container not found:', containerSelector);
    return;
  }
  
  // 清空容器
  container.innerHTML = '';
  
  // 生成案例卡片 HTML
  cases.forEach((caseItem, index) => {
    const cardHtml = createCaseCard(caseItem, index);
    container.insertAdjacentHTML('beforeend', cardHtml);
  });
  
  // 添加占位卡片
  const placeholderHtml = `
    <div class="case-accordion-item case-accordion-placeholder" data-case="placeholder">
      <div class="case-accordion-header">
        <div class="case-accordion-image"></div>
        <div class="case-accordion-title">更多案例</div>
        <div class="case-accordion-subtitle">Coming Soon</div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', placeholderHtml);
}

/**
 * 创建单个案例卡片的 HTML
 * @param {Object} caseItem - 案例数据
 * @param {number} index - 索引
 * @returns {string} HTML 字符串
 */
function createCaseCard(caseItem, index) {
  const { id, title, subtitle, cover_image, tabs = [] } = caseItem;
  
  // 生成标签页
  const tabsHtml = tabs.map((tab, tabIndex) => `
    <button class="case-tab ${tabIndex === 0 ? 'active' : ''}" data-tab="${tab.tab_name}">
      ${tab.tab_label}
    </button>
  `).join('');
  
  // 生成标签页内容
  const tabContentsHtml = tabs.map((tab, tabIndex) => `
    <div class="case-tab-content ${tabIndex === 0 ? 'active' : ''}" data-content="${tab.tab_name}">
      ${tab.content}
    </div>
  `).join('');
  
  return `
    <div class="case-accordion-item ${index === 0 ? 'active' : ''}" data-case="${index}">
      <div class="case-accordion-header">
        <div class="case-accordion-image" style="background-image: url('${cover_image || '/images/default-cover.jpg'}')"></div>
        <div class="case-accordion-title">${title}</div>
        <div class="case-accordion-subtitle">${subtitle || ''}</div>
      </div>
      
      <div class="case-accordion-detail">
        <div class="case-tabs">
          ${tabsHtml}
        </div>
        
        <div class="case-tab-contents">
          ${tabContentsHtml}
        </div>
        
        <button class="case-accordion-btn" data-case-id="${id}">
          <span data-zh="查看详情" data-en="Explore Project">查看详情</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * 更新页面文本内容（多语言切换）
 * @param {Object} translations - 翻译对象
 */
function updatePageTexts(translations) {
  // 更新所有带 data-zh 和 data-en 属性的元素
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (key && translations[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = translations[key];
      } else {
        el.textContent = translations[key];
      }
    }
  });
  
  // 更新导航链接
  document.querySelectorAll('[data-section]').forEach(link => {
    const section = link.getAttribute('data-section');
    const key = `nav.${section}`;
    if (translations[key]) {
      link.textContent = translations[key];
    }
  });
}

/**
 * 初始化访客追踪
 */
function initVisitorTracking() {
  const startTime = Date.now();
  let lastPage = window.location.pathname;
  
  // 页面加载时记录访问
  trackVisit(lastPage, 0);
  
  // 页面卸载时记录停留时间
  window.addEventListener('beforeunload', () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    trackVisit(lastPage, duration);
  });
  
  // 页面切换时记录
  window.addEventListener('popstate', () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    trackVisit(lastPage, duration);
    lastPage = window.location.pathname;
    trackVisit(lastPage, 0);
  });
}

/**
 * 初始化案例浏览追踪
 */
function initCaseViewTracking() {
  // 监听案例卡片点击
  document.querySelectorAll('.case-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = btn.getAttribute('data-case-id');
      if (caseId) {
        // 开始计时
        const startTime = Date.now();
        
        // 监听浮层关闭
        const checkInterval = setInterval(() => {
          const floatingLayer = document.getElementById('floatingLayer');
          if (floatingLayer && !floatingLayer.classList.contains('open')) {
            const duration = Math.floor((Date.now() - startTime) / 1000);
            trackCaseView(caseId, duration);
            clearInterval(checkInterval);
          }
        }, 1000);
      }
    });
  });
}

/**
 * 初始化 API 客户端
 */
async function initApiClient() {
  try {
    console.log('Initializing Portfolio API Client...');
    
    // 1. 获取案例数据并渲染
    const cases = await getCases();
    if (cases.length > 0) {
      renderCases(cases);
    }
    
    // 2. 初始化访客追踪
    initVisitorTracking();
    
    // 3. 初始化案例浏览追踪
    initCaseViewTracking();
    
    console.log('Portfolio API Client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize API Client:', error);
  }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApiClient);
} else {
  initApiClient();
}
