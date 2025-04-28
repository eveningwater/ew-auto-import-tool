<template>
    <div class="demo-component">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>组件示例</span>
                </div>
            </template>

            <el-form :model="form" label-width="120px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name" placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                    </el-select>
                </el-form-item>

                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%" />
                    </el-col>
                </el-form-item>

                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

            <el-divider content-position="center">按需导入说明</el-divider>

            <el-alert title="组件自动导入" type="info" description="此组件中的所有Element Plus组件都是自动导入的，无需手动import" :closable="false"
                show-icon />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// 表单数据
const form = reactive({
    name: '',
    region: '',
    date: '',
    delivery: false
})
</script>

<style scoped>
.demo-component {
    margin: 20px 0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>