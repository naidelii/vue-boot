<template>
  <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="500px">
    <!-- 表单区域 -->
    <el-form ref="form" :model="dataForm" :rules="rules">
      <el-form-item label="新密码" prop="password" label-width="80px">
        <el-input v-model="dataForm.password" type="password" placeholder="请输入更新后的密码" />
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { resetPassword } from '@/api/system/user'
import { getPasswordValidationRules } from '@/utils'

export default {
  name: 'ResetPasswordDialog',
  data() {
    return {
      title: '修改密码',
      visible: false,
      loading: false,
      dataForm: {},
      rules: {
        password: getPasswordValidationRules()
      }
    }
  },
  methods: {
    init(data) {
      this.$nextTick(() => {
        // 重置表单字段和验证状态
        this.$refs.form.resetFields()
        this.dataForm = { id: data.id, password: '' }
      })
      this.visible = true
    },
    // 关闭弹出框
    handleCancel() {
      this.visible = false
    },
    // 表单提交
    handleSubmit() {
      // 触发表单验证
      this.$refs.form.validate(async valid => {
        // 表单校验未通过
        if (!valid) return false
        // 开始加载
        this.loading = true
        const reqData = {
          id: this.dataForm.id,
          newPassword: this.dataForm.password
        }
        resetPassword(reqData).then(resp => {
          this.$message.success('操作成功')
          // 关闭当前弹窗
          this.handleCancel()
        }).finally(() => {
          // 请求完成后停止加载
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
