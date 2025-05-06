# 介绍

## 什么是 ew-auto-import-tool?

ew-auto-import-tool 是一个命令行工具，用于自动配置 Vue 项目中组件库的按需导入。它可以帮助开发者快速设置流行的组件库，如 Element Plus、Ant Design Vue 等，无需手动修改配置文件。

## 为什么需要这个工具?

在 Vue 项目中使用组件库时，为了优化性能，通常需要配置按需导入。这涉及到以下几个步骤：

1. 安装必要的依赖包
2. 配置 Vite 插件
3. 更新 TypeScript 配置
4. 生成声明文件

这些步骤虽然不复杂，但比较繁琐，容易出错。ew-auto-import-tool 工具可以自动完成这些配置，让开发者专注于业务逻辑的开发。

## 工具特性

- **依赖管理**：自动检测并安装所需依赖
- **Vite 配置**：自动添加必要的导入语句和插件配置
- **TypeScript 支持**：自动更新 tsconfig.json 文件
- **声明文件**：生成组件和 API 声明文件

## 支持的组件库

目前，ew-auto-import-tool 支持以下组件库：

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)
- [Naive UI](https://www.naiveui.com/)
- [Vant](https://vant-ui.github.io/vant/)

## 版本要求

- Node.js >= 14.0.0
- Vue 3.x
- Vite 2.x 或更高版本

## 下一步

- [快速开始](./getting-started.md) - 了解如何安装和使用工具
- [使用方法](./usage.md) - 详细的使用说明和选项
- [支持的组件库](./supported-libraries.md) - 查看支持的组件库详情
- [实现原理](./implementation.md) - 了解工具的实现原理
