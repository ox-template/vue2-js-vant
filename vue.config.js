module.exports = {
  publicPath: '/',
  outputDir: process.env.OUTPUT_DIR,
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        views: '@/views',
        utils: '@/utils',
        api: '@/api',
        store: '@/store'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.betterleo.com:3000',
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        secure: true, // 如果是https接口，需要配置这个参数
        logLevel: 'debug'
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
