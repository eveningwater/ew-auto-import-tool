# Auto Import Tool 示例项目

这是一个展示如何使用 auto-import-tool 工具配置 Element Plus 按需导入的示例项目。

## 项目结构

```
example/
  ├── src/                 # 源代码目录
  │   ├── App.vue         # 主应用组件
  │   ├── main.ts         # 入口文件
  │   └── components/     # 组件目录
  ├── vite.config.ts      # Vite 配置文件
  ├── tsconfig.json       # TypeScript 配置
  ├── package.json        # 项目依赖
  └── README.md           # 说明文档
```

## 使用方法

### 1. 初始化项目

```bash
cd example
npm install
```

### 2. 使用 auto-import-tool 配置 Element Plus 按需导入

```bash
node ../dist/cli.js --library element-plus
```

### 3. 启动开发服务器

```bash
npm run dev
```

## 示例说明

本示例展示了如何使用 auto-import-tool 工具自动配置 Element Plus 的按需导入，包括：

1. 自动安装必要的依赖
2. 自动修改 Vite 配置文件
3. 自动更新 TypeScript 配置
4. 自动生成类型声明文件

配置完成后，你可以在 Vue 组件中直接使用 Element Plus 组件，无需手动导入。
