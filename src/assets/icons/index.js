// 文档链接: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage

import Vue from 'vue'
// 引入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'

// 全局注册SvgIcon组件，使其在整个应用中可以使用
Vue.component('svg-icon', SvgIcon)

// 自动导入所有svg文件
const req = require.context('./svg', false, /\.svg$/)

// 提取svg文件名并导入文件
const icons = req.keys().map(key => {
  req(key) // 导入文件
  return key.replace(/\.\/(.*)\.svg/, '$1') // 提取文件名
})

export default icons