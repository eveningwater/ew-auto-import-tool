# Rust 版本 Auto Import Tool 示例

这个示例展示了如何使用 Rust 版本的 Auto Import Tool 来配置 Vue 项目中组件库的按需导入。

## 前提条件

- 已安装 Rust 和 Cargo
- 已编译 Auto Import Tool 的 Rust 版本

## 使用方法

### 1. 编译工具

在 `rust` 目录下运行以下命令编译工具：

```bash
cargo build --release
```

编译后的可执行文件将位于 `target/release` 目录下。

### 2. 创建一个 Vue 项目

使用 Vite 创建一个新的 Vue 项目：

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
```

### 3. 使用工具配置组件库

运行编译后的工具，并指定要配置的组件库和项目路径：

```bash
# 使用相对路径运行工具
../target/release/ew-auto-import-tool --library element-plus --path ./my-vue-app
```

或者使用交互式方式：

```bash
../target/release/ew-auto-import-tool --path ./my-vue-app
```

然后按照提示选择要配置的组件库。

### 4. 验证配置

配置完成后，你可以在 Vue 项目中直接使用组件，无需手动导入：

```vue
<template>
  <el-button type="primary">按钮</el-button>
  <el-input placeholder="请输入内容"></el-input>
</template>

<script setup lang="ts">
// 无需手动导入组件
</script>
```

## 示例项目结构

```
examples/
  ├── README.md          # 本文档
  └── run-example.sh     # 示例运行脚本
```

## 注意事项

- 确保目标项目是基于 Vue 3 + Vite 的项目
- 工具会自动检测项目结构，并安装必要的依赖
- 支持的组件库包括：Element Plus、Ant Design Vue、Naive UI 和 Vant
