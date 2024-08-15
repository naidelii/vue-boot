<template>
  <div class="mod-user">
    <!-- 表单用于查询用户 -->
    <el-form :inline="true" :model="queryParam">
      <el-form-item>
        <el-input v-model="queryParam.username" placeholder="用户名" clearable />
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button @click="searchQuery()">查询</el-button>
        <el-button type="primary">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格用于展示用户数据 -->
    <el-table v-loading="loading" :data="dataSource" border @selection-change="handleSelectionChange">
      <!-- 多选列 -->
      <el-table-column type="selection" header-align="center" align="center" width="50" />

      <!-- 数据列 -->
      <el-table-column prop="id" header-align="center" align="center" width="180" label="ID" />
      <el-table-column prop="username" header-align="center" align="center" label="用户名" />
      <el-table-column prop="email" header-align="center" align="center" label="邮箱" />
      <el-table-column prop="mobile" header-align="center" align="center" label="手机号" />
      <el-table-column prop="status" header-align="center" align="center" width="100" label="状态">
        <template slot-scope="{ row }">
          <el-tag v-if="row.status === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" label="创建时间" />

      <!-- 操作列 -->
      <el-table-column fixed="right" header-align="center" align="center" width="160" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row.id)">修改</el-button>
          <el-button type="text" size="small" @click="handleDel(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="ipagination.current"
      :page-sizes="ipagination.pageSizeOptions"
      :page-size="ipagination.pageSize"
      :total="ipagination.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'

export default {
  components: {
  },
  mixins: [listMixin],
  data() {
    return {
      // 多选项
      selectedItems: [],
      url: {
        list: '/sys/user/listPage'
      }
    }
  },
  created() {
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.selectedItems = val
    }
  }
}
</script>
