<template>
  <!-- app-container 有默认样式 -->
  <div class="app-container">
    <!-- 查询区域 -->
    <el-form ref="queryForm" :model="queryParam" :inline="true">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="queryParam.username" placeholder="请输入用户名" size="small" clearable style="width: 200px" />
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
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteBatch">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作按钮区域-END -->

    <!-- table区域 -->
    <el-table v-loading="loading" :data="dataSource" border @selection-change="handleSelectionChange">
      <!-- 多选列 -->
      <el-table-column type="selection" align="center" width="50" />

      <!-- 数据列 -->
      <el-table-column prop="id" align="center" label="ID" />
      <el-table-column prop="username" align="center" label="用户名" />
      <el-table-column prop="email" align="center" label="邮箱" />
      <el-table-column prop="mobile" align="center" width="120" label="手机号" />
      <el-table-column prop="status" align="center" label="状态">
        <template slot-scope="{ row }">
          <status-tag :value="row.status" :options="statusOptions" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" width="160" label="创建时间" />

      <!-- 操作列 -->
      <el-table-column align="center" width="170" label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-button>
          <el-dropdown class="action-more-dropdown" size="mini" @command="command => handleCommand(command, row)">
            <!-- 更多列（样式修改在common.scss里面） -->
            <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="resetPassword" icon="el-icon-key">重置密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <user-form-modal ref="modalForm" @success="modalFormSuccess" />

    <!-- 重置密码组件 -->
    <reset-password-dialog ref="resetPassword" />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import UserFormModal from './modules/UserFormModal'
import ResetPasswordDialog from './modules/ResetPasswordDialog'
import StatusTag from '@/components/StatusTag'
export default {
  components: {
    UserFormModal,
    StatusTag,
    ResetPasswordDialog
  },
  mixins: [listMixin],
  data() {
    return {
      statusOptions: [
        { value: 0, text: '禁用', type: 'danger' },
        { value: 1, text: '正常', type: '' }
      ],
      url: {
        list: '/sys/user/listPage',
        deleteBatch: '/sys/user/deleteBatch'
      }
    }
  },
  created() {
  },
  methods: {
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case 'resetPassword':
          this.handleResetPassword(row)
          break
        default:
          break
      }
    },
    // 重置密码
    handleResetPassword(row) {
      this.$refs.resetPassword.init(row)
    },
    // 手动处理
    handleDelete(id) {
      if (!id) {
        this.$message.error('当前未选择要删除的数据！')
        return
      }
      const title = `是否确认【删除】【ID: ${id}】的数据项？`
      // 调用批量删除
      this.doHandleDelete(title, [id], true)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
