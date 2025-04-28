/**
 * 类型定义
 */
export type Library = "element-plus" | "ant-design-vue" | "naive-ui" | "vant";
export type PackageManager = "npm" | "yarn" | "pnpm";
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
export interface LibraryConfig {
    name: Library;
    dependencies: string[];
    resolverImport: string;
    resolverName: string;
}
export declare const LIBRARY_CONFIGS: Record<Library, LibraryConfig>;
