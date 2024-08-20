<template>
  <!-- 如果是外部图标，则渲染一个div元素 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />

  <!-- 如果不是外部图标，则渲染一个svg元素 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <!-- 使用use元素来引用图标，通过xlink:href属性绑定iconName -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>

import { isExternal } from '@/utils/index'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 计算属性：判断图标是否为外部资源（URL）
    isExternal() {
      return isExternal(this.iconClass)
    },
    // 计算属性：返回图标的引用路径
    iconName() {
      return `#icon-${this.iconClass}`
    },
    // 计算属性：返回图标的CSS类，包括传入的className和默认类
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    // 计算属性：返回外部图标的样式，使用CSS mask属性
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
