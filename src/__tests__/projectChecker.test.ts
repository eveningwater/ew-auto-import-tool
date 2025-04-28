/**
 * 项目检查器单元测试
 */

import fs from "fs-extra";
import path from "path";
import { checkProject } from "../utils/projectChecker";
import { ProjectInfo } from "../types";

// 模拟fs-extra模块
jest.mock("fs-extra");

describe("项目检查器测试", () => {
  // 测试前重置所有模拟
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("应该检测有效的Vue+Vite+TypeScript项目", async () => {
    // 模拟文件存在
    (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
      if (
        filePath.endsWith("package.json") ||
        filePath.endsWith("vite.config.ts") ||
        filePath.endsWith("tsconfig.json")
      ) {
        return true;
      }
      return false;
    });

    // 模拟package.json内容
    (fs.readJSON as jest.Mock).mockResolvedValue({
      dependencies: {
        vue: "^3.2.0",
      },
      devDependencies: {
        vite: "^2.9.0",
        typescript: "^4.5.0",
      },
    });

    const projectPath = "/test/project";
    const result = await checkProject(projectPath);

    expect(result.isValid).toBe(true);
    expect(result.isVue).toBe(true);
    expect(result.isVite).toBe(true);
    expect(result.hasTypeScript).toBe(true);
    expect(result.viteConfigPath).toBe(
      path.join(projectPath, "vite.config.ts")
    );
    expect(result.tsConfigPath).toBe(path.join(projectPath, "tsconfig.json"));
    expect(result.packageManager).toBe("npm");
  });

  test("应该检测到非Vue项目", async () => {
    // 模拟文件存在
    (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
      return filePath.endsWith("package.json");
    });

    // 模拟package.json内容 - 没有Vue依赖
    (fs.readJSON as jest.Mock).mockResolvedValue({
      dependencies: {
        react: "^17.0.0",
      },
      devDependencies: {
        vite: "^2.9.0",
      },
    });

    const result = await checkProject("/test/project");

    expect(result.isValid).toBe(false);
    expect(result.isVue).toBe(false);
    expect(result.errors).toContain("未检测到Vue依赖，请确保这是一个Vue项目");
  });

  test("应该检测到非Vite项目", async () => {
    // 模拟文件存在
    (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
      return filePath.endsWith("package.json");
    });

    // 模拟package.json内容 - 没有Vite依赖
    (fs.readJSON as jest.Mock).mockResolvedValue({
      dependencies: {
        vue: "^3.2.0",
      },
      devDependencies: {
        webpack: "^5.0.0",
      },
    });

    const result = await checkProject("/test/project");

    expect(result.isValid).toBe(false);
    expect(result.isVite).toBe(false);
    expect(result.errors).toContain("未检测到Vite依赖，此工具仅支持Vite项目");
  });

  test("应该检测包管理器类型", async () => {
    // 模拟文件存在
    (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
      if (
        filePath.endsWith("package.json") ||
        filePath.endsWith("vite.config.ts") ||
        filePath.endsWith("yarn.lock")
      ) {
        return true;
      }
      return false;
    });

    // 模拟package.json内容
    (fs.readJSON as jest.Mock).mockResolvedValue({
      dependencies: {
        vue: "^3.2.0",
      },
      devDependencies: {
        vite: "^2.9.0",
      },
    });

    const result = await checkProject("/test/project");

    expect(result.packageManager).toBe("yarn");
  });
});
