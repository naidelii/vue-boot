import router from './router'
import store from './store'
// 进度条
import NProgress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

// 配置 NProgress，不显示加载 spinner
NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 判断用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    // 如果跳转的页面是登录页（由于已经登录了），直接跳转首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 检查用户信息是否已获取
      const hasGetUserInfo = store.getters.name
      console.log('hasGetUserInfo', hasGetUserInfo)
      if (hasGetUserInfo) {
      // 如果已获取用户信息，直接放行
        next()
      } else {
        try {
          // 尝试获取用户信息
          await store.dispatch('user/getInfo')
          // 获取成功，放行
          next()
        } catch (error) {
          console.log('error', error)
          // 如果获取信息失败，清除 token 并重定向到登录页面重新登录
          await store.dispatch('user/logout')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 如果没有token，先判断是否属于白名单
    if (whiteList.includes(to.path)) {
      // 如果访问路径在白名单中，直接放行
      next()
    } else {
      // 如果访问路径不在白名单中，重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
