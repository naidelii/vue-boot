import { getAction } from '@/api/manager'

export default {
  data() {
    return {
      // 查询条件
      queryParam: {},
      // table加载状态
      loading: false,
      // 数据源
      dataSource: [],
      // 分页参数
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        total: 0
      }
    }
  },
  created() {
    console.log(' -- mixin created -- ')
    // 调用loadData方法
    this.loadData()
  },
  methods: {
    searchQuery() {
      this.loadData()
    },
    // 加载数据列表
    loadData() {
      // 如果没有设置list请求路径，则提示
      if (!this.url.list) {
        this.$message({
          message: '请设置url.list属性!',
          type: 'error'
        })
        return
      }
      this.loading = true
      // 构造查询条件
      const params = {
        ...this.queryParam,
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      getAction(this.url.list, params).then(resp => {
        const { data } = resp
        this.dataSource = data.records
        // 数据总数
        this.ipagination.total = data.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 调整分页数量
    handleSizeChange(val) {
      this.ipagination.current = 1
      this.ipagination.pageSize = val
      this.loadData()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.ipagination.current = val
      this.loadData()
    }
  }
}
