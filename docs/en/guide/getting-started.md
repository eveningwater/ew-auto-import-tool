# Getting Started

## Installation

### Global Installation

```bash
npm install -g ew-auto-import-tool
```

Or using yarn:

```bash
yarn global add ew-auto-import-tool
```

Or using pnpm:

```bash
pnpm add -g ew-auto-import-tool
```

### Using npx Directly

You can also run it directly without installation using npx:

```bash
npx ew-auto-import-tool
```

## Basic Usage

Run the following command in the root directory of your Vue project:

```bash
ew-auto-import-tool
```

The tool will guide you to select a component library and automatically complete the configuration.

## Specify Component Library

You can specify the component library to configure via command line parameters:

```bash
ew-auto-import-tool --library element-plus
```

## Specify Project Path

By default, the tool looks for a Vue project in the current directory. You can also specify the project path:

```bash
ew-auto-import-tool --path /path/to/your/project
```

## View Help

```bash
ew-auto-import-tool --help
```

## After Configuration

After the configuration is complete, you need to:

1. Restart the development server
2. Use components directly in your components without manual imports

For example:

```vue
<template>
  <el-button type="primary">Button</el-button>
  <el-input placeholder="Please input"></el-input>
</template>

<script setup lang="ts">
// No need to manually import components
</script>
```

## Next Steps

- [Usage](./usage.md) - Learn more usage options and examples
- [Supported Libraries](./supported-libraries.md) - View details of supported component libraries
- [Implementation](./implementation.md) - Understand the implementation principles of the tool
