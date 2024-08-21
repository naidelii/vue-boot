<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="480px">
      <!-- 表单区域 -->
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="dataForm.roleName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleName">
          <el-input v-model="dataForm.roleCode" placeholder="角色编码" />
        </el-form-item>
        <el-form-item size="mini" label="菜单权限">
          <el-tree ref="menuListTree" :data="menuList" :props="menuListTreeProps" node-key="id" show-checkbox />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="dataForm.description" placeholder="描述" />
        </el-form-item>
      </el-form>
      <!-- 表单区域-END -->

      <!-- 操作按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionListToTree } from '@/api/system/permission'
import { postAction } from '@/utils/action'
import { getRoleById } from '@/api/system/role'
export default {
  name: 'RoleFormModal',
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
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      rules: {
        roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        roleCode: [{ required: true, message: '角色编码不能为空', trigger: 'blur' }]
      },
      url: {
        save: '/sys/role/save',
        update: '/sys/role/update'
      }
    }
  },
  created() { },
  methods: {
    async fetchtPermissionList() {
      try {
        const resp = await getPermissionListToTree()
        this.menuList = resp.data
      } catch (error) {
        this.$message.error('获取菜单列表失败')
      }
    },
    async resetData(title, data = {}) {
      // 重置选中的菜单
      this.resetChecked()
      // 查询菜单信息
      await this.fetchtPermissionList()
      this.title = title
      this.dataForm = data
      this.visible = true
    },
    resetChecked() {
      if (this.$refs.menuListTree) {
        // 重置选中的菜单项
        this.$refs.menuListTree.setCheckedKeys([])
      }
    },
    add() {
      // 新增时的默认数据
      this.resetData('新增', { roleName: '', roleCode: '', description: '' })
    },
    async edit(data) {
      // 查询角色信息
      const resp = await getRoleById({ id: data.id })
      // 后端返回的数据
      const { permissionIds, ...dataModel } = resp.data
      // 设置表单需要的数据
      this.resetData('编辑', dataModel)
      await this.$nextTick()
      // 默认选中的菜单
      this.defaultChecked(permissionIds)
    },
    // 默认选中
    defaultChecked(menuIdList) {
      this.$nextTick(() => {
        // 使用 setTimeout 确保渲染完成后再选中
        setTimeout(() => {
          const leafNodes = menuIdList.filter(item => {
            const node = this.$refs.menuListTree.getNode(item)
            return !node.childNodes || node.childNodes.length === 0
          })
          this.$refs.menuListTree.setCheckedKeys(leafNodes)
        }, 100) // 延时100ms，确保树节点渲染完成
      })
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
        this.loading = true
        // 发起请求
        const url = this.dataForm.id ? this.url.update : this.url.save
        // 请求的数据
        const reqData = {
          ...this.dataForm,
          permissionIds: [
            ...this.$refs.menuListTree.getCheckedKeys(),
            ...this.$refs.menuListTree.getHalfCheckedKeys()
          ]
        }
        // 发送请求
        postAction(url, reqData).then(resp => {
          this.$message.success('操作成功')
          // 关闭当前弹窗
          this.handleCancel()
          // 通知父组件操作成功
          this.$emit('success')
        }).catch(error => {
          this.$message.error(error.message)
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
