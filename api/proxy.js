// 该服务为 vercel serve跨域处理
import createProxyMiddleware from 'http-proxy-middleware'
module.exports = (req, res) => {
  let target = ''
  if (req.url.startsWith('/bing')) { 
    target = 'https://cn.bing.com' //这里就是在vite中配置的一样
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      '^/bing/': '/'
    }
  })(req, res)
}