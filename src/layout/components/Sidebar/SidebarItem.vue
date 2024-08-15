<template>
  <!-- 只有当菜单项未隐藏时才会渲染 -->
  <div v-if="!item.hidden">
    <!-- 如果该菜单项只有一个可见的子菜单项，并且该子菜单项没有子路由，且父项不要求总是显示 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <!-- 使用自定义的 AppLink 组件生成链接 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 渲染菜单项，并根据嵌套状态添加类名 -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <!-- 渲染子菜单项的图标和标题 -->
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 否则渲染为一个带有子菜单的下拉菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <!-- 下拉菜单的标题 -->
      <template slot="title">
        <!-- 渲染菜单项的图标和标题 -->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 递归渲染子菜单项 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/index'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // 接收一个路由对象
    item: {
      type: Object,
      required: true
    },
    // 判断是否为嵌套菜单
    isNest: {
      type: Boolean,
      default: false
    },
    // 基础路径，用于解析子路由的路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // 用于临时存储唯一的可见子菜单项
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 判断菜单项是否只有一个可见的子菜单项
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 如果是唯一的可见子菜单项，暂时存储它
          this.onlyOneChild = item
          return true
        }
      })

      // 如果只有一个可见的子菜单项，返回 true
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有可见的子菜单项，将父菜单项作为唯一子菜单项返回
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    // 解析路径，如果是外部链接直接返回，否则拼接 basePath 和 routePath
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
