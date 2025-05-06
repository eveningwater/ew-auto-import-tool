# 使用方法

## 命令行选项

ew-auto-import-tool 提供了以下命令行选项：

| 选项        | 简写 | 描述               | 默认值           |
| ----------- | ---- | ------------------ | ---------------- |
| `--library` | `-l` | 指定要配置的组件库 | 无（交互式选择） |
| `--path`    | `-p` | 指定项目路径       | 当前目录         |
| `--version` | `-v` | 显示版本号         | -                |
| `--help`    | `-h` | 显示帮助信息       | -                |

## 交互式使用

最简单的使用方式是在 Vue 项目根目录下运行：

```bash
ew-auto-import-tool
```

工具将引导您完成以下步骤：

1. 选择要配置的组件库
2. 确认配置信息
3. 自动完成配置

## 非交互式使用

如果您想在脚本或 CI/CD 环境中使用，可以指定所有必要的参数：

```bash
ew-auto-import-tool --library element-plus --path /path/to/your/project
```

## 支持的组件库

目前支持以下组件库：

- `element-plus` - Element Plus
- `ant-design-vue` - Ant Design Vue
- `naive-ui` - Naive UI
- `vant` - Vant

## 配置示例

### Element Plus

```bash
ew-auto-import-tool --library element-plus
```

### Ant Design Vue

```bash
ew-auto-import-tool --library ant-design-vue
```

### Naive UI

```bash
ew-auto-import-tool --library naive-ui
```

### Vant

```bash
ew-auto-import-tool --library vant
```

## 配置结果

工具成功运行后，将完成以下配置：

1. 安装必要的依赖包：

   - unplugin-auto-import
   - unplugin-vue-components
   - 选择的组件库

2. 更新 vite.config.ts 文件，添加自动导入插件配置

3. 更新 tsconfig.json 文件，添加声明文件引用

4. 生成 components.d.ts 和 auto-imports.d.ts 声明文件

## 使用生成的配置

配置完成后，您可以在 Vue 组件中直接使用组件库的组件，无需手动导入：

```vue
<template>
  <el-button type="primary">按钮</el-button>
  <el-input placeholder="请输入内容"></el-input>
</template>

<script setup lang="ts">
// 无需手动导入组件
</script>
```

## 故障排除

如果配置过程中出现问题，工具会显示详细的错误信息。以下是一些常见问题及解决方法：

### 未检测到 Vue 依赖

确保您的项目是基于 Vue 3 的项目，并且 package.json 中包含 Vue 依赖。

### 未检测到 Vite 依赖

此工具仅支持 Vite 项目，确保您的项目使用 Vite 作为构建工具。

### 未找到 vite.config.ts 或 vite.config.js 文件

确保您的项目根目录下有 vite.config.ts 或 vite.config.js 文件。

### 依赖安装失败

检查网络连接，或尝试手动安装依赖包。
