use anyhow::{Context, Result};
use regex::Regex;
use std::fs;
use std::path::Path;

use crate::types::{Library, ProjectInfo, get_library_config};

/// 更新Vite配置
pub fn update_vite_config(
    library: Library,
    project_path: &Path,
    project_info: &ProjectInfo,
) -> Result<()> {
    // 获取组件库配置
    let library_config = get_library_config(library);

    // 检查Vite配置文件路径
    let vite_config_path = match &project_info.vite_config_path {
        Some(path) => path,
        None => anyhow::bail!("无效的项目结构或未找到Vite配置文件"),
    };

    // 读取Vite配置文件
    let mut content = fs::read_to_string(vite_config_path)
        .context(format!("读取Vite配置文件失败: {:?}", vite_config_path))?;

    // 检查是否已经配置了自动导入
    if content.contains("unplugin-auto-import/vite") && content.contains("unplugin-vue-components/vite") {
        println!("Vite配置中已存在自动导入插件，跳过配置");
        return Ok(());
    }

    // 添加导入语句
    let imports = vec![
        "import AutoImport from \"unplugin-auto-import/vite\";",
        "import Components from \"unplugin-vue-components/vite\";",
        &library_config.resolver_import,
    ];

    // 查找导入语句的位置
    let import_regex = Regex::new(r"import\s+.+\s+from\s+['].*['];?");
    
    let last_import_pos = import_regex
        .find_iter(&content)
        .last()
        .map(|m| m.end())
        .unwrap_or(0);

    if last_import_pos > 0 {
        content = format!(
            "{}\n{}\n{}",
            &content[..last_import_pos],
            imports.join("\n"),
            &content[last_import_pos..]
        );
    } else {
        // 如果没有找到导入语句，则添加到文件开头
        content = format!("{}

{}", imports.join("\n"), content);
    }

    // 添加插件配置
    let plugins_config = format!(
        "  AutoImport({{
    resolvers: [{}()],
  }}),
  Components({{
    resolvers: [{}()],
  }})",
        library_config.resolver_name,
        library_config.resolver_name
    );

    // 查找plugins数组
    let plugins_regex = Regex::new(r"(?s)plugins\s*:\s*\[([^\]]*)\]")?;
    if let Some(plugins_match) = plugins_regex.captures(&content) {
        let plugins_content = &plugins_match[1];
        let comma = if plugins_content.trim().is_empty() { "" } else { "," };
        let updated_plugins_content = format!("{}{}{}", plugins_content, comma, plugins_config);
        content = plugins_regex.replace(
            &content,
            &format!("plugins: [{}]", updated_plugins_content)
        ).to_string();
    } else {
        // 如果没有找到plugins数组，则尝试找到defineConfig函数
        let define_config_regex = Regex::new(r"(?s)defineConfig\s*\(\s*\{([^}]*)\}\s*\)")?;
        if let Some(define_config_match) = define_config_regex.captures(&content) {
            let config_content = &define_config_match[1];
            let updated_config_content = format!(
                "{}\n  plugins: [{}],",
                config_content,
                plugins_config
            );
            content = define_config_regex.replace(
                &content,
                &format!("defineConfig({{{}}})", updated_config_content)
            ).to_string();
        } else {
            anyhow::bail!("无法找到Vite配置中的plugins数组或defineConfig函数");
        }
    }

    // 写入更新后的配置文件
    fs::write(vite_config_path, content)
        .context(format!("写入Vite配置文件失败: {:?}", vite_config_path))?;

    println!("已更新Vite配置文件: {:?}", vite_config_path);
    Ok(())
}