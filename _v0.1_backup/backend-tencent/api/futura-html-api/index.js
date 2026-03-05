/**
 * ============================================
 * Portfolio API - 腾讯云云开发版本
 * ============================================
 * 功能：提供案例管理、访客统计、多语言等 API 接口
 * 部署：腾讯云云开发 CloudBase（免费额度：5GB 存储 +500 万读写/月）
 * 数据库：腾讯云云数据库 MongoDB（兼容 MySQL 语法）
 * ============================================
 */

const cloud = require('@cloudbase/node-sdk');

// 初始化 SDK
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV,
  credentials: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY
  }
});

const db = app.database();
const _ = db.command;

// ============================================
// 云函数主入口
// ============================================

exports.main = async (event, context) => {
  const { path, method, headers, body } = event;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Content-Type': 'application/json'
  };
  
  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }
  
  try {
    let result;
    
    if (path === '/api/cases' && method === 'GET') {
      result = await handleGetCases();
    }
    else if (path.match(/^\/api\/cases\/\w+$/) && method === 'GET') {
      const caseId = path.split('/').pop();
      result = await handleGetCaseDetail(caseId);
    }
    else if (path === '/api/track/visit' && method === 'POST') {
      result = await handleTrackVisit(body);
    }
    else if (path === '/api/track/case-view' && method === 'POST') {
      result = await handleTrackCaseView(body);
    }
    else if (path === '/api/stats' && method === 'GET') {
      result = await handleGetStats();
    }
    else if (path === '/api/translations' && method === 'GET') {
      const lang = event.queryStringParameters?.lang || 'zh';
      result = await handleGetTranslations(lang);
    }
    else if (path === '/api/config' && method === 'GET') {
      result = await handleGetConfig();
    }
    else {
      return {
        statusCode: 404,
        headers: corsHeaders,
        data: JSON.stringify({ error: 'Not Found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      data: JSON.stringify(result)
    };
    
  } catch (error) {
    console.error('API Error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      data: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};

// ============================================
// API 处理函数
// ============================================

async function handleGetCases() {
  try {
    const result = await db.collection('cases')
      .where({ is_published: true })
      .orderBy('order_num', 'asc')
      .field({
        _id: false,
        id: true,
        title: true,
        subtitle: true,
        description: true,
        cover_image: true,
        order_num: true,
        created_at: true
      })
      .get();
    
    return {
      success: true,
      data: result.data || []
    };
  } catch (error) {
    console.error('Get cases error:', error);
    throw error;
  }
}

async function handleGetCaseDetail(caseId) {
  try {
    const caseResult = await db.collection('cases')
      .where({
        id: parseInt(caseId),
        is_published: true
      })
      .limit(1)
      .get();
    
    if (!caseResult.data || caseResult.data.length === 0) {
      return {
        success: false,
        error: 'Case not found'
      };
    }
    
    const caseData = caseResult.data[0];
    
    const tabsResult = await db.collection('caseTabs')
      .where({ case_id: parseInt(caseId) })
      .orderBy('sort_order', 'asc')
      .field({
        _id: false,
        id: true,
        tab_name: true,
        tab_label: true,
        content: true,
        sort_order: true
      })
      .get();
    
    const imagesResult = await db.collection('caseImages')
      .where({ case_id: parseInt(caseId) })
      .orderBy('sort_order', 'asc')
      .field({
        _id: false,
        id: true,
        image_url: true,
        alt_text: true
      })
      .get();
    
    return {
      success: true,
      data: {
        ...caseData,
        tabs: tabsResult.data || [],
        images: imagesResult.data || []
      }
    };
  } catch (error) {
    console.error('Get case detail error:', error);
    throw error;
  }
}

async function handleTrackVisit(data) {
  try {
    const { visitorId, page, duration = 0, userAgent = '', referrer = '' } = data;
    
    if (!visitorId || !page) {
      return {
        success: false,
        error: 'Missing required fields: visitorId, page'
      };
    }
    
    const ipAddress = 'unknown';
    
    const visitorExists = await db.collection('visitors')
      .where({ visitor_id: visitorId })
      .count();
    
    if (visitorExists.total > 0) {
      await db.collection('visitors')
        .where({ visitor_id: visitorId })
        .update({
          last_visit: new Date(),
          total_visits: _.inc(1),
          ip_address: ipAddress
        });
    } else {
      await db.collection('visitors').add({
        visitor_id: visitorId,
        ip_address: ipAddress,
        browser_info: userAgent,
        first_visit: new Date(),
        last_visit: new Date(),
        total_visits: 1
      });
    }
    
    await db.collection('pageViews').add({
      visitor_id: visitorId,
      page_url: page,
      duration_seconds: duration,
      user_agent: userAgent,
      referrer: referrer,
      viewed_at: new Date()
    });
    
    return {
      success: true,
      message: 'Visit tracked successfully'
    };
  } catch (error) {
    console.error('Track visit error:', error);
    throw error;
  }
}

async function handleTrackCaseView(data) {
  try {
    const { visitorId, caseId, duration = 0 } = data;
    
    if (!visitorId || !caseId) {
      return {
        success: false,
        error: 'Missing required fields: visitorId, caseId'
      };
    }
    
    await db.collection('caseViews').add({
      case_id: parseInt(caseId),
      visitor_id: visitorId,
      view_duration: duration,
      viewed_at: new Date()
    });
    
    return {
      success: true,
      message: 'Case view tracked successfully'
    };
  } catch (error) {
    console.error('Track case view error:', error);
    throw error;
  }
}

async function handleGetStats() {
  try {
    const totalVisitorsResult = await db.collection('visitors').count();
    const totalVisitors = totalVisitorsResult.total;
    
    const totalViewsResult = await db.collection('pageViews').count();
    const totalViews = totalViewsResult.total;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisitorsResult = await db.collection('pageViews')
      .where({ viewed_at: _.gte(today) })
      .field({ visitor_id: true })
      .get();
    
    const todayVisitors = new Set(todayVisitorsResult.data.map(v => v.visitor_id)).size;
    
    const avgDurationResult = await db.collection('pageViews')
      .where({ duration_seconds: _.gt(0) })
      .field({ duration_seconds: true })
      .get();
    
    const totalDuration = avgDurationResult.data.reduce((sum, v) => sum + v.duration_seconds, 0);
    const avgDuration = avgDurationResult.data.length > 0 
      ? Math.round(totalDuration / avgDurationResult.data.length) 
      : 0;
    
    const popularCasesResult = await db.collection('caseViews')
      .groupBy('case_id')
      .stats({
        views: _.sum(1),
        unique_visitors: _.countDistinct('visitor_id')
      })
      .orderBy('views', 'desc')
      .limit(5)
      .get();
    
    const popularCases = await Promise.all(
      popularCasesResult.data.map(async (stat) => {
        const caseResult = await db.collection('cases')
          .where({ id: stat.case_id })
          .field({ id: true, title: true })
          .limit(1)
          .get();
        
        return {
          id: stat.case_id,
          title: caseResult.data[0]?.title || 'Unknown',
          views: stat.views,
          unique_visitors: stat.unique_visitors
        };
      })
    );
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyStatsResult = await db.collection('pageViews')
      .where({ viewed_at: _.gte(thirtyDaysAgo) })
      .field({ visitor_id: true, viewed_at: true })
      .get();
    
    const dailyStatsMap = {};
    dailyStatsResult.data.forEach(view => {
      const date = new Date(view.viewed_at).toISOString().split('T')[0];
      if (!dailyStatsMap[date]) {
        dailyStatsMap[date] = {
          date,
          visitors: new Set(),
          views: 0
        };
      }
      dailyStatsMap[date].visitors.add(view.visitor_id);
      dailyStatsMap[date].views++;
    });
    
    const dailyStats = Object.values(dailyStatsMap)
      .map(stat => ({
        date: stat.date,
        visitors: stat.visitors.size,
        views: stat.views
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
    
    return {
      success: true,
      data: {
        overview: {
          total_visitors: totalVisitors,
          total_views: totalViews,
          today_visitors: todayVisitors,
          avg_duration_seconds: avgDuration
        },
        popular_cases: popularCases,
        daily_stats: dailyStats
      }
    };
  } catch (error) {
    console.error('Get stats error:', error);
    throw error;
  }
}

async function handleGetTranslations(lang) {
  try {
    const result = await db.collection('translations')
      .where({ lang_code: lang })
      .field({
        _id: false,
        translation_key: true,
        translation_value: true,
        category: true
      })
      .get();
    
    const translations = {};
    result.data.forEach(item => {
      translations[item.translation_key] = item.translation_value;
    });
    
    return {
      success: true,
      data: translations,
      lang: lang
    };
  } catch (error) {
    console.error('Get translations error:', error);
    throw error;
  }
}

async function handleGetConfig() {
  try {
    const result = await db.collection('siteConfig')
      .field({
        _id: false,
        config_key: true,
        config_value: true,
        description: true
      })
      .get();
    
    const config = {};
    result.data.forEach(item => {
      config[item.config_key] = item.config_value;
    });
    
    return {
      success: true,
      data: config
    };
  } catch (error) {
    console.error('Get config error:', error);
    throw error;
  }
}
