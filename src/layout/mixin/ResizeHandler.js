import store from '@/store'

const { body } = document
// 参考 Bootstrap 的响应式设计
const WIDTH = 992

export default {
  watch: {
    $route(route) {
      // 当路由改变时，如果是移动设备并且侧边栏打开，则关闭侧边栏
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    // 在组件挂载前监听窗口大小变化事件
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    // 在组件销毁前移除窗口大小变化事件监听
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    // 组件挂载后判断当前是否为移动设备
    const isMobile = this.$_isMobile()
    if (isMobile) {
      // 如果是移动设备，设置设备类型并关闭侧边栏
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 判断当前设备是否为移动设备
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    // 处理窗口大小变化，切换设备类型并处理侧边栏显示状态
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
