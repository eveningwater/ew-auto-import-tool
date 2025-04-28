/**
 * 自动化按需导入工具
 * 用于自动配置Vue项目中组件库的按需导入
 */

import { checkProject } from "./utils/projectChecker";
import { installDependencies } from "./modules/dependencyManager";
import { updateViteConfig } from "./modules/viteConfigManager";
import { updateTsConfig } from "./modules/tsConfigManager";
import { generateDeclarationFiles } from "./modules/declarationGenerator";
import { Library } from "./types";

/**
 * 主函数：执行自动导入配置
 * @param library 要配置的组件库
 * @param projectPath 项目路径
 */
export async function configureAutoImport(
  library: Library,
  projectPath: string = process.cwd()
): Promise<boolean> {
  try {
    // 1. 检查项目结构
    const projectInfo = await checkProject(projectPath);
    if (!projectInfo.isValid) {
      return false;
    }

    // 2. 安装依赖
    await installDependencies(library, projectPath, projectInfo.packageManager);

    // 3. 更新Vite配置
    await updateViteConfig(library, projectPath);

    // 4. 更新TypeScript配置
    if (projectInfo.hasTypeScript) {
      await updateTsConfig(projectPath);
    }

    // 5. 生成声明文件
    await generateDeclarationFiles(projectPath);

    return true;
  } catch (error) {
    console.error("配置自动导入失败:", error);
    return false;
  }
}

// 导出类型和模块
export * from "./types";
export { checkProject } from "./utils/projectChecker";
export { installDependencies } from "./modules/dependencyManager";
export { updateViteConfig } from "./modules/viteConfigManager";
export { updateTsConfig } from "./modules/tsConfigManager";
export { generateDeclarationFiles } from "./modules/declarationGenerator";
