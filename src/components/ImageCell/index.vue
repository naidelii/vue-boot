<template>
  <el-image :src="fullImageUrl" :fit="fit" />
</template>

<script>
export default {
  name: 'ImageCell',
  props: {
    // 图片的相对地址
    value: {
      type: [String],
      required: true
    },
    // 图片的填充方式
    fit: {
      type: String,
      required: false,
      default: 'fill'
    }
  },
  data() {
    return {
      // 从环境变量中获取 uploadAction
      uploadAction: process.env.VUE_APP_UPLOAD_ACTION
    }
  },
  computed: {
    // 计算完整的图片 URL
    fullImageUrl() {
      return this.value ? `${this.uploadAction}${this.value}` : ''
    }
  }
}
</script>

<style scoped>

</style>
