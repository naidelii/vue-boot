<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="600px">
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="dataForm.username" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <!-- 仅在新增时显示密码字段 -->
          <el-col v-if="!dataForm.id" :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="dataForm.email" placeholder="邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="dataForm.sex" placeholder="请选择性别">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="dataForm.status">
                <el-radio :label="0">禁用</el-radio>
                <el-radio :label="1">正常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="dataForm.roleIds" placeholder="请选择角色" multiple>
                <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
import { getPasswordValidationRules } from '@/utils'
import { getUserById } from '@/api/system/user'
import { getRoleList } from '@/api/system/role'
import { postAction } from '@/utils/action'
export default {
  name: 'UserFormModal',
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
      // 角色信息
      roleOptions: [],
      // 性别信息
      sexOptions: [
        {
          label: '未知',
          value: 0
        },
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        password: getPasswordValidationRules(),
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      },
      url: {
        save: '/sys/user/save',
        update: '/sys/user/update'
      }
    }
  },
  created() {
  },
  methods: {
    // 获取角色列表
    async fetchRoleOptions() {
      try {
        const resp = await getRoleList()
        this.roleOptions = resp.data
      } catch (error) {
        this.$message.error('获取角色列表失败')
      }
    },
    async resetData(title, data = {}) {
      // 查询角色信息
      await this.fetchRoleOptions()
      this.title = title
      this.dataForm = data
      this.visible = true
    },
    add() {
      // 新增时的默认数据
      const defaultData = {
        username: '',
        password: '',
        email: '',
        mobile: '',
        roleIds: [],
        status: 1,
        sex: 0
      }
      this.resetData('新增', defaultData)
    },
    async edit(data) {
      // 查询用户信息
      const resp = await getUserById({ id: data.id })
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
      this.$refs.form.validate(valid => {
        // 表单校验未通过
        if (!valid) return false
        // 开始加载
        this.loading = true
        // 发起请求
        const url = this.dataForm.id ? this.url.update : this.url.save
        postAction(url, this.dataForm).then(resp => {
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
