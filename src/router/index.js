import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

/**
 * 静态路由
 * 没有权限要求的基页
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // 该路由不在菜单中显示
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error/404'),
    // 该路由不在菜单中显示
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  // 设置为 'history' 模式
  mode: 'history',
  // 初始加载静态路由
  routes: constantRoutes
})

const router = createRouter()

// 重置路由配置，通常在用户权限发生变化时使用
export function resetRouter() {
  // 创建新的路由实例
  const newRouter = createRouter()
  // 将现有路由的 matcher 替换为新的 matcher
  router.matcher = newRouter.matcher
}

export default router
