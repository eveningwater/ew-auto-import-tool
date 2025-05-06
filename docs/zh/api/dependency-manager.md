# 依赖管理器 (dependencyManager)

依赖管理器模块负责安装自动导入所需的依赖包，包括 unplugin-auto-import、unplugin-vue-components 和选择的组件库。

## API 参考

### installDependencies

安装必要的依赖包。

#### 函数签名

```typescript
async function installDependencies(
  library: Library,
  projectPath: string,
  packageManager: PackageManager = "npm"
): Promise<void>;
```

#### 参数

- `library`: 要配置的组件库，类型为 `Library`
- `projectPath`: 项目路径，字符串类型
- `packageManager`: 包管理器，类型为 `PackageManager`，默认为 "npm"

#### 返回值

- `Promise<void>`: 安装完成的 Promise

#### 示例

```typescript
import { installDependencies } from "ew-auto-import-tool";

async function installDeps() {
  try {
    await installDependencies("element-plus", "/path/to/project", "yarn");
    console.log("依赖安装成功！");
  } catch (error) {
    console.error("依赖安装失败：", error);
  }
}

installDeps();
```

## 实现细节

`installDependencies` 函数根据选择的组件库和包管理器，安装必要的依赖包。

### 安装的依赖

对于每个支持的组件库，会安装以下依赖：

- unplugin-auto-import - 用于自动导入 API
- unplugin-vue-components - 用于自动导入组件
- 选择的组件库（如 element-plus、ant-design-vue 等）

### 支持的包管理器

- npm - 使用 `npm install` 命令
- yarn - 使用 `yarn add` 命令
- pnpm - 使用 `pnpm add` 命令

### 组件库配置

每个组件库的配置定义在 `LIBRARY_CONFIGS` 对象中，包含以下信息：

```typescript
interface LibraryConfig {
  dependencies: string[]; // 需要安装的依赖
  resolverImport: string; // 解析器导入语句
  resolverName: string; // 解析器名称
}
```

例如，Element Plus 的配置如下：

```typescript
{
  dependencies: [
    "element-plus",
    "unplugin-auto-import",
    "unplugin-vue-components"
  ],
  resolverImport: 'import { ElementPlusResolver } from "unplugin-vue-components/resolvers";',
  resolverName: "ElementPlusResolver"
}
```

## 源码分析

```typescript
export async function installDependencies(
  library: Library,
  projectPath: string,
  packageManager: PackageManager = "npm"
): Promise<void> {
  const libraryConfig = LIBRARY_CONFIGS[library];

  if (!libraryConfig) {
    throw new Error(`不支持的组件库: ${library}`);
  }

  const dependencies = libraryConfig.dependencies;

  // 构建安装命令
  const installCmd = packageManager === "npm" ? "install" : "add";
  const args = [installCmd, ...dependencies, "--save"];

  // 执行安装命令
  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, args, {
      cwd: projectPath,
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`依赖安装失败，退出码: ${code}`));
      } else {
        resolve();
      }
    });

    child.on("error", (err) => {
      reject(new Error(`依赖安装失败: ${err.message}`));
    });
  });
}
```

该函数使用 Node.js 的 `child_process.spawn` 方法执行包管理器命令，安装必要的依赖包。根据检测到的包管理器类型，使用不同的安装命令。
