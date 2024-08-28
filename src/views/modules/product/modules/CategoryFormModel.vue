<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="460px">
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="80px">
        <el-form-item label="上级菜单" prop="parentId">
          <tree-select
            v-model="treeSelectData.parent"
            :placeholder="treeSelectData.placeholder"
            :tree-data="treeSelectData.treeData"
            :tree-props-config="treeSelectData.props"
            @clear="setParentDefaultData"
          />
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="dataForm.categoryName" />
        </el-form-item>
        <el-form-item label="图片" prop="imageUrl">
          <el-input v-model="dataForm.imageUrl" />
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
import { getInfoById, getCategoryListToTree } from '@/api/product/category'
import { postAction } from '@/utils/action'
import TreeSelect from '@/components/TreeSelect'
export default {
  name: 'CategoryFormModel',
  components: {
    TreeSelect
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
        categoryName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ]
      },
      treeSelectData: {
        // 父节点信息
        parent: {},
        placeholder: '请选择上级菜单',
        treeData: [],
        props: {
          label: 'categoryName',
          children: 'children'
        }
      },
      url: {
        save: '/product/category/save',
        update: '/product/category/update'
      }
    }
  },
  created() { },
  methods: {
    // 设置父菜单默认数据
    setParentDefaultData() {
      // 设置菜单信息
      this.treeSelectData.parent = { id: '0', categoryName: '' }
    },
    async fetchtCategoryList() {
      try {
        const resp = await getCategoryListToTree()
        this.treeSelectData.treeData = resp.data
      } catch (error) {
        this.$message.error('获取分类数据失败')
      }
    },
    async resetData(title, data = {}) {
      // 查询分类数据
      await this.fetchtCategoryList()
      this.title = title
      this.dataForm = data
      this.visible = true
    },
    add() {
      // 设置父菜单信息
      this.setParentDefaultData()
      // 新增时的默认数据
      const initFormData = {
        categoryName: '',
        imageUrl: ''
      }
      this.resetData('新增', initFormData)
    },
    async edit(data) {
      // 查询分类信息
      const resp = await getInfoById({ id: data.id })
      const { parentId, parentName, ...dataModel } = resp.data
      // 设置菜单信息
      this.treeSelectData.parent = { id: parentId, categoryName: parentName }
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
          const reqData = { ...this.dataForm, parentId: this.treeSelectData.parent.id }
          await postAction(url, reqData)
          this.$message.success('操作成功')
          this.handleCancel()
          this.$emit('success')
        } catch (error) {
          this.$message.error(error.message)
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
