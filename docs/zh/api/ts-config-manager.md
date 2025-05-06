# TypeScript 配置管理器

`tsConfigManager` 模块负责更新项目的 TypeScript 配置文件，添加自动导入组件和 API 的声明文件到 `include` 配置中，确保 TypeScript 能够正确识别这些类型。

## API 参考

### updateTsConfig

```typescript
async function updateTsConfig(projectPath: string): Promise<void>;
```

#### 参数

- `projectPath: string` - 项目根目录的路径

#### 返回值

- `Promise<void>` - 异步操作，成功时无返回值

#### 异常

- 当更新 TypeScript 配置失败时抛出错误

#### 使用示例

```typescript
import { updateTsConfig } from "ew-auto-import-tool";

// 更新 TypeScript 配置，添加声明文件引用
await updateTsConfig("/path/to/your/project");
```

## 实现细节

`updateTsConfig` 函数执行以下步骤：

1. **检查配置文件存在性**：验证项目中是否存在 `tsconfig.json` 文件，如果不存在则跳过配置

2. **读取现有配置**：读取 `tsconfig.json` 文件的内容

3. **检查 include 配置**：如果配置中不存在 `include` 字段，则创建一个空数组

4. **添加声明文件引用**：将 `components.d.ts` 和 `auto-imports.d.ts` 添加到 `include` 数组中（如果尚未包含）

5. **写入更新后的配置**：如果有更改，则将更新后的配置写回 `tsconfig.json` 文件

## 声明文件说明

模块添加的两个声明文件具有以下作用：

- **components.d.ts** - 包含组件库中所有组件的类型声明，使 TypeScript 能够识别模板中使用的组件
- **auto-imports.d.ts** - 包含组件库中所有自动导入 API 的类型声明，使 TypeScript 能够识别全局可用的 API

这些文件通常由 `unplugin-auto-import` 和 `unplugin-vue-components` 插件在项目首次启动时自动生成和更新。

## 配置示例

更新前的 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

更新后的 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "components.d.ts",
    "auto-imports.d.ts"
  ]
}
```

## 源码分析

`tsConfigManager` 模块使用 `fs-extra` 库来读取和写入 JSON 文件，这简化了配置文件的处理过程：

```typescript
// 读取tsconfig.json
const tsConfig = await fs.readJSON(tsConfigPath);

// 检查include配置是否存在
if (!tsConfig.include) {
  tsConfig.include = [];
}

// 添加声明文件到include配置
const declarationFiles = ["components.d.ts", "auto-imports.d.ts"];
let updated = false;

for (const file of declarationFiles) {
  if (!tsConfig.include.includes(file)) {
    tsConfig.include.push(file);
    updated = true;
  }
}

// 如果有更新，则写入文件
if (updated) {
  await fs.writeJSON(tsConfigPath, tsConfig, { spaces: 2 });
  console.log(`已更新TypeScript配置文件: ${tsConfigPath}`);
}
```

## 注意事项

- 该函数会自动检测并跳过已经包含所需声明文件的配置
- 如果项目中不存在 `tsconfig.json` 文件，函数会跳过配置而不会报错
- 该函数仅修改 `include` 字段，不会更改其他 TypeScript 配置
