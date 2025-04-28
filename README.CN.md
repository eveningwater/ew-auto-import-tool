# Auto Import Tool (自动化按需导入工具)

[![NPM Version](https://img.shields.io/npm/v/ew-auto-import-tool.svg)](https://www.npmjs.com/package/ew-auto-import-tool)
[![License](https://img.shields.io/npm/l/ew-auto-import-tool.svg)](https://github.com/eveningwater/ew-auto-import-tool/blob/main/LICENSE)

## 简介

自动化按需导入工具是一个命令行工具，用于自动配置 Vue 项目中组件库的按需导入。它可以帮助你快速设置 Element Plus、Ant Design Vue 等组件库的按需导入，无需手动修改配置文件。

## 功能特点

- **依赖管理**：自动检测并安装所需依赖
- **Vite 配置修改**：自动添加必要的 import 语句和插件配置
- **TypeScript 支持**：自动更新 tsconfig.json 文件
- **声明文件生成**：自动生成组件和 API 的声明文件

## 安装

```bash
npm install -g ew-auto-import-tool
```

或者使用 npx 直接运行：

```bash
npx ew-auto-import-tool
```

## 使用方法

### 基本用法

在 Vue 项目根目录下运行：

```bash
ew-auto-import-tool
```

工具会引导你选择要配置的组件库，并自动完成配置。

### 命令行选项

```bash
ew-auto-import-tool --library element-plus
```

#### 可用选项

- `-l, --library <library>`: 指定要配置的组件库 (element-plus, ant-design-vue, naive-ui, vant)
- `-p, --path <path>`: 指定项目路径，默认为当前目录
- `-v, --version`: 显示版本号
- `-h, --help`: 显示帮助信息

## 支持的组件库

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)
- [Naive UI](https://www.naiveui.com/)
- [Vant](https://vant-ui.github.io/vant/)

## 工作原理

1. **项目检测**：检查是否为 Vue + Vite + TypeScript 项目
2. **依赖安装**：安装 unplugin-auto-import、unplugin-vue-components 和组件库
3. **配置修改**：更新 vite.config.ts 文件，添加自动导入插件
4. **TypeScript 支持**：更新 tsconfig.json，添加声明文件
5. **声明文件生成**：生成 components.d.ts 和 auto-imports.d.ts 文件

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
// 无需手动导入组件和样式
</script>

<template>
  <el-button>按钮</el-button>
  <el-input placeholder="请输入内容" />
</template>
```

## 贡献指南

欢迎贡献代码、报告问题或提出改进建议！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

[MIT](LICENSE)
