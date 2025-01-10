<template>
  <el-dialog :title="title" :visible.sync="visible" fullscreen>
    <BpmnEditor />
  </el-dialog>
</template>

<script>
import BpmnEditor from '@/components/Bpmn/index'

export default {
  name: 'DesignFormModal',
  components: {
    BpmnEditor
  },
  data() {
    return {
      // 模态框是否打开
      visible: false,
      // 添加loading状态
      loading: false,
      // 标题
      title: '流程图'
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

<style lang="sass" scoped>

</style>
