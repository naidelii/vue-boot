<template>
  <!-- app-container 有默认样式 -->
  <div class="app-container">
    <!-- 操作按钮区域 -->
    <el-row :gutter="10" class="app-actions-section">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <!-- 操作按钮区域-END -->

    <!-- table区域 -->
    <el-table v-loading="loading" :data="dataSource" border row-key="id">
      <!-- 数据列 -->
      <el-table-column prop="name" header-align="center" align="center" label="菜单名称" />
      <el-table-column header-align="center" align="center" label="图标" width="120">
        <template slot-scope="{ row }">
          <svg-icon :icon-class="row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sortOrder" header-align="center" align="center" label="排序" width="120" />

      <el-table-column prop="type" header-align="center" align="center" label="类型" width="120">
        <template slot-scope="{ row }">
          <status-tag :value="row.type" :options="typeOptions" />
        </template>
      </el-table-column>

      <el-table-column prop="url" header-align="center" align="center" :show-overflow-tooltip="true" label="组件路径" />
      <el-table-column prop="perms" header-align="center" align="center" :show-overflow-tooltip="true" label="权限标识" />

      <!-- 操作列 -->
      <el-table-column fixed="right" header-align="center" align="center" width="160" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table区域-END -->

    <!-- 子组件，使用了mixins，则名称必须是：modalForm -->
    <menu-form-modal ref="modalForm" @success="modalFormSuccess" />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import StatusTag from '@/components/StatusTag'
import { getAction } from '@/utils/action'
import MenuFormModal from './modules/MenuFormModal'
export default {
  components: {
    StatusTag,
    MenuFormModal
  },
  mixins: [listMixin],
  data() {
    return {
      typeOptions: [
        { value: 0, text: '目录', type: '' },
        { value: 1, text: '菜单', type: 'success' },
        { value: 2, text: '按钮', type: 'info' }
      ],
      url: {
        list: '/sys/permission/getPermissionListToTree',
        delete: '/sys/permission/delete'
      }
    }
  },
  computed: {
  },
  created() { },
  methods: {
    // 重写loadData()方法
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
        // 有数据
        this.dataSource = data
      }).catch(e => {
        this.$message.error('操作失败，请稍微再试')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
</style>
