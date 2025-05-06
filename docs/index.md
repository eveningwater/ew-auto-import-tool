---
pageType: home

hero:
  name: ew-auto-import-tool
  text: Vue组件库自动导入工具
  tagline: 快速配置Vue项目中组件库的按需导入
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/eveningwater/ew-auto-import-tool

features:
  - title: 依赖管理
    details: 自动检测并安装所需依赖
    icon: 📦
  - title: Vite配置
    details: 自动添加必要的导入语句和插件配置
    icon: ⚙️
  - title: TypeScript支持
    details: 自动更新tsconfig.json文件
    icon: 📝
  - title: 声明文件
    details: 生成组件和API声明文件
    icon: 📄
---

## 简介

ew-auto-import-tool 是一个 CLI 工具，用于自动配置 Vue 项目中组件库的按需导入。它可以帮助您快速设置流行的组件库，如 Element Plus、Ant Design Vue 等，无需手动修改配置文件。

## 特性

- **依赖管理**：自动检测并安装所需依赖
- **Vite 配置**：自动添加必要的导入语句和插件配置
- **TypeScript 支持**：自动更新 tsconfig.json 文件
- **声明文件**：生成组件和 API 声明文件

## 支持的组件库

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)
- [Naive UI](https://www.naiveui.com/)
- [Vant](https://vant-ui.github.io/vant/)

## 示例

配置前：

```vue
<script setup lang="ts">
import { ElButton, ElInput } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/input/style/css";
</script>

<template>
  <el-button>按钮</el-button>
  <el-input placeholder="请输入内容" />
</template>
```

配置后：

```vue
<script setup lang="ts">
// 无需手动导入
</script>

<template>
  <el-button>按钮</el-button>
  <el-input placeholder="请输入内容" />
</template>
```
