"use strict";
/**
 * 项目检查器
 * 用于检测项目是否为Vue项目、是否使用Vite和TypeScript
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProject = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * 检查项目结构
 * @param projectPath 项目路径
 */
async function checkProject(projectPath) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const result = {
        isValid: false,
        isVue: false,
        isVite: false,
        hasTypeScript: false,
        packageManager: "npm",
        errors: [],
    };
    try {
        // 检查package.json是否存在
        const packageJsonPath = path_1.default.join(projectPath, "package.json");
        if (!fs_extra_1.default.existsSync(packageJsonPath)) {
            (_a = result.errors) === null || _a === void 0 ? void 0 : _a.push("未找到package.json文件，请确保在Vue项目根目录中运行此工具");
            return result;
        }
        // 读取package.json
        const packageJson = await fs_extra_1.default.readJSON(packageJsonPath);
        // 检查是否为Vue项目
        if (!((_b = packageJson.dependencies) === null || _b === void 0 ? void 0 : _b.vue) && !((_c = packageJson.devDependencies) === null || _c === void 0 ? void 0 : _c.vue)) {
            (_d = result.errors) === null || _d === void 0 ? void 0 : _d.push("未检测到Vue依赖，请确保这是一个Vue项目");
        }
        else {
            result.isVue = true;
        }
        // 检查是否使用Vite
        if (!((_e = packageJson.devDependencies) === null || _e === void 0 ? void 0 : _e.vite)) {
            (_f = result.errors) === null || _f === void 0 ? void 0 : _f.push("未检测到Vite依赖，此工具仅支持Vite项目");
        }
        else {
            result.isVite = true;
            // 查找vite.config文件
            const viteConfigPaths = [
                path_1.default.join(projectPath, "vite.config.ts"),
                path_1.default.join(projectPath, "vite.config.js"),
            ];
            for (const configPath of viteConfigPaths) {
                if (fs_extra_1.default.existsSync(configPath)) {
                    result.viteConfigPath = configPath;
                    break;
                }
            }
            if (!result.viteConfigPath) {
                (_g = result.errors) === null || _g === void 0 ? void 0 : _g.push("未找到vite.config.ts或vite.config.js文件");
            }
        }
        // 检查是否使用TypeScript
        const tsConfigPath = path_1.default.join(projectPath, "tsconfig.json");
        if (fs_extra_1.default.existsSync(tsConfigPath)) {
            result.hasTypeScript = true;
            result.tsConfigPath = tsConfigPath;
        }
        // 检测包管理器
        if (fs_extra_1.default.existsSync(path_1.default.join(projectPath, "yarn.lock"))) {
            result.packageManager = "yarn";
        }
        else if (fs_extra_1.default.existsSync(path_1.default.join(projectPath, "pnpm-lock.yaml"))) {
            result.packageManager = "pnpm";
        }
        else {
            result.packageManager = "npm";
        }
        // 判断项目是否有效
        result.isValid = result.isVue && result.isVite && !!result.viteConfigPath;
        return result;
    }
    catch (error) {
        (_h = result.errors) === null || _h === void 0 ? void 0 : _h.push(`检查项目结构时出错: ${error}`);
        return result;
    }
}
exports.checkProject = checkProject;
