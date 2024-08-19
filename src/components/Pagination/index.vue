<template>
  <!-- 分页组件的模板部分 -->
  <el-pagination
    :current-page.sync="currentData"
    :page-size.sync="pageSizeData"
    :total="total"
    :page-sizes="pageSizeOptions"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 总数据条目数，必需属性
    total: {
      required: true,
      type: Number
    },
    // 当前页码，默认为1
    current: {
      type: Number,
      default: 1
    },
    // 每页显示的条目数，默认为10
    pageSize: {
      type: Number,
      default: 10
    },
    // 每页显示条目数的选择器选项
    pageSizeOptions: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 分页组件的布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 计算属性：currentData，双向绑定到current的值
    currentData: {
      get() {
        return this.current
      },
      // 使用 update:current 事件通知父组件更新 current 的值
      set(val) {
        this.$emit('update:current', val)
      }
    },
    // 计算属性：pageSizeData，双向绑定到pageSize的值
    pageSizeData: {
      get() {
        return this.pageSize
      },
      // 使用 update:pageSize 事件通知父组件更新 pageSize 的值
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  methods: {
    // 调整分页数量
    handleSizeChange(val) {
      // 每次改变每页显示条目数时，将当前页码重置为1
      this.currentData = 1
      // 更新 pageSizeData 的值
      this.pageSizeData = val
      // 触发 pagination 事件，通知父组件重新加载数据
      this.$emit('pagination')
    },
    // 切换页码
    handleCurrentChange(val) {
      // 更新 currentData 的值
      this.currentData = val
      // 触发 pagination 事件，通知父组件重新加载数据
      this.$emit('pagination')
    }
  }
}
</script>

<style scoped>
</style>
