/**
 * TypeScript配置管理器
 * 用于更新tsconfig.json文件，添加声明文件到include配置
 */

import fs from "fs-extra";
import path from "path";

/**
 * 更新TypeScript配置
 * @param projectPath 项目路径
 */
export async function updateTsConfig(projectPath: string): Promise<void> {
  const tsConfigPath = path.join(projectPath, "tsconfig.json");

  // 检查tsconfig.json是否存在
  if (!fs.existsSync(tsConfigPath)) {
    console.log("未找到tsconfig.json文件，跳过TypeScript配置更新");
    return;
  }

  try {
    // 读取tsconfig.json
    const tsConfig = await fs.readJSON(tsConfigPath);

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
      await fs.writeJSON(tsConfigPath, tsConfig, { spaces: 2 });
      console.log(`已更新TypeScript配置文件: ${tsConfigPath}`);
    } else {
      console.log("TypeScript配置已包含所需声明文件，无需更新");
    }
  } catch (error) {
    throw new Error(`更新TypeScript配置失败: ${error}`);
  }
}
