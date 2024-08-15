export default {
  computed: {
    // 计算属性 `device`，从 Vuex 的 `app` 模块中获取当前设备类型（如 `mobile` 或 `desktop`）。
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    // 组件挂载后调用 `fixBugIniOS` 方法，修复 iOS 设备上的菜单点击触发 `mouseleave` 事件的 bug。
    // 相关讨论可以参见 GitHub issue: https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
  },
  methods: {
    // 修复 iOS 设备上的菜单鼠标离开事件的 bug
    fixBugIniOS() {
      // 获取当前组件中的 `subMenu` 引用
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        // 获取 `subMenu` 原始的 `handleMouseleave` 方法
        const handleMouseleave = $subMenu.handleMouseleave
        // 重写 `handleMouseleave` 方法
        $subMenu.handleMouseleave = (e) => {
          // 如果当前设备为移动设备，则不触发 `mouseleave` 事件
          if (this.device === 'mobile') {
            return
          }
          // 否则，调用原始的 `handleMouseleave` 方法
          handleMouseleave(e)
        }
      }
    }
  }
}
