<template>
  <!-- app-container 有默认样式 -->
  <div class="app-container">
    <!-- 查询区域 -->
    <el-form ref="queryForm" :model="queryParam" :inline="true">
      <el-form-item prop="roleName" label="角色名">
        <el-input v-model="queryParam.roleName" placeholder="请输入角色名" size="small" clearable style="width: 200px" />
      </el-form-item>

      <!-- 查询区域-操作按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh-right" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <!-- 查询区域-操作按钮-END -->
    </el-form>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <el-row :gutter="10" class="app-actions-section">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete()">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作按钮区域-END -->

    <!-- table区域 -->
    <el-table v-loading="loading" :data="dataSource" border @selection-change="handleSelectionChange">
      <!-- 多选列 -->
      <el-table-column type="selection" align="center" width="50" />

      <!-- 数据列 -->
      <el-table-column prop="id" align="center" width="180" label="ID" />
      <el-table-column prop="roleName" align="center" label="角色名" />
      <el-table-column prop="roleCode" align="center" label="角色编码" />
      <el-table-column prop="description" align="center" label="描述" />

      <!-- 操作列 -->
      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table区域-END -->

    <!-- 分页组件 -->
    <pagination
      :total="ipagination.total"
      :current.sync="ipagination.current"
      :page-size.sync="ipagination.pageSize"
      @pagination="loadData"
    />

    <!-- 子组件，使用了mixins，则名称必须是：modalForm -->
    <role-form-model ref="modalForm" @success="modalFormSuccess" />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import roleFormModel from './modules/RoleFormModel'
export default {
  components: {
    roleFormModel
  },
  mixins: [listMixin],
  data() {
    return {
      url: {
        list: '/sys/role/listPage',
        delete: '/sys/role/deleteBatch'
      }
    }
  },
  created() { },
  methods: {}
}
</script>

<style scoped>
</style>
