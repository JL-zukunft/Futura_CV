/**
 * ============================================
 * 腾讯云云开发数据库初始化脚本
 * ============================================
 * 使用方法：
 * 1. 登录腾讯云云开发控制台
 * 2. 进入数据库管理
 * 3. 执行此脚本创建集合和索引
 * ============================================
 */

const cloud = require('@cloudbase/node-sdk');

// 初始化 SDK
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV,  // 当前环境
  credentials: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY
  }
});

const db = app.database();
const _ = db.command;

// ============================================
// 数据库集合同义表（MySQL 表 → MongoDB 集合）
// ============================================
// cases → cases
// case_tabs → caseTabs
// case_images → caseImages
// visitors → visitors
// page_views → pageViews
// case_views → caseViews
// translations → translations
// site_config → siteConfig
// ai_generations → aiGenerations
// ============================================

async function initDatabase() {
  console.log('开始初始化数据库...');
  
  try {
    // 1. 创建案例集合
    await createCasesCollection();
    
    // 2. 创建案例标签页集合
    await createCaseTabsCollection();
    
    // 3. 创建案例图片集合
    await createCaseImagesCollection();
    
    // 4. 创建访客集合
    await createVisitorsCollection();
    
    // 5. 创建页面浏览集合
    await createPageViewsCollection();
    
    // 6. 创建案例浏览集合
    await createCaseViewsCollection();
    
    // 7. 创建翻译集合
    await createTranslationsCollection();
    
    // 8. 创建系统配置集合
    await createSiteConfigCollection();
    
    // 9. 插入初始数据
    await insertInitialData();
    
    console.log('✅ 数据库初始化完成！');
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  }
}

// ============================================
// 创建集合和索引
// ============================================

async function createCasesCollection() {
  console.log('创建 cases 集合...');
  
  // 创建集合
  await db.createCollection('cases');
  
  // 创建索引
  await db.collection('cases').createIndex({
    is_published: 1,
    order_num: 1
  }, { unique: false });
  
  console.log('✓ cases 集合创建成功');
}

async function createCaseTabsCollection() {
  console.log('创建 caseTabs 集合...');
  
  await db.createCollection('caseTabs');
  
  await db.collection('caseTabs').createIndex({
    case_id: 1
  }, { unique: false });
  
  console.log('✓ caseTabs 集合创建成功');
}

async function createCaseImagesCollection() {
  console.log('创建 caseImages 集合...');
  
  await db.createCollection('caseImages');
  
  await db.collection('caseImages').createIndex({
    case_id: 1
  }, { unique: false });
  
  console.log('✓ caseImages 集合创建成功');
}

async function createVisitorsCollection() {
  console.log('创建 visitors 集合...');
  
  await db.createCollection('visitors');
  
  await db.collection('visitors').createIndex({
    visitor_id: 1
  }, { unique: true });
  
  await db.collection('visitors').createIndex({
    last_visit: -1
  }, { unique: false });
  
  console.log('✓ visitors 集合创建成功');
}

async function createPageViewsCollection() {
  console.log('创建 pageViews 集合...');
  
  await db.createCollection('pageViews');
  
  await db.collection('pageViews').createIndex({
    visitor_id: 1,
    viewed_at: -1
  }, { unique: false });
  
  await db.collection('pageViews').createIndex({
    page_url: 1,
    viewed_at: -1
  }, { unique: false });
  
  console.log('✓ pageViews 集合创建成功');
}

async function createCaseViewsCollection() {
  console.log('创建 caseViews 集合...');
  
  await db.createCollection('caseViews');
  
  await db.collection('caseViews').createIndex({
    case_id: 1,
    viewed_at: -1
  }, { unique: false });
  
  console.log('✓ caseViews 集合创建成功');
}

async function createTranslationsCollection() {
  console.log('创建 translations 集合...');
  
  await db.createCollection('translations');
  
  await db.collection('translations').createIndex({
    lang_code: 1,
    translation_key: 1
  }, { unique: true });
  
  console.log('✓ translations 集合创建成功');
}

async function createSiteConfigCollection() {
  console.log('创建 siteConfig 集合...');
  
  await db.createCollection('siteConfig');
  
  await db.collection('siteConfig').createIndex({
    config_key: 1
  }, { unique: true });
  
  console.log('✓ siteConfig 集合创建成功');
}

// ============================================
// 插入初始数据
// ============================================

async function insertInitialData() {
  console.log('插入初始数据...');
  
  // 1. 插入默认翻译（中文）
  await db.collection('translations').add({
    lang_code: 'zh',
    translation_key: 'nav.cases',
    translation_value: '案例',
    category: 'nav',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'zh',
    translation_key: 'nav.method',
    translation_value: '方法论',
    category: 'nav',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'zh',
    translation_key: 'nav.contact',
    translation_value: '联系',
    category: 'nav',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'zh',
    translation_key: 'btn.view_cases',
    translation_value: '看看案例',
    category: 'button',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'zh',
    translation_key: 'btn.contact',
    translation_value: '联系我',
    category: 'button',
    updated_at: new Date()
  });
  
  // 2. 插入默认翻译（英文）
  await db.collection('translations').add({
    lang_code: 'en',
    translation_key: 'nav.cases',
    translation_value: 'Cases',
    category: 'nav',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'en',
    translation_key: 'nav.method',
    translation_value: 'Method',
    category: 'nav',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'en',
    translation_key: 'nav.contact',
    translation_value: 'Contact',
    category: 'nav',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'en',
    translation_key: 'btn.view_cases',
    translation_value: 'View Cases',
    category: 'button',
    updated_at: new Date()
  });
  
  await db.collection('translations').add({
    lang_code: 'en',
    translation_key: 'btn.contact',
    translation_value: 'Contact Me',
    category: 'button',
    updated_at: new Date()
  });
  
  // 3. 插入系统配置
  await db.collection('siteConfig').add({
    config_key: 'site.title',
    config_value: 'Futura | 消费品 × AI',
    description: '网站标题',
    updated_at: new Date()
  });
  
  await db.collection('siteConfig').add({
    config_key: 'site.description',
    config_value: '消费品×AI 产品设计师',
    description: '网站描述',
    updated_at: new Date()
  });
  
  await db.collection('siteConfig').add({
    config_key: 'site.language',
    config_value: 'zh',
    description: '默认语言',
    updated_at: new Date()
  });
  
  await db.collection('siteConfig').add({
    config_key: 'analytics.enabled',
    config_value: 'true',
    description: '是否启用统计',
    updated_at: new Date()
  });
  
  console.log('✓ 初始数据插入完成');
}

// ============================================
// 执行初始化
// ============================================

// 如果直接运行此脚本
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('🎉 数据库初始化成功！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 初始化失败:', error);
      process.exit(1);
    });
}

module.exports = { initDatabase };
