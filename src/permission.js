import router from './router'
import store from './store'
// 进度条
import NProgress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

// 配置 NProgress，不显示加载 spinner
NProgress.configure({ showSpinner: false })

// 不重定向白名单
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // 启动进度条
  NProgress.start()
  if (!getToken()) {
    // 如果没有token，先判断是否属于白名单
    if (whiteList.includes(to.path)) {
      // 如果访问路径在白名单中，直接放行
      next()
    } else {
      // 如果访问路径不在白名单中，重定向到登录页面
      next(`/login?redirect=${to.path}`)
    }
    return
  }
  // 走到这里代表已经登录过了，如果跳转的页面是登录页，直接跳转首页
  if (to.path === '/login') {
    next({ path: '/' })
    NProgress.done()
    return
  }
  // 检查用户信息是否已获取
  const hasGetUserInfo = store.getters.name
  if (hasGetUserInfo) {
    // 如果已获取用户信息，直接放行
    next()
  } else {
    try {
      // 尝试获取用户信息
      await store.dispatch('user/getCurrentUser')
      // 获取用户拥有的菜单列表
      const accessRoutes = await store.dispatch('permission/generateRoutes')
      // 加入router
      router.addRoutes([...accessRoutes, { path: '*', redirect: '/404', hidden: true }])
      // 获取成功，直接放行（hack方法 确保addRoutes已完成）
      next({ ...to, replace: true })
    } catch (error) {
      console.log('router.beforeEach-error', error)
      // 如果获取信息失败，清除 token 并重定向到登录页面重新登录
      await store.dispatch('user/fedLogOut')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
