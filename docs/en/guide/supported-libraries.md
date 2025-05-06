# Supported Libraries

ew-auto-import-tool currently supports the following Vue component libraries. For each library, the tool automatically configures the necessary plugins and dependencies for on-demand imports.

## Element Plus

[Element Plus](https://element-plus.org/) is a Vue 3 based component library for designers and developers.

### Features

- Comprehensive design system with over 50 components
- TypeScript support
- Internationalization support
- Theme customization

### Configuration

When configuring Element Plus, the tool will:

1. Install dependencies:

   - element-plus
   - unplugin-auto-import
   - unplugin-vue-components

2. Configure Vite plugins with the ElementPlusResolver

### Usage Example

```vue
<template>
  <el-button type="primary">Primary Button</el-button>
  <el-input v-model="input" placeholder="Please input"></el-input>
</template>

<script setup lang="ts">
const input = ref("");
</script>
```

## Ant Design Vue

[Ant Design Vue](https://antdv.com/) is an enterprise-class UI components based on Ant Design and Vue.

### Features

- Enterprise-level design system
- Rich set of high-quality components
- Written in TypeScript with complete types
- Internationalization support

### Configuration

When configuring Ant Design Vue, the tool will:

1. Install dependencies:

   - ant-design-vue
   - unplugin-auto-import
   - unplugin-vue-components

2. Configure Vite plugins with the AntDesignVueResolver

### Usage Example

```vue
<template>
  <a-button type="primary">Primary Button</a-button>
  <a-input v-model:value="input" placeholder="Please input"></a-input>
</template>

<script setup lang="ts">
const input = ref("");
</script>
```

## Naive UI

[Naive UI](https://www.naiveui.com/) is a Vue 3 component library with TypeScript support and flexible theme customization.

### Features

- Over 80 components
- Theme customization
- TypeScript support
- Tree-shakable

### Configuration

When configuring Naive UI, the tool will:

1. Install dependencies:

   - naive-ui
   - unplugin-auto-import
   - unplugin-vue-components

2. Configure Vite plugins with the NaiveUiResolver

### Usage Example

```vue
<template>
  <n-button type="primary">Primary Button</n-button>
  <n-input v-model:value="input" placeholder="Please input"></n-input>
</template>

<script setup lang="ts">
const input = ref("");
</script>
```

## Vant

[Vant](https://vant-ui.github.io/vant/) is a lightweight mobile UI component library for Vue.

### Features

- 60+ high-quality components
- 90%+ unit test coverage
- Extensive documentation and demos
- Support for tree shaking

### Configuration

When configuring Vant, the tool will:

1. Install dependencies:

   - vant
   - unplugin-auto-import
   - unplugin-vue-components

2. Configure Vite plugins with the VantResolver

### Usage Example

```vue
<template>
  <van-button type="primary">Primary Button</van-button>
  <van-field v-model="input" placeholder="Please input"></van-field>
</template>

<script setup lang="ts">
const input = ref("");
</script>
```
