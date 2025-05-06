# 基本示例

本页面提供了 `ew-auto-import-tool` 的基本使用示例，帮助您快速了解工具的使用方法和效果。

## 使用前

在使用自动导入工具之前，您需要手动导入每个组件，这会导致代码冗长且难以维护。

### App.vue (使用前)

```vue
<template>
  <div class="container">
    <el-button type="primary">主要按钮</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 需要手动导入每个组件
import { ElButton, ElInput, ElSelect, ElOption } from "element-plus";
// 还需要手动导入样式
import "element-plus/dist/index.css";

const input = ref("");
const value = ref("");
const options = [
  { value: "选项1", label: "黄金糕" },
  { value: "选项2", label: "双皮奶" },
  { value: "选项3", label: "蚵仔煎" },
];
</script>
```

### vite.config.ts (使用前)

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

## 使用后

使用 `ew-auto-import-tool` 配置后，您无需手动导入组件和样式，代码更加简洁和易于维护。

### App.vue (使用后)

```vue
<template>
  <div class="container">
    <el-button type="primary">主要按钮</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 无需手动导入组件和样式！

const input = ref("");
const value = ref("");
const options = [
  { value: "选项1", label: "黄金糕" },
  { value: "选项2", label: "双皮奶" },
  { value: "选项3", label: "蚵仔煎" },
];
</script>
```

### vite.config.ts (使用后)

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

## 运行示例

您可以在项目的 `examples` 目录中找到完整的示例项目。按照以下步骤运行示例：

```bash
# 进入示例目录
cd examples

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 示例项目结构

示例项目包含以下文件和目录：

```
examples/
├── src/
│   ├── App.vue         # 使用自动导入的组件
│   ├── components/     # 自定义组件目录
│   └── main.ts         # 入口文件
├── auto-imports.d.ts   # 自动生成的API声明文件
├── components.d.ts     # 自动生成的组件声明文件
├── index.html          # HTML入口文件
├── package.json        # 项目配置文件
├── tsconfig.json       # TypeScript配置
├── tsconfig.node.json  # Node.js TypeScript配置
└── vite.config.ts      # Vite配置文件
```

## 更多示例

查看 [项目结构对比](/examples/project-structure) 了解更多关于配置前后项目结构的变化。
