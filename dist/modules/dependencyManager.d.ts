/**
 * 依赖管理器
 * 用于安装必要的依赖包
 */
import { Library, PackageManager } from "../types";
/**
 * 安装依赖
 * @param library 组件库
 * @param projectPath 项目路径
 * @param packageManager 包管理器
 */
export declare function installDependencies(library: Library, projectPath: string, packageManager?: PackageManager): Promise<void>;
