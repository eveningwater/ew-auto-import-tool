# 支持的组件库

ew-auto-import-tool 目前支持以下流行的 Vue 组件库的自动导入配置：

## Element Plus

[Element Plus](https://element-plus.org/) 是一套基于 Vue 3 的桌面端组件库。

### 配置示例

```bash
ew-auto-import-tool --library element-plus
```

### 生成的配置

```typescript
// vite.config.ts
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

## Ant Design Vue

[Ant Design Vue](https://antdv.com/) 是 Ant Design 的 Vue 实现，开发和服务于企业级后台产品。

### 配置示例

```bash
ew-auto-import-tool --library ant-design-vue
```

### 生成的配置

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
```

## Naive UI

[Naive UI](https://www.naiveui.com/) 是一个 Vue 3 组件库，使用 TypeScript 编写，快速且轻量。

### 配置示例

```bash
ew-auto-import-tool --library naive-ui
```

### 生成的配置

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
});
```

## Vant

[Vant](https://vant-ui.github.io/vant/) 是一个轻量、可靠的移动端 Vue 组件库。

### 配置示例

```bash
ew-auto-import-tool --library vant
```

### 生成的配置

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
});
```

## 添加更多组件库支持

如果您需要支持其他组件库，可以通过以下方式贡献：

1. Fork 项目仓库
2. 在 `src/types.ts` 中添加新的组件库配置
3. 提交 Pull Request

我们欢迎社区贡献，帮助支持更多的组件库！
