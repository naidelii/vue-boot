<template>
  <el-switch
    :value="localValue"
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
    // 更新时用的主键
    recordId: {
      type: String,
      // 如果存在表示需要确认框和后台请求
      default: null
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
      localValue: this.value
    }
  },
  watch: {
    // 监听父组件的 prop 变化
    value(newValue) {
      this.localValue = newValue
    }
  },
  methods: {
    // 处理开关的变化
    handleChange(newValue) {
      // 如果提供了 recordId，表示需要后台请求才能切换
      if (this.recordId) {
        this.showConfirmation(newValue)
      } else {
        // 直接切换
        this.localValue = newValue
        // 同步更新父组件的值
        this.$emit('input', newValue)
      }
    },
    // 弹出确认框并请求后台
    showConfirmation(newValue) {
      const action = newValue === this.activeValue ? '开启' : '关闭'
      const title = `确认要 【${action}】 吗？`
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmChange(this.recordId, newValue)
      }).catch(() => {
        // 取消了不做操作
      })
    },
    // 请求后台并更新状态
    confirmChange(recordId, newValue) {
      this.$emit('change', recordId, newValue, (confirmed) => {
        if (confirmed) {
          this.localValue = newValue
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
