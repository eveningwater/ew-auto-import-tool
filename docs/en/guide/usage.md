# Usage

## Command Line Options

ew-auto-import-tool provides the following command line options:

| Option      | Short | Description                   | Default Value      |
| ----------- | ----- | ----------------------------- | ------------------ |
| `--library` | `-l`  | Specify the component library | None (interactive) |
| `--path`    | `-p`  | Specify the project path      | Current directory  |
| `--version` | `-v`  | Display version number        | -                  |
| `--help`    | `-h`  | Display help information      | -                  |

## Interactive Usage

The simplest way to use the tool is to run it in the root directory of your Vue project:

```bash
ew-auto-import-tool
```

The tool will guide you through the following steps:

1. Select the component library to configure
2. Confirm configuration information
3. Automatically complete the configuration

## Non-interactive Usage

If you want to use it in scripts or CI/CD environments, you can specify all necessary parameters:

```bash
ew-auto-import-tool --library element-plus --path /path/to/your/project
```

## Supported Libraries

Currently, the following component libraries are supported:

- `element-plus` - Element Plus
- `ant-design-vue` - Ant Design Vue
- `naive-ui` - Naive UI
- `vant` - Vant

## Configuration Examples

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

## Configuration Results

After the tool runs successfully, it will complete the following configurations:

1. Install necessary dependencies:

   - unplugin-auto-import
   - unplugin-vue-components
   - The selected component library

2. Update the vite.config.ts file, adding auto-import plugin configuration

3. Update the tsconfig.json file, adding declaration file references

4. Generate components.d.ts and auto-imports.d.ts declaration files

## Using the Generated Configuration

After configuration is complete, you can directly use the components from the component library in your Vue components without manual imports:

```vue
<template>
  <el-button type="primary">Button</el-button>
  <el-input placeholder="Please input"></el-input>
</template>

<script setup lang="ts">
// No need to manually import components
</script>
```
