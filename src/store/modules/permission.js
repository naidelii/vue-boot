import { getUserMenuList } from '@/api/system/permission'
import { constantRoutes } from '@/router'
import Layout from '@/layout'

const state = {
  // 完整的路由列表，包括静态路由和动态路由。
  routes: [],
  // 动态添加的路由列表。
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      // 获取用户拥有的菜单列表
      getUserMenuList().then(resp => {
        const asyncRoutes = handleMenu(resp.data)
        // 设置进vuex
        commit('SET_ROUTES', asyncRoutes)
        resolve(asyncRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

/**
 * 遍历菜单列表并转换为路由对象
 * @param {Array} menuList - 从后端获取的菜单列表
 * @returns {Array} - 生成的路由数组
 */
function handleMenu(menuList) {
  return menuList.map(menu => {
    // 转成路由组件
    const route = createRouteFromMenu(menu)
    if (menu.children && menu.children.length > 0) {
      route.children = handleMenu(menu.children)
    }
    return route
  })
}

/**
 * 根据菜单创建路由
 * @param {*} menu
 * @returns {object} route
 */
function createRouteFromMenu(menu) {
  const url = menu.url
  const route = {
    // 如果没有url，使用（'/' + id）作为路径
    path: url ? '/' + url : `/${menu.id}`,
    // 如果没有url，使用id生成name
    name: url ? url.replace('/', '-') : `route-${menu.id}`,
    meta: {
      title: menu.name,
      icon: menu.icon
    },
    children: []
  }
  // 处理component（0：目录，1：菜单，2：按钮权限）
  if (menu.type === 0) {
    route.component = Layout
  } else if (menu.type === 1) {
    route.component = loadView(menu.url)
  }
  return route
}

/**
 * 懒加载视图组件
 * @param {String} view - 视图的路径
 * @returns {Function} - 返回一个异步加载组件的函数
 */
export const loadView = (view) => {
  return (resolve) => require([`@/views/modules/${view}.vue`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

