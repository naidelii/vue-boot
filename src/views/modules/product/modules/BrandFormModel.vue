<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="460px">
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="80px" />

      <!-- 操作按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BrandFormModel',
  components: {},
  data() {
    return {
      // 模态框是否打开
      visible: false,
      // 添加loading状态
      loading: false,
      // 标题
      title: '',
      // 表单的数据
      dataForm: {},
      rules: {

      }
    }
  },
  created() {},
  methods: {
    // 关闭弹出框
    handleCancel() {
      this.visible = false
    },
    // 表单提交
    handleSubmit() {
      // 触发表单验证
      this.$refs.form.validate(valid => {
        // 表单校验未通过
        if (!valid) return false
        // 开始加载
        this.loading = true
        const reqData = { ...this.dataForm, parentId: this.treeSelectData.parent.id }
        console.log('reqData', reqData)
      })
    }
  }
}
</script>

<style scoped>

</style>
