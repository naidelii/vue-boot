<template>
  <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body width="1100px">
    <div class="container">
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <BpmnViewer />
        <Panel />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Header from './modules/Header'
import Panel from './modules/Panel'
import BpmnViewer from './modules/BpmnViewer'

export default {
  name: 'BpmnEditor',
  components: {
    Header,
    Panel,
    BpmnViewer
  },
  data() {
    return {
      // 模态框是否打开
      visible: false,
      // 添加loading状态
      loading: false,
      // 标题
      title: '流程图设计'
    }
  },
  created() { },
  methods: {
    add() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 700px;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body {
  display: flex;
  flex: 1;
  height: calc(100% - 60px);
}
</style>
