use anyhow::Result;
use clap::{Parser, ValueEnum};
use colored::*;
use inquire::{Confirm, Select};
use spinners::{Spinner, Spinners};
use std::path::PathBuf;

mod config;
mod types;
mod utils;

use crate::types::{Library, ProjectInfo};
use crate::utils::project_checker::check_project;
use crate::utils::dependency_manager::install_dependencies;
use crate::utils::vite_config_manager::update_vite_config;
use crate::utils::ts_config_manager::update_ts_config;
use crate::utils::declaration_generator::generate_declaration_files;

#[derive(Parser, Debug)]
#[command(name = "ew-auto-import-tool")]
#[command(author = "eveningwater")]
#[command(version = "0.1.0")]
#[command(about = "自动化完成Vue项目中按需导入组件库的配置工具", long_about = None)]
struct Cli {
    /// 指定要配置的组件库
    #[arg(short, long, value_enum)]
    library: Option<LibraryArg>,

    /// 指定项目路径，默认为当前目录
    #[arg(short, long, default_value = ".")]
    path: PathBuf,
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum, Debug)]
enum LibraryArg {
    /// Element Plus 组件库
    ElementPlus,
    /// Ant Design Vue 组件库
    AntDesignVue,
    /// Naive UI 组件库
    NaiveUi,
    /// Vant 组件库
    Vant,
}

impl From<LibraryArg> for Library {
    fn from(arg: LibraryArg) -> Self {
        match arg {
            LibraryArg::ElementPlus => Library::ElementPlus,
            LibraryArg::AntDesignVue => Library::AntDesignVue,
            LibraryArg::NaiveUi => Library::NaiveUi,
            LibraryArg::Vant => Library::Vant,
        }
    }
}

/// 主函数：执行自动导入配置
async fn configure_auto_import(library: Library, project_path: PathBuf) -> Result<bool> {
    // 1. 检查项目结构
    let project_info = check_project(&project_path)?;
    if !project_info.is_valid {
        return Ok(false);
    }

    // 2. 安装依赖
    install_dependencies(library, &project_path, &project_info.package_manager)?;

    // 3. 更新Vite配置
    update_vite_config(library, &project_path, &project_info)?;

    // 4. 更新TypeScript配置
    if project_info.has_typescript {
        update_ts_config(&project_path)?;
    }

    // 5. 生成声明文件
    generate_declaration_files(&project_path)?;

    Ok(true)
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    let project_path = std::fs::canonicalize(cli.path)?;

    println!("{}", "\n===== Vue 组件库按需导入配置工具 =====\n".cyan());

    // 检查项目路径是否存在
    if !project_path.exists() {
        eprintln!("{}", format!("错误: 项目路径 {:?} 不存在", project_path).red());
        std::process::exit(1);
    }

    // 如果没有通过命令行指定组件库，则通过交互方式选择
    let library = match cli.library {
        Some(lib) => lib.into(),
        None => {
            let options = vec![
                "Element Plus",
                "Ant Design Vue",
                "Naive UI",
                "Vant",
            ];
            
            let selection = Select::new("请选择要配置的组件库:", options)
                .prompt()
                .expect("选择组件库失败");

            match selection {
                "Element Plus" => Library::ElementPlus,
                "Ant Design Vue" => Library::AntDesignVue,
                "Naive UI" => Library::NaiveUi,
                "Vant" => Library::Vant,
                _ => unreachable!(),
            }
        }
    };

    // 显示配置信息
    println!("{}", "\n配置信息:".blue());
    println!("- 组件库: {}", library.to_string().green());
    println!("- 项目路径: {}\n", format!("{:?}", project_path).green());

    // 确认是否继续
    let confirm = Confirm::new("确认开始配置?")
        .with_default(true)
        .prompt()
        .expect("确认失败");

    if !confirm {
        println!("{}", "\n已取消配置\n".yellow());
        return Ok(());
    }

    // 开始配置
    let mut spinner = Spinner::new(Spinners::Dots9, "正在配置自动导入...".into());

    match configure_auto_import(library, project_path) {
        Ok(true) => {
            spinner.stop_with_message("配置完成!".green().to_string());
            println!("{}", "\n✨ 组件库按需导入已成功配置!\n".green());
            println!("下一步:");
            println!("1. 重启开发服务器");
            println!("2. 在组件中直接使用组件，无需手动导入\n");
        }
        Ok(false) => {
            spinner.stop_with_message("配置失败".red().to_string());
            println!("{}", "\n❌ 组件库按需导入配置失败!\n".red());
        }
        Err(err) => {
            spinner.stop_with_message("配置失败".red().to_string());
            println!("{}", format!("\n❌ 错误: {}\n", err).red());
        }
    }

    Ok(())
}