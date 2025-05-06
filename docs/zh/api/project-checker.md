# 项目检查器 (projectChecker)

项目检查器模块用于检测项目结构，确认是否为有效的 Vue + Vite + TypeScript 项目。

## API 参考

### checkProject

检查项目结构，返回项目信息。

#### 函数签名

```typescript
async function checkProject(projectPath: string): Promise<ProjectInfo>;
```

#### 参数

- `projectPath`: 项目路径，字符串类型

#### 返回值

- `Promise<ProjectInfo>`: 包含项目信息的 Promise

#### 示例

```typescript
import { checkProject } from "ew-auto-import-tool";

async function checkMyProject() {
  try {
    const projectInfo = await checkProject("/path/to/project");

    if (projectInfo.isValid) {
      console.log("项目有效！");
      console.log(`使用的包管理器: ${projectInfo.packageManager}`);
      console.log(`是否使用TypeScript: ${projectInfo.hasTypeScript}`);
    } else {
      console.log("项目无效！");
      console.log("错误信息:", projectInfo.errors);
    }
  } catch (error) {
    console.error("检查项目时出错：", error);
  }
}

checkMyProject();
```

## 实现细节

`checkProject` 函数执行以下检查：

1. 检查 package.json 是否存在
2. 检查是否安装了 Vue 依赖
3. 检查是否使用 Vite 作为构建工具
4. 检查是否存在 vite.config.ts 或 vite.config.js 文件
5. 检查是否使用 TypeScript（是否存在 tsconfig.json 文件）
6. 检测使用的包管理器（npm、yarn 或 pnpm）

### 返回的 ProjectInfo 对象

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

### 有效项目的条件

项目被认为是有效的，需要满足以下条件：

- 是 Vue 项目（package.json 中包含 Vue 依赖）
- 使用 Vite 作为构建工具（package.json 中包含 Vite 依赖）
- 存在 vite.config.ts 或 vite.config.js 文件

如果项目不满足这些条件，`isValid` 将被设置为 `false`，并且 `errors` 数组将包含相应的错误信息。

## 源码分析

```typescript
export async function checkProject(projectPath: string): Promise<ProjectInfo> {
  const result: ProjectInfo = {
    isValid: false,
    isVue: false,
    isVite: false,
    hasTypeScript: false,
    packageManager: "npm",
    errors: [],
  };

  try {
    // 检查package.json是否存在
    const packageJsonPath = path.join(projectPath, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      result.errors?.push(
        "未找到package.json文件，请确保在Vue项目根目录中运行此工具"
      );
      return result;
    }

    // 读取package.json
    const packageJson = await fs.readJSON(packageJsonPath);

    // 检查是否为Vue项目
    if (!packageJson.dependencies?.vue && !packageJson.devDependencies?.vue) {
      result.errors?.push("未检测到Vue依赖，请确保这是一个Vue项目");
    } else {
      result.isVue = true;
    }

    // 检查是否使用Vite
    if (!packageJson.devDependencies?.vite) {
      result.errors?.push("未检测到Vite依赖，此工具仅支持Vite项目");
    } else {
      result.isVite = true;

      // 查找vite.config文件
      const viteConfigPaths = [
        path.join(projectPath, "vite.config.ts"),
        path.join(projectPath, "vite.config.js"),
      ];

      for (const configPath of viteConfigPaths) {
        if (fs.existsSync(configPath)) {
          result.viteConfigPath = configPath;
          break;
        }
      }

      if (!result.viteConfigPath) {
        result.errors?.push("未找到vite.config.ts或vite.config.js文件");
      }
    }

    // 检查是否使用TypeScript
    const tsConfigPath = path.join(projectPath, "tsconfig.json");
    if (fs.existsSync(tsConfigPath)) {
      result.hasTypeScript = true;
      result.tsConfigPath = tsConfigPath;
    }

    // 检测包管理器
    if (fs.existsSync(path.join(projectPath, "yarn.lock"))) {
      result.packageManager = "yarn";
    } else if (fs.existsSync(path.join(projectPath, "pnpm-lock.yaml"))) {
      result.packageManager = "pnpm";
    } else {
      result.packageManager = "npm";
    }

    // 判断项目是否有效
    result.isValid = result.isVue && result.isVite && !!result.viteConfigPath;

    return result;
  } catch (error) {
    result.errors?.push(`检查项目结构时出错: ${error}`);
    return result;
  }
}
```
