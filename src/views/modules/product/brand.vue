<template>
  <!-- app-container 有默认样式 -->
  <div class="app-container">
    <!-- 查询区域 -->
    <el-form ref="queryForm" :model="queryParam" :inline="true">
      <el-form-item prop="brandName" label="品牌名称">
        <el-input v-model="queryParam.brandName" placeholder="请输入品牌名称" size="small" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item prop="firstLetter" label="检索首字母">
        <el-input v-model="queryParam.firstLetter" placeholder="请输入检索首字母" size="small" clearable style="width: 200px" />
      </el-form-item>

      <!-- 查询区域-操作按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh-right" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <!-- 查询区域-操作按钮-END -->
    </el-form>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <el-row :gutter="10" class="app-actions-section">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteBatch">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作按钮区域-END -->

    <!-- table区域 -->
    <el-table v-loading="loading" :data="dataSource" border @selection-change="handleSelectionChange">
      <!-- 多选列 -->
      <el-table-column type="selection" align="center" width="50" />

      <!-- 数据列 -->
      <el-table-column prop="id" align="center" width="180" label="ID" />
      <el-table-column prop="brandName" align="center" label="品牌名称" />
      <el-table-column prop="logoUrl" align="center" label="品牌logo">
        <template slot-scope="{ row }">
          <image-cell :value="row.logoUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="介绍" />
      <el-table-column prop="isShow" align="center" label="是否显示">
        <template #default="{ row }">
          <status-switch v-model="row.isShow" :record-id="row.id" @change="updateBrandStatus" />
        </template>
      </el-table-column>
      <el-table-column prop="sortOrder" align="center" label="排序值" />
      <el-table-column prop="firstLetter" align="center" label="检索首字母" />

      <!-- 操作列 -->
      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table区域-END -->

    <!-- 分页组件 -->
    <pagination
      :total="ipagination.total"
      :current.sync="ipagination.current"
      :page-size.sync="ipagination.pageSize"
      @pagination="loadData"
    />

    <!-- 子组件，使用了mixins，则名称必须是：modalForm -->
    <brand-form-model ref="modalForm" @success="modalFormSuccess" />
  </div>
</template>

<script>
import ImageCell from '@/components/ImageCell'
import listMixin from '@/mixins/listMixin'
import StatusSwitch from '@/components/StatusSwitch'
import { postAction } from '@/utils/action'
import BrandFormModel from './modules/BrandFormModel'
export default {
  components: {
    StatusSwitch,
    BrandFormModel,
    ImageCell
  },
  mixins: [listMixin],
  data() {
    return {
      url: {
        list: '/product/brand/listPage',
        update: '/product/brand/update',
        deleteBatch: '/product/brand/deleteBatch'
      }
    }
  },
  created() { },
  methods: {
    // 改变显式状态
    updateBrandStatus(tableId, newVal, callback) {
      // 开始加载
      this.loading = true
      // 请求的数据
      const reqData = {
        id: tableId,
        isShow: newVal
      }
      // 发送请求
      postAction(this.url.update, reqData).then(resp => {
        this.$message.success('操作成功')
        // 请求成功，确认更新状态
        callback(true)
      }).catch(() => {
        // 请求失败，还原状态
        callback(false)
      }).finally(() => {
        // 请求完成后停止加载
        this.loading = false
      })
    },
    handleDelete(id) {
      if (!id) {
        this.$message.error('当前未选择要删除的数据！')
        return
      }
      const title = `是否确认【删除】【ID: ${id}】的数据项？`
      // 调用批量删除
      this.doHandleDelete(title, [id], true)
    }
  }
}
</script>

<style scoped>
</style>
