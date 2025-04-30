# 示例项目结构

以下是使用 Auto Import Tool 配置前后的 Vue 项目结构对比，帮助你理解工具的作用。

## 配置前的项目结构

```
my-vue-app/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue         # 需要手动导入组件
│   ├── main.ts
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json       # 不包含组件库和自动导入插件
├── tsconfig.json      # 不包含类型声明文件引用
├── tsconfig.node.json
└── vite.config.ts     # 不包含自动导入插件配置
```

## 配置前的 App.vue

```vue
<template>
  <div>
    <el-button type="primary">按钮</el-button>
    <el-input placeholder="请输入内容"></el-input>
  </div>
</template>

<script setup lang="ts">
// 需要手动导入组件
import { ElButton, ElInput } from "element-plus";
// 需要手动导入样式
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/input/style/css";
</script>
```

## 配置后的项目结构

```
my-vue-app/
├── node_modules/      # 新增了组件库和自动导入插件
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue        # 无需手动导入组件
│   ├── main.ts
│   └── vite-env.d.ts
├── .gitignore
├── auto-imports.d.ts  # 新增：API 自动导入声明文件
├── components.d.ts    # 新增：组件自动导入声明文件
├── index.html
├── package.json       # 更新：添加了组件库和自动导入插件
├── tsconfig.json      # 更新：引用了声明文件
├── tsconfig.node.json
└── vite.config.ts     # 更新：添加了自动导入插件配置
```

## 配置后的 App.vue

```vue
<template>
  <div>
    <el-button type="primary">按钮</el-button>
    <el-input placeholder="请输入内容"></el-input>
  </div>
</template>

<script setup lang="ts">
// 无需手动导入组件和样式
</script>
```

## 配置后的 vite.config.ts

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

## 配置后的 tsconfig.json

```json
{
  "compilerOptions": {
    // 其他配置...
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "auto-imports.d.ts", // 新增
    "components.d.ts" // 新增
  ]
}
```

## 配置后的 package.json (部分)

```json
{
  "dependencies": {
    "element-plus": "^2.3.8",
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^5.0.2",
    "unplugin-auto-import": "^0.16.6",
    "unplugin-vue-components": "^0.25.1",
    "vite": "^4.4.5"
  }
}
```
