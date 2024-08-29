<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="uploadAction"
      :data="formData"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
  </div>
</template>
<script>

import { getPolicy } from '@/api/thirdParty/oss'

export default {
  name: 'SingleImageUpload',
  props: {
    // 文件地址
    value: {
      type: [String, null],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      // 从环境变量中获取 uploadAction
      uploadAction: process.env.VUE_APP_UPLOAD_ACTION,
      // 文件上传至哪个文件夹
      dirName: 'brand',
      // minio的相关配置
      formData: {},
      // 方法的图片
      imageUrl: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        // 设置图片
        this.imageUrl = newVal || ''
      }
    }
  },
  methods: {
    // 文件上传前（可以做一些校验）
    async handleBeforeUpload(file) {
      // 获取文件名
      const fileName = file.name
      const params = { fileName, dirName: this.dirName }
      try {
        // 发送请求，获得上传凭证
        const resp = await getPolicy(params)
        this.formData = resp.data
      } catch (e) {
        this.$message.error('获取上传凭证失败，请稍后重试')
        // 抛出异常，不继续执行（如果上面有需要不继续执行，也是需要抛出异常才可以）
        throw new Error('Failed to getPolicy')
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      // 当前文件的信息
      const url = this.uploadAction + this.formData.key
      // 展示图片
      this.imageUrl = url
      // 将图片信息返回给父组件
      this.$emit('input', url)
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
