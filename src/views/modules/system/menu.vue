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
      <el-table-column prop="name" header-align="center" align="center" label="名称" />
      <el-table-column header-align="center" align="center" label="图标">
        <template slot-scope="{ row }">
          <svg-icon :icon-class="row.icon" />
        </template>
      </el-table-column>

      <el-table-column prop="type" header-align="center" align="center" label="类型">
        <template slot-scope="{ row }">
          <status-tag :value="row.type" :options="typeOptions" />
        </template>
      </el-table-column>

      <el-table-column prop="sortOrder" header-align="center" align="center" label="排序号" />
      <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="菜单URL" />
      <el-table-column prop="perms" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="授权标识" />

      <!-- 操作列 -->
      <el-table-column fixed="right" header-align="center" align="center" width="160" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table区域-END -->
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import StatusTag from '@/components/StatusTag'
export default {
  components: {
    StatusTag
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
        list: '/sys/permission/tree',
        delete: '/sys/permission/delete'
      }
    }
  },
  computed: {
  },
  created() { },
  methods: {}
}
</script>

<style scoped>
</style>
