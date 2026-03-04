// 文件路径：./edge-functions/api/get-visitor-count.js
// 访问路径：example.com/api/get-visitor-count
// 功能：获取当前访客计数

export async function onRequest(context) {
  const { my_kv } = context.env; // 获取绑定的 KV 命名空间变量
  
  try {
    // 1. 从 KV 读取访客计数
    let count = await my_kv.get('visitor_count');
    
    // 2. 如果是第一次访问，初始化为 0
    if (!count) {
      count = 0;
    }
    
    // 3. 返回成功响应
    return new Response(
      JSON.stringify({
        success: true,
        visitor_count: parseInt(count),
        message: '获取成功'
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
    // 4. 错误处理
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: '获取访客计数失败'
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
