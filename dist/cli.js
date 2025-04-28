#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const index_1 = require("./index");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// 获取包信息
const packageJson = require("../package.json");
// 创建命令行程序
const program = new commander_1.Command();
program
    .name("ew-auto-import-tool")
    .description("自动化完成Vue项目中按需导入组件库的配置工具")
    .version(packageJson.version)
    .option("-l, --library <library>", "指定要配置的组件库 (element-plus, ant-design-vue, etc.)")
    .option("-p, --path <path>", "指定项目路径，默认为当前目录", process.cwd())
    .parse(process.argv);
const options = program.opts();
/**
 * 主函数
 */
async function main() {
    console.log(chalk_1.default.cyan("\n===== Vue 组件库按需导入配置工具 =====\n"));
    let library;
    const projectPath = path_1.default.resolve(options.path || process.cwd());
    // 检查项目路径是否存在
    if (!fs_extra_1.default.existsSync(projectPath)) {
        console.error(chalk_1.default.red(`错误: 项目路径 ${projectPath} 不存在`));
        process.exit(1);
    }
    // 如果没有通过命令行指定组件库，则通过交互方式选择
    if (!options.library) {
        const answer = await inquirer_1.default.prompt([
            {
                type: "list",
                name: "library",
                message: "请选择要配置的组件库:",
                choices: [
                    { name: "Element Plus", value: "element-plus" },
                    { name: "Ant Design Vue", value: "ant-design-vue" },
                    { name: "Naive UI", value: "naive-ui" },
                    { name: "Vant", value: "vant" },
                ],
            },
        ]);
        library = answer.library;
    }
    else {
        library = options.library;
    }
    // 显示配置信息
    console.log(chalk_1.default.blue("\n配置信息:"));
    console.log(`- 组件库: ${chalk_1.default.green(library)}`);
    console.log(`- 项目路径: ${chalk_1.default.green(projectPath)}\n`);
    // 确认是否继续
    const { confirm } = await inquirer_1.default.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "确认开始配置?",
            default: true,
        },
    ]);
    if (!confirm) {
        console.log(chalk_1.default.yellow("\n已取消配置\n"));
        return;
    }
    // 开始配置
    const spinner = (0, ora_1.default)("正在配置自动导入...").start();
    try {
        const success = await (0, index_1.configureAutoImport)(library, projectPath);
        if (success) {
            spinner.succeed("配置完成!");
            console.log(chalk_1.default.green("\n✨ 组件库按需导入已成功配置!\n"));
            console.log("下一步:");
            console.log("1. 重启开发服务器");
            console.log("2. 在组件中直接使用组件，无需手动导入\n");
        }
        else {
            spinner.fail("配置失败");
            console.log(chalk_1.default.red("\n配置过程中出现错误，请查看上方日志获取详细信息\n"));
        }
    }
    catch (error) {
        spinner.fail("配置失败");
        console.error(chalk_1.default.red(`\n错误: ${error}\n`));
    }
}
// 执行主函数
main().catch((error) => {
    console.error(chalk_1.default.red(`\n错误: ${error}\n`));
    process.exit(1);
});
