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
    async loadData() {
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
      try {
        // 发送请求
        const { data } = await getAction(this.url.list, params)
        // 设置分页数据
        this.dataSource = data.records || []
        // 数据总数
        this.ipagination.total = data.total || 0
      } finally {
        this.loading = false
      }
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
      if (!id) {
        this.$message.error('当前未选择要删除的数据！')
        return
      }
      const title = `是否确认【删除】【ID: ${id}】的数据项？`
      // 单个删除，传递 isBatch = false
      this.doHandleDelete(title, id, false)
    },
    // 批量删除操作
    handleDeleteBatch() {
      const ids = this.selectedItems.map(item => item.id)
      if (ids.length === 0) {
        this.$message.error('当前未选择要删除的数据！')
        return
      }
      const title = `是否确认【批量删除】【ID: ${ids.join(', ')}】的数据项？`
      // 批量删除
      this.doHandleDelete(title, ids, true)
    },
    // 删除
    async doHandleDelete(title, data, isBatch = false) {
      try {
        await this.$confirm(title, '系统提示', { type: 'warning' })
        const url = isBatch ? this.url.deleteBatch : this.url.delete
        await this.deleteRequest(url, data)
      } catch (error) {
        // 用户取消了删除操作
      }
    },
    // 删除请求
    async deleteRequest(url, data) {
      if (!url) {
        this.$message.error('请设置删除操作对应的url!')
        return
      }
      this.loading = true
      try {
        await postAction(url, data)
        this.$message.success('操作成功')
        // 重新获取列表数据
        this.loadData()
      } finally {
        this.loading = false
      }
    },
    // 多选
    handleSelectionChange(data) {
      this.selectedItems = data
    }
  }
}
