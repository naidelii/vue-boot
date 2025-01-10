<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 在移动设备上，侧边栏打开时会显示一个背景遮罩，点击该遮罩可以关闭侧边栏 -->
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <!-- 侧边栏组件 -->
    <sidebar class="sidebar-container" />

    <!-- 主内容区域 -->
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 导航栏组件 -->
        <navbar />
      </div>
      <!-- 内容主区 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    // 访问 Vuex store 中的 sidebar 状态
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 访问 Vuex store 中的设备类型
    device() {
      return this.$store.state.app.device
    },
    // 访问 Vuex store 中的固定头部设置
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 根据不同状态生成动态的 class 对象
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    // 当用户在移动设备上点击侧边栏外部区域时关闭侧边栏
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

</style>
