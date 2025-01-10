import { getUserMenuList } from '@/api/system/permission'
import { constantRoutes } from '@/router'
import { listToTree } from '@/utils'
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
  // 将后端路由，转为前端路由组件
  menuList.forEach(menu => {
    const route = createRouteFromMenu(menu)
    // 将route挂载到menu上，作为menu的属性
    menu.route = route
  })
  // 转为树形结构，使用menu.route进行组装
  const tree = listToTree(menuList, 'id', 'parentId', 'children', menu => menu.route)
  return tree
}

/**
 * 根据菜单创建路由
 * @param {*} menu
 * @returns {object} route
 */
function createRouteFromMenu(menu) {
  // 组件的路径
  const url = menu.url
  // 主键（唯一的）
  const id = menu.id
  // 路由信息
  const route = {
    // 如果没有url，使用（id）作为路径（path必须要，大部分都是通过path进行跳转的）
    path: url || id,
    // name：去除开头的第一个 '/'，将剩下的转为 '-'
    name: url ? url.replace(/^\//, '').replaceAll('/', '-') : id,
    meta: {
      // 菜单栏的标题
      title: menu.name,
      // 图标
      icon: menu.icon
    },
    // 子菜单
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
 * 加载视图组件
 * @param {String} compoentPath - 组件的路径
 * @returns {Function} - 返回一个异步加载组件的函数
 */
export const loadView = (compoentPath) => {
  return (resolve) => require([`@/views/modules${compoentPath}.vue`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
