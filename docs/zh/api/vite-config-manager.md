# Vite 配置管理器

`viteConfigManager` 模块负责更新项目的 Vite 配置文件，添加自动导入插件的相关配置。这是实现组件库自动导入功能的核心步骤之一。

## API 参考

### updateViteConfig

```typescript
async function updateViteConfig(
  library: Library,
  projectPath: string
): Promise<void>;
```

#### 参数

- `library: Library` - 要配置的组件库，如 'element-plus'、'ant-design-vue' 等
- `projectPath: string` - 项目根目录的路径

#### 返回值

- `Promise<void>` - 异步操作，成功时无返回值

#### 异常

- 当项目结构无效或找不到 Vite 配置文件时抛出错误
- 当无法在 Vite 配置中找到 plugins 数组或 defineConfig 函数时抛出错误

#### 使用示例

```typescript
import { updateViteConfig } from "ew-auto-import-tool";

// 为 Element Plus 配置自动导入
await updateViteConfig("element-plus", "/path/to/your/project");
```

## 实现细节

`updateViteConfig` 函数执行以下步骤：

1. **获取组件库配置**：根据指定的组件库名称获取相应的配置信息

2. **检查项目结构**：验证项目是否为有效的 Vue + Vite 项目，并找到 Vite 配置文件路径

3. **检查现有配置**：如果 Vite 配置中已经包含自动导入插件，则跳过配置

4. **添加导入语句**：在文件中添加必要的导入语句

   ```typescript
   import AutoImport from "unplugin-auto-import/vite";
   import Components from "unplugin-vue-components/vite";
   import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
   ```

5. **添加插件配置**：在 plugins 数组中添加自动导入插件的配置

   ```typescript
   AutoImport({
     resolvers: [ElementPlusResolver()],
   }),
   Components({
     resolvers: [ElementPlusResolver()],
   }),
   ```

6. **写入更新后的配置**：将修改后的内容写回 Vite 配置文件

## 源码分析

`viteConfigManager` 模块使用正则表达式来定位和修改 Vite 配置文件中的关键部分：

- 使用 `importRegex` 查找最后一个导入语句，在其后添加新的导入语句
- 使用 `pluginsRegex` 查找 plugins 数组，在其中添加自动导入插件配置
- 如果找不到 plugins 数组，则使用 `defineConfigRegex` 查找 defineConfig 函数，创建新的 plugins 数组

这种方法允许工具在不破坏现有配置的情况下，精确地添加所需的配置项。

## 注意事项

- 该函数会自动检测并跳过已经配置了自动导入插件的项目
- 目前支持的组件库包括 Element Plus、Ant Design Vue、Naive UI 和 Vant
- 该函数仅修改 Vite 配置文件，不会安装所需的依赖包（这由 `dependencyManager` 模块负责）
