/**
 * Vite配置管理器
 * 用于修改Vite配置文件，添加自动导入插件
 */
import { Library } from "../types";
/**
 * 更新Vite配置
 * @param library 组件库
 * @param projectPath 项目路径
 */
export declare function updateViteConfig(library: Library, projectPath: string): Promise<void>;
