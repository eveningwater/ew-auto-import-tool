# 核心 API

ew-auto-import-tool 提供了一系列核心 API，可以在您的项目中以编程方式使用。以下是主要的 API 函数及其用法。

## configureAutoImport

主函数，用于执行自动导入配置的全过程。

### 函数签名

```typescript
async function configureAutoImport(
  library: Library,
  projectPath: string = process.cwd()
): Promise<boolean>;
```

### 参数

- `library`: 要配置的组件库，类型为 `Library`（字符串字面量类型）
- `projectPath`: 项目路径，默认为当前工作目录

### 返回值

- `Promise<boolean>`: 配置是否成功的 Promise

### 示例

```typescript
import { configureAutoImport } from "ew-auto-import-tool";

async function setup() {
  try {
    const success = await configureAutoImport(
      "element-plus",
      "/path/to/project"
    );
    if (success) {
      console.log("配置成功！");
    } else {
      console.log("配置失败！");
    }
  } catch (error) {
    console.error("配置出错：", error);
  }
}

setup();
```

### 实现细节

`configureAutoImport` 函数执行以下步骤：

1. 调用 `checkProject` 检查项目结构
2. 调用 `installDependencies` 安装必要的依赖
3. 调用 `updateViteConfig` 更新 Vite 配置
4. 调用 `updateTsConfig` 更新 TypeScript 配置（如果项目使用 TypeScript）
5. 调用 `generateDeclarationFiles` 生成声明文件

## 类型定义

### Library

支持的组件库类型：

```typescript
type Library = "element-plus" | "ant-design-vue" | "naive-ui" | "vant";
```

### PackageManager

支持的包管理器类型：

```typescript
type PackageManager = "npm" | "yarn" | "pnpm";
```

### ProjectInfo

项目信息接口：

```typescript
interface ProjectInfo {
  isValid: boolean; // 项目是否有效
  isVue: boolean; // 是否为Vue项目
  isVite: boolean; // 是否使用Vite
  hasTypeScript: boolean; // 是否使用TypeScript
  packageManager: PackageManager; // 使用的包管理器
  viteConfigPath?: string; // Vite配置文件路径
  tsConfigPath?: string; // TypeScript配置文件路径
  errors?: string[]; // 错误信息
}
```

### LibraryConfig

组件库配置接口：

```typescript
interface LibraryConfig {
  dependencies: string[]; // 需要安装的依赖
  resolverImport: string; // 解析器导入语句
  resolverName: string; // 解析器名称
}
```

## 导出的模块

除了主函数 `configureAutoImport` 外，该工具还导出了以下模块，可以单独使用：

- `checkProject`: 项目检查器
- `installDependencies`: 依赖管理器
- `updateViteConfig`: Vite 配置管理器
- `updateTsConfig`: TypeScript 配置管理器
- `generateDeclarationFiles`: 声明文件生成器

这些模块的详细 API 请参考各自的文档页面：

- [项目检查器](./project-checker.md)
- [依赖管理器](./dependency-manager.md)
- [Vite 配置管理器](./vite-config-manager.md)
- [TypeScript 配置管理器](./ts-config-manager.md)
- [声明文件生成器](./declaration-generator.md)
