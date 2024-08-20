<template>
  <el-tag :size="size" :type="tagType">{{ tagText }}</el-tag>
</template>

<script>
export default {
  name: 'StatusTag',
  components: {},
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(option => typeof option.value !== 'undefined' && typeof option.text === 'string')
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    type: {
      type: String,
      default: '—'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    tagType() {
      return this.getOption('type') || this.type
    },
    tagText() {
      return this.getOption('text') || ''
    }
  },
  created() { },
  methods: {
    getOption(key) {
      const option = this.options.find(option => option.value === this.value)
      return option ? option[key] : ''
    }
  }
}
</script>

<style scoped>
</style>
