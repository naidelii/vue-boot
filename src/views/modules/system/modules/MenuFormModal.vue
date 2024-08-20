<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="680px">
      <!-- 表单区域 -->
      <el-form ref="form" :model="dataForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单" prop="parentName">
              <tree-select
                v-model="treeSelectData.selectedItem"
                :placeholder="treeSelectData.placeholder"
                :tree-data="treeSelectData.menuList"
                :props="treeSelectData.menuListTreeProps"
              />
            </el-form-item>

            <el-col :span="24">
              <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="dataForm.type">
                  <el-radio v-for="(item, index) in typeOptions" :key="index" :label="item.value">{{ item.text }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col v-if="dataForm.type !== 2" :span="24">
              <el-form-item label="菜单图标" prop="icon">
                <el-popover v-model="iconSelectData.visible" placement="bottom-start" width="460">
                  <IconSelect ref="iconSelect" :active-icon="dataForm.icon" @selected="selectedIcon" />

                  <el-input slot="reference" v-model="dataForm.icon" placeholder="点击选择图标" readonly>
                    <svg-icon v-if="dataForm.icon" slot="prefix" class="icon-prefix" :icon-class="dataForm.icon" />
                    <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="menuNameLabel" prop="name">
                <el-input v-model="dataForm.name" :placeholder="`请输入${menuNameLabel}`" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="显示排序" prop="sortOrder">
                <el-input-number v-model="dataForm.sortOrder" controls-position="right" :min="0" />
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
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
// import { postAction } from '@/utils/action'
import { getMenuListToTree, getPermissionById } from '@/api/system/permission'
import TreeSelect from '@/components/TreeSelect'
import IconSelect from '@/components/IconSelect'

export default {
  name: 'MenuFormModal',
  components: {
    TreeSelect,
    IconSelect
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
      typeOptions: [
        { text: '目录', value: 0 },
        { text: '菜单', value: 1 },
        { text: '按钮权限', value: 2 }
      ],
      treeSelectData: {
        selectedItem: {
          parentId: '',
          parentName: ''
        },
        placeholder: '请选择上级菜单',
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        }
      },
      iconSelectData: {
        visible: false
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      },
      url: {
        save: '/sys/permission/save',
        update: '/sys/permission/update'
      }
    }
  },
  computed: {
    // 计算菜单名称标签，根据不同的类型动态变化
    menuNameLabel() {
      if (this.dataForm.type === 0) {
        return '目录名称'
      } else if (this.dataForm.type === 1) {
        return '菜单名称'
      } else if (this.dataForm.type === 2) {
        return '按钮权限名称'
      }
      return ''
    }
  },
  created() { },
  methods: {
    async fetchtMenuList() {
      try {
        const resp = await getMenuListToTree()
        this.treeSelectData.menuList = resp.data
      } catch (error) {
        this.$message.error('获取菜单列表失败')
      }
    },
    async resetData(title, data = {}) {
      // 查询菜单信息
      await this.fetchtMenuList()
      this.title = title
      this.dataForm = data
      this.visible = true
    },
    add() {
      // 新增时的默认数据
      this.resetData('新增', {
        name: '',
        type: 0,
        icon: '',
        sortOrder: 0
      })
    },
    async edit(data) {
      // 查询菜单信息
      const resp = await getPermissionById({ id: data.id })
      const { parentId, parentName, ...dataModel } = resp.data
      // 设置菜单信息
      this.treeSelectData.selectedItem.parentId = parentId
      this.treeSelectData.selectedItem.parentName = parentName
      // 设置表单需要的数据
      this.resetData('编辑', dataModel)
    },
    // 选择图标
    selectedIcon(name) {
      this.dataForm.icon = name
      this.iconSelectData.visible = false
    },
    // 关闭弹出框
    handleCancel() {
      this.visible = false
    },
    // 表单提交
    handleSubmit() {
      console.log('this.form', this.treeSelectData.selectedItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-prefix {
  width: 25px;
}
</style>
