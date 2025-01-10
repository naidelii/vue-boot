import { getAction, postAction } from '@/utils/action'

export default {
  data() {
    return {
      // 查询条件
      queryParam: {},
      // table加载状态
      loading: false,
      // 数据源
      dataSource: [],
      // 多选数据
      selectedItems: [],
      // 分页参数
      ipagination: {
        current: 1,
        pageSize: 10,
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
    // 新增/修改 成功时，重载列表
    modalFormSuccess() {
      this.loadData()
    },
    // 查询操作
    handleQuery() {
      this.loadData()
    },
    // 重置查询条件
    resetQuery() {
      this.queryParam = {}
      this.ipagination.current = 1
      this.loadData()
    },
    // 加载数据列表
    loadData() {
      // 如果没有设置list请求路径，则提示
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      this.loading = true
      // 构造查询条件
      const params = {
        ...this.queryParam,
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      // 发送请求
      getAction(this.url.list, params).then(resp => {
        const { data } = resp
        // 有分页数据
        this.dataSource = data.records
        // 数据总数
        this.ipagination.total = data.total
      }).catch(e => {
        this.$message.error('操作失败，请稍微再试')
      }).finally(() => {
        this.loading = false
      })
    },
    // 新增操作
    handleAdd() {
      // 调用子组件的add()方法
      this.$refs.modalForm.add()
    },
    // 编辑操作
    handleEdit(data) {
      // 调用子组件的edit()方法
      this.$refs.modalForm.edit(data)
    },
    // 删除操作
    handleDelete(id) {
      // 操作类型（true：单个删除，false：批量删除）
      const actionType = !!id
      const ids = actionType ? [id] : this.selectedItems.map(item => item.id)
      if (ids.length === 0) {
        this.$message.error('当前未选择要删除的数据！')
        return
      }
      // 删除类型
      const deleteType = actionType ? '删除' : '批量删除'
      const title = `是否确认【${deleteType}】【ID: ${ids.join(', ')}】的数据项？`
      this.$confirm(title, '系统提示', {
        type: 'warning'
      }).then(() => {
        // 执行删除操作
        this.doHandleDelete(ids)
      })
    },
    // 批量删除请求
    doHandleDelete(ids) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      this.loading = true
      postAction(this.url.delete, ids).then(resp => {
        this.$message.success('操作成功')
        // 重新获取列表数据
        this.loadData()
      }).catch(error => {
        this.$message.error(`删除失败: ${error.message}`)
      }).finally(() => {
        this.loading = false
      })
    },
    // 多选
    handleSelectionChange(data) {
      this.selectedItems = data
    }
  }
}
