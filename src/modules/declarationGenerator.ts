/**
 * 声明文件生成器
 * 用于生成组件和自动导入的声明文件
 */

import fs from "fs-extra";
import path from "path";

/**
 * 生成声明文件
 * @param projectPath 项目路径
 */
export async function generateDeclarationFiles(
  projectPath: string
): Promise<void> {
  const declarationFiles = [
    {
      name: "components.d.ts",
      content: `// 自动生成的组件声明文件
// 由ew-auto-import-tool生成，请勿手动修改

declare module 'vue' {
  export interface GlobalComponents {
    // 将在项目构建时自动填充
  }
}

export {}
`,
    },
    {
      name: "auto-imports.d.ts",
      content: `// 自动生成的API导入声明文件
// 由ew-auto-import-tool生成，请勿手动修改

declare global {
  // 将在项目构建时自动填充
}

export {}
`,
    },
  ];

  for (const file of declarationFiles) {
    const filePath = path.join(projectPath, file.name);

    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
      console.log(`声明文件已存在，跳过生成: ${filePath}`);
      continue;
    }

    // 写入声明文件
    await fs.writeFile(filePath, file.content, "utf-8");
    console.log(`已生成声明文件: ${filePath}`);
  }
}
