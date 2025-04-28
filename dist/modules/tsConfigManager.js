"use strict";
/**
 * TypeScript配置管理器
 * 用于更新tsconfig.json文件，添加声明文件到include配置
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTsConfig = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * 更新TypeScript配置
 * @param projectPath 项目路径
 */
async function updateTsConfig(projectPath) {
    const tsConfigPath = path_1.default.join(projectPath, "tsconfig.json");
    // 检查tsconfig.json是否存在
    if (!fs_extra_1.default.existsSync(tsConfigPath)) {
        console.log("未找到tsconfig.json文件，跳过TypeScript配置更新");
        return;
    }
    try {
        // 读取tsconfig.json
        const tsConfig = await fs_extra_1.default.readJSON(tsConfigPath);
        // 检查include配置是否存在
        if (!tsConfig.include) {
            tsConfig.include = [];
        }
        // 添加声明文件到include配置
        const declarationFiles = ["components.d.ts", "auto-imports.d.ts"];
        let updated = false;
        for (const file of declarationFiles) {
            if (!tsConfig.include.includes(file)) {
                tsConfig.include.push(file);
                updated = true;
            }
        }
        // 如果有更新，则写入文件
        if (updated) {
            await fs_extra_1.default.writeJSON(tsConfigPath, tsConfig, { spaces: 2 });
            console.log(`已更新TypeScript配置文件: ${tsConfigPath}`);
        }
        else {
            console.log("TypeScript配置已包含所需声明文件，无需更新");
        }
    }
    catch (error) {
        throw new Error(`更新TypeScript配置失败: ${error}`);
    }
}
exports.updateTsConfig = updateTsConfig;
