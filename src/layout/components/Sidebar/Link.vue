<template>
  <!-- 根据 type 属性渲染不同类型的链接 -->
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 判断链接是否为外部链接
    isExternal() {
      return isExternal(this.to)
    },
    // 根据是否为外部链接返回合适的组件类型
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    // 根据链接类型返回对应的属性对象
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
