import Vue from 'vue'

import 'normalize.css/normalize.css' // 引入 Normalize.css，它是一个现代的替代 CSS 重置的方法

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // 引入 Element UI 的中文语言包

import '@/assets/styles/index.scss' // 引入全局样式
import '@/assets/styles/common.scss'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App' // 引入根组件 App.vue
import store from './store' // 引入 Vuex 状态管理
import router from './router' // 引入 Vue Router 路由配置

import '@/icons' // 引入图标
import '@/permission' // 引入权限控制

// 将 ElementUI 的语言设置为中文
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
