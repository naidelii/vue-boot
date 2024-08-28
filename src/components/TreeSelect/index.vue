<template>
  <div class="tree-select">
    <!-- 使用 el-select 作为下拉框，绑定 model 为 label -->
    <el-select ref="select" v-model="label" :placeholder="placeholder">
      <!-- 自定义 el-option，将 el-tree 作为下拉内容显示 -->
      <el-option class="tree-select-option" value="">
        <!-- 使用 el-tree 显示树形结构数据 -->
        <el-tree
          ref="tree"
          :data="treeData"
          :props="treePropsConfig"
          :node-key="nodeKey"
          :highlight-current="true"
          @node-click="handleNodeClick"
        />
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'TreeSelect',
  components: {},
  props: {
    // 树形数据，必须传递，由父组件提供
    treeData: {
      type: Array,
      required: true
    },
    // 父组件传入的值对象，必须传递，用于更新下拉框的选中值
    value: {
      type: Object,
      required: true
    },
    // 下拉框的占位符文本，默认为“请选择”
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 节点的唯一标识key，默认使用 'id' 作为标识字段
    nodeKey: {
      type: String,
      default: 'id'
    },
    // el-tree 组件的配置项，用于配置节点标签和子节点字段
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
    }
  },
  computed: {
    label() {
      return this.value.name || ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.$nextTick(() => {
          setTimeout(() => {
            if (this.$refs.tree) {
              // 设置高亮显式
              this.$refs.tree.setCurrentKey(newVal.id)
            }
          }, 300) // 可以调整延迟时间
        })
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
