import defaultSettings from '@/settings'

// 从 defaultSettings 中解构获取默认设置项
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// Vuex 状态管理的 state 部分，定义初始状态
const state = {
  // 是否显示设置选项
  showSettings: showSettings,
  // 是否固定头部
  fixedHeader: fixedHeader,
  // 是否显示侧边栏 Logo
  sidebarLogo: sidebarLogo
}

// 定义 mutations，用于同步修改 state
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // 检查 state 中是否存在要更改的键
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      // 更新对应的设置项
      state[key] = value
    }
  }
}

// 定义 actions，用于异步操作或者触发 mutations
const actions = {
  changeSetting({ commit }, data) {
    // 调用 mutation 来改变设置
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

