<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="500px">
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="100px">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="dataForm.brandName" placeholder="品牌名称" />
        </el-form-item>
        <el-form-item label="介绍" prop="description">
          <el-input v-model="dataForm.description" placeholder="介绍" />
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <status-switch v-model="dataForm.isShow" />
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input-number v-model="dataForm.sortOrder" :min="1" label="排序值" />
        </el-form-item>
        <el-form-item label="检索首字母" prop="firstLetter">
          <el-input v-model="dataForm.firstLetter" placeholder="检索首字母" />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <single-image-upload v-model="dataForm.logoUrl" upload-dir="brand" />
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
import { postAction } from '@/utils/action'
import { getInfoById } from '@/api/product/brand'
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
        brandName: [
          { required: true, message: '品牌名称不能为空', trigger: 'blur' }
        ]
      },
      url: {
        save: '/product/brand/save',
        update: '/product/brand/update'
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
        isShow: 1,
        sortOrder: 1
      }
      this.resetData('新增', initFormData)
    },
    async edit(data) {
      // 查询分类信息
      const resp = await getInfoById({ id: data.id })
      const { ...dataModel } = resp.data
      this.resetData('编辑', dataModel)
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
        try {
          const url = this.dataForm.id ? this.url.update : this.url.save
          const reqData = { ...this.dataForm }
          await postAction(url, reqData)
          this.$message.success('操作成功')
          this.handleCancel()
          this.$emit('success')
        } finally {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
