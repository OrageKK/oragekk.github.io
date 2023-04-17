// 该服务为 vercel serve跨域处理
import { createProxyMiddleware } from 'http-proxy-middleware'
export default (req, res) => {
  let target = ''
  if (req.url.startsWith('/bing')) { 
    target = 'https://cn.bing.com'
  }
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/bing/': '/'
    }
  })(req, res)
}