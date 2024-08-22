<template>
  <div class="tree-select">
    <!-- 使用 el-select 作为下拉框 -->
    <el-select ref="select" v-model="label" :placeholder="placeholder">
      <!-- 自定义 el-option，将 el-tree 作为下拉内容 -->
      <el-option class="tree-select-option" value="">
        <!-- 使用 el-tree 显示树形结构数据 -->
        <el-tree ref="tree" :data="treeData" :props="treePropsConfig" :node-key="nodeKey" highlight-current @node-click="handleNodeClick" />
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'TreeSelect',
  components: {},
  props: {
    // 树形数据，必须传递
    treeData: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    // 占位符文本，默认为“请选择”
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 节点的唯一标识key
    nodeKey: {
      type: String,
      default: 'id'
    },
    // el-tree 组件的配置项
    treePropsConfig: {
      type: Object,
      default: () => ({
        label: 'name',
        children: 'children'
      })
    }
  },
  data() {
    return {
      label: ''
    }
  },
  watch: {
    // 监听父组件传入的值的变化，并同步label
    value: {
      // 当组件初始化时立即执行一次
      immediate: true,
      handler(newVal) {
        console.log('val', newVal)
        this.label = newVal.name
      }
    }
  },
  methods: {
    // 处理树形节点被点击事件
    handleNodeClick(data) {
      // 更新父组件的值
      this.$emit('input', data)
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
