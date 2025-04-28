/**
 * 项目检查器
 * 用于检测项目是否为Vue项目、是否使用Vite和TypeScript
 */
import { ProjectInfo } from "../types";
/**
 * 检查项目结构
 * @param projectPath 项目路径
 */
export declare function checkProject(projectPath: string): Promise<ProjectInfo>;
