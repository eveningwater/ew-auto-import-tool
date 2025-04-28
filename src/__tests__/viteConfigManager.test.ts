/**
 * Vite配置管理器单元测试
 */

import fs from "fs-extra";
import { updateViteConfig } from "../modules/viteConfigManager";
import { checkProject } from "../utils/projectChecker";
import { ProjectInfo } from "../types";

// 模拟fs-extra和projectChecker模块
jest.mock("fs-extra");
jest.mock("../utils/projectChecker");

describe("Vite配置管理器测试", () => {
  // 测试前重置所有模拟
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("应该正确更新Vite配置文件 - 添加到现有plugins数组", async () => {
    // 模拟项目检查结果
    const mockProjectInfo: ProjectInfo = {
      isValid: true,
      isVue: true,
      isVite: true,
      hasTypeScript: true,
      packageManager: "npm",
      viteConfigPath: "/test/project/vite.config.ts",
      tsConfigPath: "/test/project/tsconfig.json",
    };

    (checkProject as jest.Mock).mockResolvedValue(mockProjectInfo);

    // 模拟Vite配置文件内容
    const mockViteConfig = `
      import { defineConfig } from 'vite'
      import vue from '@vitejs/plugin-vue'
      
      export default defineConfig({
        plugins: [
          vue(),
        ],
        resolve: {
          alias: {
            '@': '/src'
          }
        }
      })
    `;

    // 模拟文件读取
    (fs.readFile as jest.Mock).mockResolvedValue(mockViteConfig);

    // 模拟文件写入
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

    // 执行更新
    await updateViteConfig("element-plus", "/test/project");

    // 验证文件写入调用
    expect(fs.writeFile).toHaveBeenCalled();

    // 获取写入的内容
    const writtenContent = (fs.writeFile as jest.Mock).mock.calls[0][1];

    // 验证写入内容包含必要的导入语句
    expect(writtenContent).toContain(
      'import AutoImport from "unplugin-auto-import/vite";'
    );
    expect(writtenContent).toContain(
      'import Components from "unplugin-vue-components/vite";'
    );
    expect(writtenContent).toContain(
      'import { ElementPlusResolver } from "unplugin-vue-components/resolvers";'
    );

    // 验证写入内容包含插件配置
    expect(writtenContent).toContain("AutoImport({");
    expect(writtenContent).toContain("resolvers: [ElementPlusResolver()],");
    expect(writtenContent).toContain("Components({");
  });

  test("应该跳过已配置的Vite文件", async () => {
    // 模拟项目检查结果
    const mockProjectInfo: ProjectInfo = {
      isValid: true,
      isVue: true,
      isVite: true,
      hasTypeScript: true,
      packageManager: "npm",
      viteConfigPath: "/test/project/vite.config.ts",
      tsConfigPath: "/test/project/tsconfig.json",
    };

    (checkProject as jest.Mock).mockResolvedValue(mockProjectInfo);

    // 模拟已配置的Vite配置文件内容
    const mockViteConfig = `
      import { defineConfig } from 'vite'
      import vue from '@vitejs/plugin-vue'
      import AutoImport from "unplugin-auto-import/vite";
      import Components from "unplugin-vue-components/vite";
      import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
      
      export default defineConfig({
        plugins: [
          vue(),
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ]
      })
    `;

    // 模拟文件读取
    (fs.readFile as jest.Mock).mockResolvedValue(mockViteConfig);

    // 创建控制台日志的spy
    const consoleSpy = jest.spyOn(console, "log");

    // 执行更新
    await updateViteConfig("element-plus", "/test/project");

    // 验证文件写入未被调用
    expect(fs.writeFile).not.toHaveBeenCalled();

    // 验证日志输出
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("已存在自动导入插件")
    );

    // 恢复控制台spy
    consoleSpy.mockRestore();
  });

  test("应该处理无效的项目结构", async () => {
    // 模拟无效的项目检查结果
    const mockProjectInfo: ProjectInfo = {
      isValid: false,
      isVue: true,
      isVite: false,
      hasTypeScript: true,
      packageManager: "npm",
      errors: ["未检测到Vite依赖，此工具仅支持Vite项目"],
    };

    (checkProject as jest.Mock).mockResolvedValue(mockProjectInfo);

    // 执行更新并期望抛出错误
    await expect(
      updateViteConfig("element-plus", "/test/project")
    ).rejects.toThrow("无效的项目结构或未找到Vite配置文件");

    // 验证文件写入未被调用
    expect(fs.writeFile).not.toHaveBeenCalled();
  });
});
