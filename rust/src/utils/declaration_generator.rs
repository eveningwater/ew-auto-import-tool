use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

/// 生成声明文件
pub fn generate_declaration_files(project_path: &Path) -> Result<()> {
    let declaration_files = [
        (
            "components.d.ts",
            "// 自动生成的组件声明文件
// 由ew-auto-import-tool生成，请勿手动修改

declare module 'vue' {
  export interface GlobalComponents {
    // 将在项目构建时自动填充
  }
}

export {}
",
        ),
        (
            "auto-imports.d.ts",
            "// 自动生成的API导入声明文件
// 由ew-auto-import-tool生成，请勿手动修改

declare global {
  // 将在项目构建时自动填充
}

export {}
",
        ),
    ];

    for (file_name, content) in declaration_files.iter() {
        let file_path = project_path.join(file_name);

        // 检查文件是否已存在
        if file_path.exists() {
            println!("声明文件已存在，跳过生成: {:?}", file_path);
            continue;
        }

        // 写入文件
        fs::write(&file_path, content)
            .context(format!("创建声明文件失败: {:?}", file_path))?;

        println!("已生成声明文件: {:?}", file_path);
    }

    Ok(())
}