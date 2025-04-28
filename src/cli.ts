#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { configureAutoImport } from "./index";
import { Library } from "./types";
import path from "path";
import fs from "fs-extra";

// 获取包信息
const packageJson = require("../package.json");

// 创建命令行程序
const program = new Command();

program
  .name("ew-auto-import-tool")
  .description("自动化完成Vue项目中按需导入组件库的配置工具")
  .version(packageJson.version)
  .option(
    "-l, --library <library>",
    "指定要配置的组件库 (element-plus, ant-design-vue, etc.)"
  )
  .option("-p, --path <path>", "指定项目路径，默认为当前目录", process.cwd())
  .parse(process.argv);

const options = program.opts();

/**
 * 主函数
 */
async function main() {
  console.log(chalk.cyan("\n===== Vue 组件库按需导入配置工具 =====\n"));

  let library: Library;
  const projectPath = path.resolve(options.path || process.cwd());

  // 检查项目路径是否存在
  if (!fs.existsSync(projectPath)) {
    console.error(chalk.red(`错误: 项目路径 ${projectPath} 不存在`));
    process.exit(1);
  }

  // 如果没有通过命令行指定组件库，则通过交互方式选择
  if (!options.library) {
    const answer = await inquirer.prompt([
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
    library = answer.library as Library;
  } else {
    library = options.library as Library;
  }

  // 显示配置信息
  console.log(chalk.blue("\n配置信息:"));
  console.log(`- 组件库: ${chalk.green(library)}`);
  console.log(`- 项目路径: ${chalk.green(projectPath)}\n`);

  // 确认是否继续
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "确认开始配置?",
      default: true,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow("\n已取消配置\n"));
    return;
  }

  // 开始配置
  const spinner = ora("正在配置自动导入...").start();

  try {
    const success = await configureAutoImport(library, projectPath);

    if (success) {
      spinner.succeed("配置完成!");
      console.log(chalk.green("\n✨ 组件库按需导入已成功配置!\n"));
      console.log("下一步:");
      console.log("1. 重启开发服务器");
      console.log("2. 在组件中直接使用组件，无需手动导入\n");
    } else {
      spinner.fail("配置失败");
      console.log(
        chalk.red("\n配置过程中出现错误，请查看上方日志获取详细信息\n")
      );
    }
  } catch (error) {
    spinner.fail("配置失败");
    console.error(chalk.red(`\n错误: ${error}\n`));
  }
}

// 执行主函数
main().catch((error) => {
  console.error(chalk.red(`\n错误: ${error}\n`));
  process.exit(1);
});
