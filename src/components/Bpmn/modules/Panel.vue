<template>
  <div class="bpmn-panel">
    <el-container>
      <el-header>
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
</style>
