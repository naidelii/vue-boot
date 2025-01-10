<template>
  <div ref="bpmnViewer" class="bpmn-viewer-contents" />
</template>

<script>
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import BpmnModeler from 'bpmn-js/lib/Modeler'

import activitiModele from '@/assets/bpmn/data/activiti.json'
import templateXml from '@/assets/bpmn/data/template'
import customTranslate from '@/assets/bpmn/data/translate/customTranslate'

export default {
  name: 'BpmnViewer',
  components: {},
  data() {
    return {
    }
  },
  mounted() {
    // 在组件挂载后初始化BPMN画板
    this.initBpmnViewer()
  },
  created() { },
  methods: {
    // 根据产品类型选择Moddle扩展
    getModdleExtensions() {
      const moddleExtensions = {
        activiti: activitiModele
      }
      return moddleExtensions
    },
    // 初始化BPMN Viewer
    initBpmnViewer() {
      // 获取画布 element
      const canvas = this.$refs.bpmnViewer
      // 创建BpmnModeler实例，传入容器、翻译扩展和moddle扩展
      const bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [
          {
            translate: ['value', customTranslate]// 自定义翻译模块
          }
        ],
        // 根据产品类型选择不同的Moddle扩展
        moddleExtensions: this.getModdleExtensions()
      })
      // 生成流程模板并加载
      const processId = new Date().getTime()
      const templateData = templateXml.initTemplate(processId)
      this.loadDiagram(templateData, bpmnModeler)
    },
    // 加载并渲染BPMN图形
    async loadDiagram(xml, bpmnModeler) {
      try {
        await bpmnModeler.importXML(xml)
        console.log('Diagram imported successfully')
      } catch (err) {
        console.error('Error importing BPMN 2.0 diagram:', err)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.bpmn-viewer-contents
  width: 100%
  height: 100%
  background: url(~@/assets/bpmn/svg/bpmn-background.svg) repeat !important
</style>
