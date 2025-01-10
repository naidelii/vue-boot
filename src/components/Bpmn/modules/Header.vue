<template>
  <div>
    <el-button-group>
      <el-tooltip class="item" effect="dark" content="保存流程图" placement="bottom">
        <el-button type="primary" size="mini" @click="handleSave">
          <i class="fa fa-save"> 保存草稿</i>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
        <el-button size="mini"><i class="fa fa-rotate-left" @click="undo" /></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
        <el-button size="mini" @click="zoom(0.05)">
          <i class="fa fa-search-plus" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
        <el-button size="mini" @click="zoom(-0.05)">
          <i class="fa fa-search-minus" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
        <el-button size="mini" @click="zoom(0)">
          <i class="fa fa-arrows" />
        </el-button>
      </el-tooltip>
    </el-button-group>
  </div>
</template>

<script>
import '@/assets/bpmn/font-awesome.min.css'

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
    undo() {

    },
    zoom() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
