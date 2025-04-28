<template>
  <div class="container">
    <h1>Element Plus 按需导入示例</h1>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>按需导入演示</span>
        </div>
      </template>

      <el-alert title="无需手动导入组件" type="success" description="使用auto-import-tool配置后，可以直接使用Element Plus组件，无需手动导入"
        :closable="false" show-icon />

      <div class="demo-section">
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>

      <div class="demo-section">
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
      </div>

      <div class="demo-section">
        <el-date-picker v-model="date" type="date" placeholder="选择日期" />
      </div>
    </el-card>

    <!-- 引入示例组件 -->
    <DemoComponent />

    <el-divider content-position="center">配置说明</el-divider>

    <el-descriptions title="auto-import-tool 配置信息" :column="1" border>
      <el-descriptions-item label="组件库">Element Plus</el-descriptions-item>
      <el-descriptions-item label="自动导入插件">unplugin-vue-components, unplugin-auto-import</el-descriptions-item>
      <el-descriptions-item label="配置方式">使用 auto-import-tool 自动配置</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoComponent from './components/DemoComponent.vue'

// 响应式数据
const inputValue = ref('')
const date = ref('')
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-section {
  margin: 20px 0;
}
</style>