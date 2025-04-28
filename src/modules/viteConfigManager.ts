/**
 * Vite配置管理器
 * 用于修改Vite配置文件，添加自动导入插件
 */

import fs from "fs-extra";
import { Library, LIBRARY_CONFIGS } from "../types";
import { checkProject } from "../utils/projectChecker";

/**
 * 更新Vite配置
 * @param library 组件库
 * @param projectPath 项目路径
 */
export async function updateViteConfig(
  library: Library,
  projectPath: string
): Promise<void> {
  // 获取组件库配置
  const libraryConfig = LIBRARY_CONFIGS[library];
  if (!libraryConfig) {
    throw new Error(`不支持的组件库: ${library}`);
  }

  // 检查项目结构
  const projectInfo = await checkProject(projectPath);
  if (!projectInfo.isValid || !projectInfo.viteConfigPath) {
    throw new Error("无效的项目结构或未找到Vite配置文件");
  }

  // 读取Vite配置文件
  const viteConfigPath = projectInfo.viteConfigPath;
  let content = await fs.readFile(viteConfigPath, "utf-8");

  // 检查是否已经配置了自动导入
  if (
    content.includes("unplugin-auto-import/vite") &&
    content.includes("unplugin-vue-components/vite")
  ) {
    console.log("Vite配置中已存在自动导入插件，跳过配置");
    return;
  }

  // 添加导入语句
  const imports = [
    'import AutoImport from "unplugin-auto-import/vite";',
    'import Components from "unplugin-vue-components/vite";',
    libraryConfig.resolverImport,
  ];

  // 查找导入语句的位置
  const importRegex = /import\s+.+\s+from\s+['"].*['"];?/g;
  const lastImportMatch = [...content.matchAll(importRegex)].pop();

  if (lastImportMatch) {
    const lastImportEnd = lastImportMatch.index! + lastImportMatch[0].length;
    content =
      content.slice(0, lastImportEnd) +
      "\n" +
      imports.join("\n") +
      content.slice(lastImportEnd);
  } else {
    // 如果没有找到导入语句，则添加到文件开头
    content = imports.join("\n") + "\n" + content;
  }

  // 添加插件配置
  const pluginsConfig = `
  AutoImport({
    resolvers: [${libraryConfig.resolverName}()],
  }),
  Components({
    resolvers: [${libraryConfig.resolverName}()],
  }),`;

  // 查找plugins数组
  const pluginsRegex = /plugins\s*:\s*\[([^\]]*)\]/s;
  const pluginsMatch = content.match(pluginsRegex);

  if (pluginsMatch) {
    const pluginsContent = pluginsMatch[1];
    const updatedPluginsContent = `${pluginsContent}${
      !pluginsContent.includes(",") ? "," : ""
    }${pluginsConfig}`;
    content = content.replace(
      pluginsRegex,
      `plugins: [${updatedPluginsContent}]`
    );
  } else {
    // 如果没有找到plugins数组，则尝试找到defineConfig函数
    const defineConfigRegex = /defineConfig\s*\(\s*\{([^}]*)\}\s*\)/s;
    const defineConfigMatch = content.match(defineConfigRegex);

    if (defineConfigMatch) {
      const configContent = defineConfigMatch[1];
      const updatedConfigContent =
        configContent + `\n  plugins: [${pluginsConfig}],`;
      content = content.replace(
        defineConfigRegex,
        `defineConfig({${updatedConfigContent}})`
      );
    } else {
      throw new Error("无法在Vite配置文件中找到plugins数组或defineConfig函数");
    }
  }

  // 写入更新后的配置文件
  await fs.writeFile(viteConfigPath, content, "utf-8");
  console.log(`已更新Vite配置文件: ${viteConfigPath}`);
}
