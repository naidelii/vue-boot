<template>
  <!-- app-container 有默认样式 -->
  <div class="app-container">
    <!-- 操作按钮区域 -->
    <el-row :gutter="10" class="app-actions-section">
      <el-col :span="1.5">
        <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button> -->
      </el-col>
    </el-row>
    <!-- 操作按钮区域-END -->

    <el-tree
      ref="menuTree"
      node-key="id"
      :data="dataSource"
      :props="defaultProps"
      :expand-on-click-node="false"
      :default-expanded-keys="expandedKey"
      show-checkbox
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => handleEdit(data)">修改</el-button>
          <el-button type="text" size="mini" @click="() => handleDelete(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import { getAction } from '@/utils/action'
export default {
  components: {},
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
        save: '/product/category/save',
        update: '/product/category/update',
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
      // 要删除的id
      const id = data.id
      if (!id) {
        this.$message.error('当前未选择要删除的数据！')
        return
      }
      const title = `是否确认【删除】【菜单: ${data.categoryName}】的数据项？`
      // 单个删除，传递 isBatch = false
      this.doHandleDelete(title, id, false)
      // 设置默认展开的节点（删除节点的父节点）
      const parentNodeId = node.parent.data.id
      this.expandedKey = parentNodeId ? [parentNodeId] : []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
