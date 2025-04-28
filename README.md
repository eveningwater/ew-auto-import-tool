# Auto Import Tool

[![NPM Version](https://img.shields.io/npm/v/ew-auto-import-tool.svg)](https://www.npmjs.com/package/ew-auto-import-tool)
[![License](https://img.shields.io/npm/l/ew-auto-import-tool.svg)](https://github.com/eveningwater/ew-auto-import-tool/blob/main/LICENSE)

## Introduction

The Auto Import Tool is a CLI utility that automatically configures on-demand imports for component libraries in Vue projects. It helps quickly set up popular component libraries like Element Plus, Ant Design Vue, etc., without manual configuration file modifications.

## Features

- **Dependency Management**: Automatically detects and installs required dependencies
- **Vite Configuration**: Automatically adds necessary import statements and plugin configurations
- **TypeScript Support**: Updates tsconfig.json file automatically
- **Declaration Files**: Generates component and API declaration files

## Installation

```bash
npm install -g ew-auto-import-tool
```

Or run directly using npx:

```bash
npx ew-auto-import-tool
```

## Usage

### Basic Usage

Run in Vue project root:

```bash
ew-auto-import-tool
```

The tool will guide you to select component libraries and complete configuration automatically.

### CLI Options

```bash
ew-auto-import-tool --library element-plus
```

#### Available Options

- `-l, --library <library>`: Specify component library (element-plus, ant-design-vue, naive-ui, vant)
- `-p, --path <path>`: Specify project path (default: current directory)
- `-v, --version`: Show version
- `-h, --help`: Display help

## Supported Libraries

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)
- [Naive UI](https://www.naiveui.com/)
- [Vant](https://vant-ui.github.io/vant/)

## Implementation

1. **Project Detection**: Verifies Vue + Vite + TypeScript project setup
2. **Dependency Installation**: Installs unplugin-auto-import, unplugin-vue-components and component libraries
3. **Configuration Update**: Modifies vite.config.ts with auto-import plugins
4. **TypeScript Support**: Updates tsconfig.json declaration file references
5. **File Generation**: Creates components.d.ts and auto-imports.d.ts

## Example

Before configuration:

```vue
<script setup lang="ts">
import { ElButton, ElInput } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/input/style/css";
</script>

<template>
  <el-button>Button</el-button>
  <el-input placeholder="Input content" />
</template>
```

After configuration:

```vue
<script setup lang="ts">
// No manual imports needed
</script>

<template>
  <el-button>Button</el-button>
  <el-input placeholder="Input content" />
</template>
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

```


```
