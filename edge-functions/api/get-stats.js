// 文件路径：./edge-functions/api/get-stats.js
// 访问路径：example.com/api/get-stats
// 功能：获取所有统计数据（访客数、页面浏览等）

export async function onRequest(context) {
  const { my_kv } = context.env; // 获取绑定的 KV 命名空间变量
  
  try {
    // 1. 读取访客计数
    let visitorCount = await my_kv.get('visitor_count') || 0;
    
    // 2. 读取各个页面的浏览次数
    let pageViewHome = await my_kv.get('page_view_home') || 0;
    let pageViewCases = await my_kv.get('page_view_cases') || 0;
    let pageViewContact = await my_kv.get('page_view_contact') || 0;
    
    // 3. 计算总浏览次数
    let totalViews = parseInt(pageViewHome) + parseInt(pageViewCases) + parseInt(pageViewContact);
    
    // 4. 返回统计数据
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          visitor_count: parseInt(visitorCount),
          page_views: {
            home: parseInt(pageViewHome),
            cases: parseInt(pageViewCases),
            contact: parseInt(pageViewContact),
            total: totalViews
          }
        },
        message: '获取统计数据成功'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    
  } catch (error) {
    // 5. 错误处理
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: '获取统计数据失败'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
