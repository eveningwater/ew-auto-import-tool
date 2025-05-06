# 实现原理

ew-auto-import-tool 的实现原理主要分为以下几个步骤：

## 1. 项目检测

工具首先会检测项目结构，确认是否为 Vue + Vite + TypeScript 项目。具体检测内容包括：

- 检查 package.json 是否存在
- 检查是否安装了 Vue 依赖
- 检查是否使用 Vite 作为构建工具
- 检查是否存在 vite.config.ts 或 vite.config.js 文件
- 检查是否使用 TypeScript（是否存在 tsconfig.json 文件）
- 检测使用的包管理器（npm、yarn 或 pnpm）

这一步由 `projectChecker` 模块完成，确保工具只在兼容的项目中运行。

## 2. 依赖安装

确认项目结构有效后，工具会安装必要的依赖包：

- unplugin-auto-import - 用于自动导入 API
- unplugin-vue-components - 用于自动导入组件
- 选择的组件库（如 element-plus、ant-design-vue 等）

工具会根据检测到的包管理器（npm、yarn 或 pnpm）使用相应的命令安装依赖。

这一步由 `dependencyManager` 模块完成。

## 3. 配置更新

安装依赖后，工具会修改 vite.config.ts 文件，添加自动导入插件的配置：

1. 添加必要的导入语句：

   ```typescript
   import AutoImport from "unplugin-auto-import/vite";
   import Components from "unplugin-vue-components/vite";
   import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
   ```

2. 在 plugins 数组中添加插件配置：
   ```typescript
   AutoImport({
     resolvers: [ElementPlusResolver()],
   }),
   Components({
     resolvers: [ElementPlusResolver()],
   }),
   ```

这一步由 `viteConfigManager` 模块完成。

## 4. TypeScript 支持

如果项目使用 TypeScript，工具会更新 tsconfig.json 文件，添加声明文件引用：

```json
{
  "include": [
    // 其他配置...
    "components.d.ts",
    "auto-imports.d.ts"
  ]
}
```

这一步由 `tsConfigManager` 模块完成。

## 5. 文件生成

最后，工具会在项目根目录下创建两个声明文件：

- components.d.ts - 组件类型声明
- auto-imports.d.ts - API 类型声明

这些文件会在项目首次启动时由 unplugin-auto-import 和 unplugin-vue-components 插件自动更新。

这一步由 `declarationGenerator` 模块完成。

## 工作流程图

```
┌─────────────────┐
│  项目检测       │
│ projectChecker  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  依赖安装       │
│ dependencyManager│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vite配置更新   │
│ viteConfigManager│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ TypeScript配置  │
│ tsConfigManager  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  声明文件生成   │
│declarationGenerator│
└─────────────────┘
```

## 模块职责

- **projectChecker**: 检查项目结构，确认是否为有效的 Vue + Vite 项目
- **dependencyManager**: 安装必要的依赖包
- **viteConfigManager**: 更新 Vite 配置文件，添加自动导入插件
- **tsConfigManager**: 更新 TypeScript 配置文件，添加声明文件引用
- **declarationGenerator**: 生成初始的声明文件

## 技术实现

工具使用 Node.js 实现，主要依赖以下库：

- **commander**: 命令行参数解析
- **inquirer**: 交互式命令行界面
- **chalk**: 命令行输出着色
- **ora**: 命令行加载指示器
- **fs-extra**: 文件系统操作的扩展

通过这些库的组合使用，实现了一个简单易用的命令行工具，自动完成 Vue 项目中组件库按需导入的配置。
