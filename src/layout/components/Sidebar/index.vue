<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- Logo组件，根据侧边栏折叠状态显示或隐藏 -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 滚动条容器 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 菜单组件 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 渲染每个路由为菜单项 -->
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    // 获取所有路由
    routes() {
      return this.$router.options.routes
    },
    // 当前活动菜单
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果 meta 中设置了 activeMenu，则使用它作为活动菜单
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否显示 Logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // 导入全局样式变量
    variables() {
      return variables
    },
    // 是否折叠侧边栏
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
