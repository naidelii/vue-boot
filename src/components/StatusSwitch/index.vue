<template>
  <el-switch
    v-model="localValue"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    @change="handleChange"
  />
</template>

<script>
export default {
  name: 'StatusSwitch',
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    recordId: {
      type: String,
      required: true
    },
    activeValue: {
      type: [String, Number, Boolean],
      default: 1
    },
    inactiveValue: {
      type: [String, Number, Boolean],
      default: 0
    },
    activeColor: {
      type: String,
      default: '#13ce66'
    },
    inactiveColor: {
      type: String,
      default: '#ff4949'
    }
  },
  data() {
    return {
      // 本地状态
      localValue: this.value,
      // 请求状态标志
      pending: false
    }
  },
  watch: {
    // 监听父组件的 prop 变化
    value(newValue) {
      console.log('newValue', newValue)
      this.localValue = newValue
    }
  },
  created() { },
  methods: {
    handleChange(newValue) {
      // 禁用开关，防止重复点击
      this.pending = true
      // 传递 id 和新的状态值
      this.$emit('change', this.recordId, newValue, (confirmed) => {
        if (confirmed) {
          // 更新状态
          this.localValue = newValue
        } else {
          // 请求失败，还原状态
          this.localValue = this.value
        }
        // 请求结束，恢复开关
        this.pending = false
      })
    }
  }
}
</script>

<style scoped>
</style>
