const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pluginOptions: {
    // 全局混入和变量
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/style/variable.less'),
        resolve('src/style/mixin.less')
      ]
    }
  },
  devServer: {
    open: true,
    port: 9000,
    proxy: {
      // 百度地图定位接口api
      '/map': {
        target: 'http://api.map.baidu.com/location/ip',
        pathRewrite: { '^/map': '' },
        changeOrigin: true,
        secure: false
      }
    }
  }
}
