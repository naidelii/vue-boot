<template>
  <div class="tree-select">
    <el-select ref="select" v-model="selectedLabel" :placeholder="placeholder">
      <el-option class="tree-select-option" value="">
        <!-- 使用 el-tree 作为 select 的 dropdown 内容 -->
        <el-tree ref="tree" :data="treeData" :props="props" :node-key="nodeKey" highlight-current @node-click="handleNodeClick" />
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'TreeSelect',
  components: {},
  props: {
    treeData: {
      type: Array,
      required: true
    },
    // 可以是你想要绑定的数据类型
    value: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  data() {
    return {
      selectedLabel: this.value.parentName
    }
  },
  created() {
  },
  methods: {
    // 节点被点击
    handleNodeClick(data) {
      // 当节点被点击时，更新 selectedLabel
      this.selectedLabel = data.name
      // 并通过 emit 传递给父组件，触发 input 事件更新 v-model 绑定的值
      // 将数据传递给父组件
      this.$emit('input', {
        parentId: data.id,
        parentName: data.name
      })
      // 设置高亮选中
      this.$refs.tree.setCurrentKey(data.id)
      // 关闭下拉框
      this.$refs.select.blur()
    }
  }
}
</script>

<style scoped lang="scss">
.tree-select {
  .el-select {
    width: 100%;
  }
}
.tree-select-option {
  height: 100%;
  padding: 0;
}
</style>
