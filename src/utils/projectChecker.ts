/**
 * 项目检查器
 * 用于检测项目是否为Vue项目、是否使用Vite和TypeScript
 */

import fs from "fs-extra";
import path from "path";
import { ProjectInfo } from "../types";

/**
 * 检查项目结构
 * @param projectPath 项目路径
 */
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
