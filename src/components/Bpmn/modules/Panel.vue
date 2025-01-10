<template>
  <div class="bpmn-panel">
    <el-container>
      <el-header height="45px">
        <div class="config-tab" :class="{ active: configTab == 'process' }">流程属性</div>
        <div class="config-tab" :class="{ active: configTab == 'node' }">节点属性</div>
      </el-header>

    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Panel',
  components: {
  },
  data() {
    return {
      configTab: 'process'
    }
  },
  created() { },
  methods: {}
}
</script>

<style lang="sass" scoped>
.bpmn-panel
  width: 350px
  border: 1px solid #eeeeee
  padding: 0 5px

.el-header
  border-bottom: solid 2px #e4e7ed
  padding: 0

  .config-tab
    height: 43px
    line-height: 43px
    display: inline-block
    width: 50%
    text-align: center
    font-size: 14px
    font-weight: 500
    position: relative
    cursor: pointer
</style>
