<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="body">
      <!-- 画板 -->
      <div ref="bpmnViewer" class="bpmn-viewer-contents" />
      <!-- 属性面板 -->
      <Panel class="panel" />
    </div>
  </div>
</template>

<script>
import Header from './modules/Header'
import Panel from './modules/Panel'

import BpmnModeler from 'bpmn-js/lib/Modeler'

import '@/assets/bpmn/styles/vue-bmpn.scss'

// 导入自定义资源
import activitiModele from '@/assets/bpmn/data/activiti.json'
import templateXml from '@/assets/bpmn/data/template'
import customTranslate from '@/assets/bpmn/data/translate/customTranslate'

export default {
  name: 'BpmnEditor',
  components: {
    Header,
    Panel
  },
  data() {
    return {
      // BPMN模型器实例
      bpmnModeler: null
    }
  },
  mounted() {
    // 初始化流程编辑器
    this.initializeBpmnModeler()
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

    createTemplate() {
      const processId = new Date().getTime()
      return templateXml.initTemplate(processId)
    },

    // 初始化 BPMN 编辑器
    initializeBpmnModeler() {
      // 第一步：创建模板 XML
      const templateData = this.createTemplate()
      // 第二步：初始化 BPMN Viewer
      this.initBpmnViewer()
      // 第三步：加载流程图
      this.loadDiagram(templateData)
    },

    // 初始化BPMN Viewer
    initBpmnViewer() {
      // 获取画布 element
      const canvas = this.$refs.bpmnViewer
      // 创建BpmnModeler实例，传入容器、翻译扩展和moddle扩展
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [
          {
            translate: ['value', customTranslate]// 自定义翻译模块
          }
        ],
        // 根据产品类型选择不同的Moddle扩展
        moddleExtensions: this.getModdleExtensions()
      })
    },

    // 加载并渲染BPMN图形
    async loadDiagram(xml) {
      try {
        await this.bpmnModeler.importXML(xml)
      } catch (err) {
        // 抛出异常
        this.$message.error('加载BPMN图形失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
