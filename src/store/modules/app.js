import Cookies from 'js-cookie'

// 定义初始状态
const state = {
  sidebar: {
    // 侧边栏的打开状态从 Cookies 中读取，如果没有记录则默认为打开状态
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 是否启用动画效果
    withoutAnimation: false
  },
  // 当前设备类型，默认为 'desktop'
  device: 'desktop'
}

// 定义 mutations，用于同步修改状态
const mutations = {
  // 切换侧边栏的打开状态
  TOGGLE_SIDEBAR: state => {
    // 切换打开状态
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    // 将状态保存到 Cookies 中，1 表示打开，0 表示关闭
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏，并可选择是否关闭动画
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // 将侧边栏状态保存到 Cookies 中，表示关闭
    Cookies.set('sidebarStatus', 0)
    // 设置侧边栏状态为关闭
    state.sidebar.opened = false
    // 根据参数设置是否禁用动画效果
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备类型（桌面或移动）
  TOGGLE_DEVICE: (state, device) => {
    // 将设备类型更新为传入的值
    state.device = device
  }
}

// 定义 actions，用于处理异步操作或复杂的逻辑，然后触发 mutations
const actions = {
  // 触发 TOGGLE_SIDEBAR mutation，用于切换侧边栏的状态
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 触发 CLOSE_SIDEBAR mutation，用于关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 触发 TOGGLE_DEVICE mutation，用于切换设备类型
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
