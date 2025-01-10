<template>
  <div>
    <el-button-group>
      <el-tooltip class="item" effect="dark" content="保存流程图" placement="bottom">
        <el-button type="primary" size="mini" @click="handleSave">
          <i class="fa fa-save"> 保存</i>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
        <el-button size="mini"><i class="fa fa-rotate-left" @click="handleUndo" /></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
        <el-button size="mini" @click="handleZoom(0.05)">
          <i class="fa fa-search-plus" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
        <el-button size="mini" @click="handleZoom(-0.05)">
          <i class="fa fa-search-minus" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
        <el-button size="mini" @click="handleZoom(0)">
          <i class="fa fa-arrows" />
        </el-button>
      </el-tooltip>
    </el-button-group>
  </div>
</template>

<script>

export default {
  name: 'ViewerHeader',
  components: {},
  data() {
    return {

    }
  },
  created() { },
  methods: {
    handleSave() {

    },
    // 撤销
    handleUndo() {
      this.modeler.get('commandStack').undo()
      this.canRedo = this.modeler.get('commandStack').canRedo()
    },
    // 放大或缩小画布
    handleZoom(value) {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
