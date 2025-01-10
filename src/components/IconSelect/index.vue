<!-- @author zhengjie -->
<template>
  <div class="icon-body">
    <!-- 搜索输入框，支持清除功能 -->
    <el-input v-model="searchQuery" class="icon-search" clearable placeholder="请输入图标名称" @clear="reset">
      <!-- 输入框后缀图标 -->
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>

    <!-- 图标列表区域 -->
    <div class="icon-list">
      <div class="list-container">
        <!-- 循环显示图标项 -->
        <div v-for="(item, index) in filteredIcons" :key="index" class="icon-item-wrapper" @click="selectIcon(item)">
          <!-- 图标项，点击后触发选中事件 -->
          <div :class="['icon-item', { active: activeIcon === item }]">
            <!-- 使用 SvgIcon 组件展示图标 -->
            <svg-icon :icon-class="item" class-name="icon" style="height: 25px; width: 16px" />
            <!-- 显示图标名称 -->
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入图标列表
import icons from '@/assets/icons'

export default {
  name: 'IconSelect',
  props: {
    // 接收已激活的图标名称
    activeIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 搜索输入框的内容
      searchQuery: ''
    }
  },
  computed: {
    // 根据搜索内容过滤图标列表
    filteredIcons() {
      return this.searchQuery
        ? icons.filter(icon => icon.includes(this.searchQuery))
        : icons
    }
  },
  methods: {
    // 处理图标选择
    selectIcon(iconName) {
      // 触发父组件的 selected 事件，传递选中的图标名称
      this.$emit('selected', iconName)
    },
    // 重置搜索框内容并显示所有图标
    reset() {
      this.searchQuery = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;

  .icon-search {
    position: relative;
    margin-bottom: 5px;
  }

  .icon-list {
    height: 200px;
    overflow: auto;

    .list-container {
      display: flex;
      flex-wrap: wrap;

      .icon-item-wrapper {
        width: calc(100% / 3); /* 每行显示三个图标 */
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        display: flex;

        .icon-item {
          display: flex;
          max-width: 100%;
          height: 100%;
          padding: 0 5px;
          transition: background 0.3s ease, border-radius 0.3s ease;

          &:hover {
            background: #ececec;
            border-radius: 5px;
          }

          .icon {
            flex-shrink: 0;
          }

          span {
            display: inline-block;
            vertical-align: -0.15em;
            fill: currentColor;
            padding-left: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .icon-item.active {
          background: #ececec;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
