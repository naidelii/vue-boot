// 引入必要的模块
// 用于在 Node.js 脚本中执行命令行命令
const { run } = require('runjs')
// 用于在命令行中输出带有颜色的文本
const chalk = require('chalk')
// 引入项目的 vue.config.js 配置文件
const config = require('../vue.config.js')

// 解析命令行参数，去掉 node 和脚本路径的部分，只保留实际传递的参数
const rawArgv = process.argv.slice(2)
// 将参数数组转换为字符串，以便在后续命令中使用
const args = rawArgv.join(' ')

// 检查是否在命令行中传递了 --preview 参数或设置了 npm_config_preview
if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  // 如果传递了 --report 参数，则启用报告功能
  const report = rawArgv.includes('--report')

  // 执行构建命令，构建 Vue.js 项目，并附带所有传入的参数
  run(`vue-cli-service build ${args}`)

  // 设置预览服务器的端口号和静态资源的基础路径
  const port = 9526
  const publicPath = config.publicPath

  // 引入用于创建本地服务器的模块
  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  // 使用 serveStatic 中间件，将构建输出的 ./dist 目录作为静态文件服务器的根目录
  app.use(
    // 基础路径，与 publicPath 配置一致
    publicPath,
    // 指定要服务的静态文件目录
    serveStatic('./dist', {
      // 默认首页文件
      index: ['index.html', '/']
    })
  )

  // 启动本地服务器，监听指定端口
  app.listen(port, function () {
    // 在命令行中输出预览地址，使用绿色字体
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
    // 如果启用了报告功能，输出报告地址
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
    }

  })
} else {
  // 如果没有传递 --preview 参数，仅执行构建命令
  run(`vue-cli-service build ${args}`)
}
