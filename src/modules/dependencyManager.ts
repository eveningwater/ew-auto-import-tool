/**
 * 依赖管理器
 * 用于安装必要的依赖包
 */

import { spawn } from "child_process";
import { Library, PackageManager, LIBRARY_CONFIGS } from "../types";

/**
 * 安装依赖
 * @param library 组件库
 * @param projectPath 项目路径
 * @param packageManager 包管理器
 */
export async function installDependencies(
  library: Library,
  projectPath: string,
  packageManager: PackageManager = "npm"
): Promise<void> {
  const libraryConfig = LIBRARY_CONFIGS[library];

  if (!libraryConfig) {
    throw new Error(`不支持的组件库: ${library}`);
  }

  const dependencies = libraryConfig.dependencies;

  // 构建安装命令
  const installCmd = packageManager === "npm" ? "install" : "add";
  const args = [installCmd, ...dependencies, "--save"];

  // 执行安装命令
  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, args, {
      cwd: projectPath,
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`依赖安装失败，退出码: ${code}`));
      } else {
        resolve();
      }
    });

    child.on("error", (err) => {
      reject(new Error(`依赖安装失败: ${err.message}`));
    });
  });
}
