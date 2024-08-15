module.exports = {
  presets: [
    // 使用 Vue CLI 提供的 babel 预设
    // 详细信息：https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node 插件只做了一件事：将所有的 import() 转换为 require()。
      // 当你有大量页面时，这个插件可以显著提高热更新的速度。
      // 详细信息：https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node']
    }
  }
}
