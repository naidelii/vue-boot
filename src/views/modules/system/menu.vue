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
      <el-table-column prop="name" align="center" label="菜单名称" />
      <el-table-column prop="icon" align="center" width="120" label="图标">
        <template slot-scope="{ row }">
          <svg-icon :icon-class="row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sortOrder" align="center" width="120" label="排序" />

      <el-table-column prop="type" align="center" width="120" label="类型">
        <template slot-scope="{ row }">
          <status-tag :value="row.type" :options="typeOptions" />
        </template>
      </el-table-column>

      <el-table-column prop="url" align="center" label="组件路径" />
      <el-table-column prop="perms" align="center" label="权限标识" />

      <!-- 操作列 -->
      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-button>
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
      this.loading = true
      // 发送请求
      getAction(this.url.list).then(resp => {
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
