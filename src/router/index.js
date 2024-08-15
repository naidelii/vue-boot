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
    component: () => import('@/views/404'),
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
  // 初始加载静态路由
  routes: constantRoutes
})

const router = createRouter()

// 重置路由配置，通常在用户权限发生变化时使用
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
