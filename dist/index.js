"use strict";
/**
 * 自动化按需导入工具
 * 用于自动配置Vue项目中组件库的按需导入
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeclarationFiles = exports.updateTsConfig = exports.updateViteConfig = exports.installDependencies = exports.checkProject = exports.configureAutoImport = void 0;
const projectChecker_1 = require("./utils/projectChecker");
const dependencyManager_1 = require("./modules/dependencyManager");
const viteConfigManager_1 = require("./modules/viteConfigManager");
const tsConfigManager_1 = require("./modules/tsConfigManager");
const declarationGenerator_1 = require("./modules/declarationGenerator");
/**
 * 主函数：执行自动导入配置
 * @param library 要配置的组件库
 * @param projectPath 项目路径
 */
async function configureAutoImport(library, projectPath = process.cwd()) {
    try {
        // 1. 检查项目结构
        const projectInfo = await (0, projectChecker_1.checkProject)(projectPath);
        if (!projectInfo.isValid) {
            return false;
        }
        // 2. 安装依赖
        await (0, dependencyManager_1.installDependencies)(library, projectPath, projectInfo.packageManager);
        // 3. 更新Vite配置
        await (0, viteConfigManager_1.updateViteConfig)(library, projectPath);
        // 4. 更新TypeScript配置
        if (projectInfo.hasTypeScript) {
            await (0, tsConfigManager_1.updateTsConfig)(projectPath);
        }
        // 5. 生成声明文件
        await (0, declarationGenerator_1.generateDeclarationFiles)(projectPath);
        return true;
    }
    catch (error) {
        console.error("配置自动导入失败:", error);
        return false;
    }
}
exports.configureAutoImport = configureAutoImport;
// 导出类型和模块
__exportStar(require("./types"), exports);
var projectChecker_2 = require("./utils/projectChecker");
Object.defineProperty(exports, "checkProject", { enumerable: true, get: function () { return projectChecker_2.checkProject; } });
var dependencyManager_2 = require("./modules/dependencyManager");
Object.defineProperty(exports, "installDependencies", { enumerable: true, get: function () { return dependencyManager_2.installDependencies; } });
var viteConfigManager_2 = require("./modules/viteConfigManager");
Object.defineProperty(exports, "updateViteConfig", { enumerable: true, get: function () { return viteConfigManager_2.updateViteConfig; } });
var tsConfigManager_2 = require("./modules/tsConfigManager");
Object.defineProperty(exports, "updateTsConfig", { enumerable: true, get: function () { return tsConfigManager_2.updateTsConfig; } });
var declarationGenerator_2 = require("./modules/declarationGenerator");
Object.defineProperty(exports, "generateDeclarationFiles", { enumerable: true, get: function () { return declarationGenerator_2.generateDeclarationFiles; } });
