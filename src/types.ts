/**
 * 类型定义
 */

// 支持的组件库类型
export type Library = "element-plus" | "ant-design-vue" | "naive-ui" | "vant";

// 包管理器类型
export type PackageManager = "npm" | "yarn" | "pnpm";

// 项目信息
export interface ProjectInfo {
  isValid: boolean;
  isVue: boolean;
  isVite: boolean;
  hasTypeScript: boolean;
  packageManager: PackageManager;
  viteConfigPath?: string;
  tsConfigPath?: string;
  errors?: string[];
}

// 组件库配置
export interface LibraryConfig {
  name: Library;
  dependencies: string[];
  resolverImport: string;
  resolverName: string;
}

// 组件库配置映射
export const LIBRARY_CONFIGS: Record<Library, LibraryConfig> = {
  "element-plus": {
    name: "element-plus",
    dependencies: [
      "element-plus",
      "unplugin-auto-import",
      "unplugin-vue-components",
    ],
    resolverImport:
      'import { ElementPlusResolver } from "unplugin-vue-components/resolvers";',
    resolverName: "ElementPlusResolver",
  },
  "ant-design-vue": {
    name: "ant-design-vue",
    dependencies: [
      "ant-design-vue",
      "unplugin-auto-import",
      "unplugin-vue-components",
    ],
    resolverImport:
      'import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";',
    resolverName: "AntDesignVueResolver",
  },
  "naive-ui": {
    name: "naive-ui",
    dependencies: [
      "naive-ui",
      "unplugin-auto-import",
      "unplugin-vue-components",
    ],
    resolverImport:
      'import { NaiveUiResolver } from "unplugin-vue-components/resolvers";',
    resolverName: "NaiveUiResolver",
  },
  vant: {
    name: "vant",
    dependencies: ["vant", "unplugin-auto-import", "unplugin-vue-components"],
    resolverImport:
      'import { VantResolver } from "unplugin-vue-components/resolvers";',
    resolverName: "VantResolver",
  },
};
