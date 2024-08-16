<template>
  <!-- app-container 有默认样式 -->
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="20" :xs="24">
        <!-- 查询区域 -->
        <el-form ref="queryForm" :model="queryParam" :inline="true">
          <el-form-item label="角色名称" prop="username">
            <el-input v-model="queryParam.username" placeholder="请输入用户名" clearable size="small" style="width: 200px" />
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
            <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">批量删除</el-button> -->
          </el-col>
        </el-row>
        <!-- 操作按钮区域-END -->

        <!-- table区域 -->
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
          <el-table-column prop="createTime" header-align="center" align="center" width="180" label="创建时间" />

          <!-- 操作列 -->
          <el-table-column fixed="right" header-align="center" align="center" width="160" label="操作">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="handleEdit(row)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelele(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- table区域-END -->

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
      </el-col>
    </el-row>

    <!-- 子组件，使用了mixins，则名称必须是：modalForm -->
    <user-form-modal ref="modalForm" />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import userFormModal from './modules/UserFormModal.vue'

export default {
  components: {
    userFormModal
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

<style lang="scss">
</style>
