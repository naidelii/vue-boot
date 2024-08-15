'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// 解析路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 页面标题
const name = defaultSettings.title

// 如果端口设置为80，使用管理员权限执行命令行。
// 例如，在 Mac 上：sudo npm run
// 你可以通过以下方式更改端口：
// port = 9528 npm run dev 或者 npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528

// 所有配置项的说明可以在 https://cli.vuejs.org/config/ 找到
module.exports = {
  /**
   * 如果你计划将站点部署在子路径下，需要设置 publicPath。
   * 例如在 GitHub Pages 上部署到 https://foo.github.io/bar/，
   * 则 publicPath 应设置为 "/bar/"。
   * 在大多数情况下请使用 '/' !!!
   * 详细信息：https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  // 构建输出目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  // 是否在开发环境下启用 eslint
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    // 开发服务器端口
    port: port,
    // 启动时自动打开浏览器
    open: true,
    overlay: {
      // 是否显示警告
      warnings: false,
      // 是否显示错误
      errors: true
    }
  },
  configureWebpack: {
    // 提供应用的标题，在 webpack 的 name 字段中，可以在 index.html 中访问以注入正确的标题。
    name: name,
    resolve: {
      // 设置路径别名
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 可以提升首屏速度，建议开启 preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略 runtime.js
        // 详细信息：https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面很多时，会导致太多无意义的请求，禁用 prefetch
    config.plugins.delete('prefetch')

    // 配置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        // 定义 symbolId 格式
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          // 仅在生产环境下使用
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` 必须与 runtimeChunk 名称相同。默认值为 `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  // 优先级
                  priority: 10,
                  // 仅打包初始依赖的第三方库
                  chunks: 'initial'
                },
                elementUI: {
                  // 将 elementUI 单独打包
                  name: 'chunk-elementUI',
                  // 权重需要大于 libs 和 app，否则会被打包到 libs 或 app 中
                  priority: 20,
                  // 适配 cnpm
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  // 可以自定义规则
                  test: resolve('src/components'),
                  // 最小公共块数
                  minChunks: 3,
                  priority: 5,
                  // 复用现有的块
                  reuseExistingChunk: true
                }
              }
            })
          // 将 runtime 分离到单独的 chunk 中
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
