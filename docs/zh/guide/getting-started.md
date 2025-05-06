# 快速开始

## 安装

### 全局安装

```bash
npm install -g ew-auto-import-tool
```

或者使用 yarn：

```bash
yarn global add ew-auto-import-tool
```

或者使用 pnpm：

```bash
pnpm add -g ew-auto-import-tool
```

### 直接使用 npx

也可以不安装，直接使用 npx 运行：

```bash
npx ew-auto-import-tool
```

## 基本使用

在 Vue 项目根目录下运行：

```bash
ew-auto-import-tool
```

工具将引导您选择组件库并自动完成配置。

## 指定组件库

您可以通过命令行参数指定要配置的组件库：

```bash
ew-auto-import-tool --library element-plus
```

## 指定项目路径

默认情况下，工具会在当前目录下查找 Vue 项目。您也可以指定项目路径：

```bash
ew-auto-import-tool --path /path/to/your/project
```

## 查看帮助

```bash
ew-auto-import-tool --help
```

## 配置完成后

配置完成后，您需要：

1. 重启开发服务器
2. 在组件中直接使用组件，无需手动导入

例如：

```vue
<template>
  <el-button type="primary">按钮</el-button>
  <el-input placeholder="请输入内容"></el-input>
</template>

<script setup lang="ts">
// 无需手动导入组件
</script>
```

## 下一步

- [使用方法](./usage.md) - 了解更多使用选项和示例
- [支持的组件库](./supported-libraries.md) - 查看支持的组件库详情
- [实现原理](./implementation.md) - 了解工具的实现原理
