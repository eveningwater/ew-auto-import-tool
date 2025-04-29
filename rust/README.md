# Vue 组件库自动导入工具 (Rust 版本)

## 简介

这是一个用 Rust 重写的 Vue 组件库自动导入配置工具，用于自动化配置 Vue 项目中组件库的按需导入。它可以帮助您快速设置流行的组件库（如 Element Plus、Ant Design Vue 等），无需手动修改配置文件。

## 功能特性

- 自动检测 Vue + Vite + TypeScript 项目结构
- 自动安装必要的依赖包
- 自动配置 Vite 配置文件，添加自动导入插件
- 自动更新 TypeScript 配置
- 自动生成声明文件

## 支持的组件库

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)
- [Naive UI](https://www.naiveui.com/)
- [Vant](https://vant-ui.github.io/vant/)

## 安装

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/eveningwater/ew-auto-import-tool.git
cd ew-auto-import-tool/rust

# 构建项目
cargo build --release

# 安装到系统路径（可选）
cargo install --path .
```

## 使用方法

### 基本用法

在 Vue 项目根目录下运行：

```bash
ew-auto-import-tool
```

工具将引导您选择组件库并自动完成配置。

### 命令行参数

```bash
# 指定组件库
ew-auto-import-tool --library element-plus

# 指定项目路径
ew-auto-import-tool --path /path/to/your/project

# 查看帮助
ew-auto-import-tool --help
```

## 实现原理

1. **项目检测**：验证 Vue + Vite + TypeScript 项目设置
2. **依赖安装**：安装 unplugin-auto-import、unplugin-vue-components 和组件库
3. **配置更新**：修改 vite.config.ts，添加自动导入插件
4. **TypeScript 支持**：更新 tsconfig.json 声明文件引用
5. **文件生成**：创建 components.d.ts 和 auto-imports.d.ts

## 许可证

MIT

## 作者

eveningwater
