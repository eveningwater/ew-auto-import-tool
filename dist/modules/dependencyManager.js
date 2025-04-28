"use strict";
/**
 * 依赖管理器
 * 用于安装必要的依赖包
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = void 0;
const child_process_1 = require("child_process");
const types_1 = require("../types");
/**
 * 安装依赖
 * @param library 组件库
 * @param projectPath 项目路径
 * @param packageManager 包管理器
 */
async function installDependencies(library, projectPath, packageManager = "npm") {
    const libraryConfig = types_1.LIBRARY_CONFIGS[library];
    if (!libraryConfig) {
        throw new Error(`不支持的组件库: ${library}`);
    }
    const dependencies = libraryConfig.dependencies;
    // 构建安装命令
    const installCmd = packageManager === "npm" ? "install" : "add";
    const args = [installCmd, ...dependencies, "--save"];
    // 执行安装命令
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.spawn)(packageManager, args, {
            cwd: projectPath,
            stdio: "inherit",
            shell: true,
        });
        child.on("close", (code) => {
            if (code !== 0) {
                reject(new Error(`依赖安装失败，退出码: ${code}`));
            }
            else {
                resolve();
            }
        });
        child.on("error", (err) => {
            reject(new Error(`依赖安装失败: ${err.message}`));
        });
    });
}
exports.installDependencies = installDependencies;
