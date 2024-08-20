// 文档链接: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage

import Vue from 'vue'
// 引入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'

// 全局注册SvgIcon组件，使其在整个应用中可以使用
Vue.component('svg-icon', SvgIcon)

// 使用`require.context`方法获取指定文件夹中的所有.svg文件
// 第一个参数：'./svg' 表示相对于当前文件的'svg'目录
// 第二个参数：false 表示不递归子目录
// 第三个参数：/\.svg$/ 表示只匹配.svg文件
const req = require.context('./svg', false, /\.svg$/)
// 将所有匹配到的文件导入到项目中
// `requireContext.keys()` 获取所有匹配文件的路径数组
// `requireContext(path)` 根据路径导入文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
