<template>
  <!-- app-container 有默认样式 -->
  <div v-loading="loading" class="app-container">
    <!-- 操作按钮区域 -->
    <el-row :gutter="10" class="app-actions-section">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <!-- 操作按钮区域-END -->
    <el-tree
      ref="menuTree"
      v-loading="loading"
      node-key="id"
      :data="dataSource"
      :props="defaultProps"
      :expand-on-click-node="false"
      :default-expanded-keys="expandedKey"
      show-checkbox
    >
      <!-- 内容区域 -->
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span style="margin-left: 5px">
          <el-button size="mini" type="text" @click="handleEdit(data)">修改</el-button>
          <el-button size="mini" type="text" @click="handleDelete(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>

    <!-- 子组件，使用了mixins，则名称必须是：modalForm -->
    <category-form-model ref="modalForm" @success="modalFormSuccess" />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import { getAction } from '@/utils/action'
import CategoryFormModel from './modules/CategoryFormModel'
export default {
  components: {
    CategoryFormModel
  },
  mixins: [listMixin],
  data() {
    return {
      // 默认展开的节点的 key 的数组
      expandedKey: [],
      defaultProps: {
        children: 'children',
        label: 'categoryName'
      },
      url: {
        list: '/product/category/listWithTree',
        delete: '/product/category/delete'
      }
    }
  },
  created() { },
  methods: {
    // 重写loadData()方法
    loadData() {
      this.loading = true
      // 发送请求
      getAction(this.url.list).then(resp => {
        const { data } = resp
        // 有数据
        this.dataSource = data
      }).catch(e => {
        this.$message.error('操作失败，请稍微再试')
      }).finally(() => {
        this.loading = false
      })
    },
    // 删除
    handleDelete(node, data) {
      const title = `是否确认【删除】【菜单: ${data.categoryName}】的数据项？`
      // 单个删除，传递 isBatch = false
      this.doHandleDelete(title, data.id, false)
      // 设置默认展开的节点（删除节点的父节点）
      const parentNodeId = node.parent.data.id
      // 设置默认展开的节点（删除节点的父节点）
      this.expandedKey = parentNodeId ? [parentNodeId] : []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
