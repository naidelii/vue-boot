<template>
  <!-- 侧边栏 logo 容器，根据 collapse 状态动态添加类名 -->
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <!-- 使用 transition 组件实现 logo 展开和收缩时的淡入淡出效果 -->
    <transition name="sidebarLogoFade">
      <!-- 当侧边栏收起时，渲染一个带有 logo 或标题的 router-link -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- 如果有 logo，则显示 logo 图片，否则显示标题 -->
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <!-- 当侧边栏展开时，渲染一个带有 logo 或标题的 router-link -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    // 控制侧边栏是否收起的布尔值
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // 标题文本，当没有 logo 时显示
      title: 'Vue Admin Template',
      // logo 图片的 URL
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
