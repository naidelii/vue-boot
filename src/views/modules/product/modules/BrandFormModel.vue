<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="500px">
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="100px">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="dataForm.brandName" placeholder="品牌名称" />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <single-image-upload v-model="dataForm.logoUrl" />
        </el-form-item>
        <el-form-item label="介绍" prop="description">
          <el-input v-model="dataForm.description" placeholder="介绍" />
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <status-switch v-model="dataForm.isShow" />
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model="dataForm.sortOrder" placeholder="排序值" />
        </el-form-item>
        <el-form-item label="检索首字母" prop="firstLetter">
          <el-input v-model="dataForm.firstLetter" placeholder="检索首字母" />
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SingleImageUpload from '@/components/upload/singleImageUpload'
import StatusSwitch from '@/components/StatusSwitch'
export default {
  name: 'BrandFormModel',
  components: {
    SingleImageUpload,
    StatusSwitch
  },
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
  created() { },
  methods: {
    resetData(title, data = {}) {
      this.title = title
      this.dataForm = data
      this.visible = true
    },
    add() {
      // 新增时的默认数据
      const initFormData = {
        isShow: 1
      }
      this.resetData('新增', initFormData)
    },
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
        // this.loading = true
        const reqData = { ...this.dataForm }
        console.log('reqData', reqData)
      })
    }
  }
}
</script>

<style scoped>
</style>
