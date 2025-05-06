# Introduction

## What is ew-auto-import-tool?

ew-auto-import-tool is a command-line tool for automatically configuring on-demand imports of component libraries in Vue projects. It helps developers quickly set up popular component libraries such as Element Plus, Ant Design Vue, etc., without manually modifying configuration files.

## Why do we need this tool?

When using component libraries in Vue projects, it's common to configure on-demand imports to optimize performance. This involves several steps:

1. Installing necessary dependencies
2. Configuring Vite plugins
3. Updating TypeScript configuration
4. Generating declaration files

These steps, while not complex, are tedious and prone to errors. The ew-auto-import-tool automates these configurations, allowing developers to focus on developing business logic.

## Tool Features

- **Dependency Management**: Automatically detect and install required dependencies
- **Vite Configuration**: Automatically add necessary import statements and plugin configurations
- **TypeScript Support**: Automatically update tsconfig.json file
- **Declaration Files**: Generate component and API declaration files

## Supported Libraries

Currently, ew-auto-import-tool supports the following component libraries:

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)
- [Naive UI](https://www.naiveui.com/)
- [Vant](https://vant-ui.github.io/vant/)

## Version Requirements

- Node.js >= 14.0.0
- Vue 3.x
- Vite 2.x or higher

## Next Steps

- [Getting Started](./getting-started.md) - Learn how to install and use the tool
- [Usage](./usage.md) - Detailed usage instructions and options
- [Supported Libraries](./supported-libraries.md) - View details of supported component libraries
- [Implementation](./implementation.md) - Understand the implementation principles of the tool
