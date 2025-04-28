/**
 * 自动化按需导入工具
 * 用于自动配置Vue项目中组件库的按需导入
 */
import { Library } from "./types";
/**
 * 主函数：执行自动导入配置
 * @param library 要配置的组件库
 * @param projectPath 项目路径
 */
export declare function configureAutoImport(library: Library, projectPath?: string): Promise<boolean>;
export * from "./types";
export { checkProject } from "./utils/projectChecker";
export { installDependencies } from "./modules/dependencyManager";
export { updateViteConfig } from "./modules/viteConfigManager";
export { updateTsConfig } from "./modules/tsConfigManager";
export { generateDeclarationFiles } from "./modules/declarationGenerator";
