// 文件路径：./edge-functions/api/track-page-view.js
// 访问路径：example.com/api/track-page-view
// 功能：记录页面浏览（支持指定页面名称）

export async function onRequest(context) {
  const { my_kv } = context.env; // 获取绑定的 KV 命名空间变量
  
  try {
    // 1. 从请求中获取页面名称
    const url = new URL(context.request.url);
    const page = url.searchParams.get('page') || 'home';
    
    // 2. 构建 KV 的 key（例如：page_view_home）
    const kvKey = `page_view_${page}`;
    
    // 3. 从 KV 读取当前计数
    let count = await my_kv.get(kvKey);
    
    // 4. 如果是第一次访问，初始化为 0
    if (!count) {
      count = 0;
    }
    
    // 5. 计数 +1
    count = parseInt(count) + 1;
    
    // 6. 将新计数写入 KV
    await my_kv.put(kvKey, count.toString());
    
    // 7. 返回成功响应
    return new Response(
      JSON.stringify({
        success: true,
        page: page,
        view_count: count,
        message: '页面浏览已记录'
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
    // 8. 错误处理
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: '记录页面浏览失败'
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
