import { defineConfig } from "rspress/config";

export default defineConfig({
  root: "./",
  outDir: "ew-auto-import-tool",
  base: "/ew-auto-import-tool/",
  title: "ew-auto-import-tool",
  description: "Vue组件库自动导入工具",
  logo: "/favicon.svg",
  icon: "/favicon.svg",
  lang: "zh",
  markdown: {
    // 配置代码块的语法高亮
    codeHighlighter: "prism",
    highlightLanguages: [
      ["js", "javascript"],
      ["ts", "typescript"],
      ["jsx", "tsx"],
      ["xml", "xml-doc"],
      ["md", "markdown"],
      ["mdx", "tsx"],
      ["vue", "vue"],
    ],
    showLineNumbers: true,
  },
  locales: [
    {
      lang: "zh",
      label: "简体中文",
      title: "ew-auto-import-tool",
      description: "Vue组件库自动导入工具",
    },
    {
      lang: "en",
      label: "English",
      title: "ew-auto-import-tool",
      description: "Vue Component Library Auto Import Tool",
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/eveningwater/ew-auto-import-tool",
      },
    ],
    locales: [
      {
        lang: "zh",
        nav: [
          { text: "指南", link: "/guide/" },
          { text: "API", link: "/api/" },
          { text: "示例", link: "/examples/" },
        ],
        label: "",
        sidebar: {
          "/guide/": [
            {
              text: "指南",
              items: [
                { text: "介绍", link: "/guide/" },
                { text: "快速开始", link: "/guide/getting-started" },
                { text: "使用方法", link: "/guide/usage" },
                { text: "支持的组件库", link: "/guide/supported-libraries" },
                { text: "实现原理", link: "/guide/implementation" },
              ],
            },
          ],
          "/api/": [
            {
              text: "API参考",
              items: [
                { text: "核心API", link: "/api/" },
                { text: "项目检查器", link: "/api/project-checker" },
                { text: "依赖管理器", link: "/api/dependency-manager" },
                { text: "Vite配置管理器", link: "/api/vite-config-manager" },
                {
                  text: "TypeScript配置管理器",
                  link: "/api/ts-config-manager",
                },
                {
                  text: "声明文件生成器",
                  link: "/api/declaration-generator",
                },
              ],
            },
          ],
          "/examples/": [
            {
              text: "示例",
              items: [
                { text: "基本示例", link: "/examples/" },
                {
                  text: "项目结构对比",
                  link: "/examples/project-structure",
                },
              ],
            },
          ],
        },
      },
      {
        lang: "en",
        nav: [
          { text: "Guide", link: "/en/guide/" },
          { text: "API", link: "/en/api/" },
          { text: "Examples", link: "/en/examples/" },
        ],
        label: "",
        sidebar: {
          "/en/guide/": [
            {
              text: "Guide",
              items: [
                { text: "Introduction", link: "/en/guide/" },
                { text: "Getting Started", link: "/en/guide/getting-started" },
                { text: "Usage", link: "/en/guide/usage" },
                {
                  text: "Supported Libraries",
                  link: "/en/guide/supported-libraries",
                },
                { text: "Implementation", link: "/en/guide/implementation" },
              ],
            },
          ],
          "/en/api/": [
            {
              text: "API Reference",
              items: [
                { text: "Core API", link: "/en/api/" },
                { text: "Project Checker", link: "/en/api/project-checker" },
                {
                  text: "Dependency Manager",
                  link: "/en/api/dependency-manager",
                },
                {
                  text: "Vite Config Manager",
                  link: "/en/api/vite-config-manager",
                },
                {
                  text: "TypeScript Config Manager",
                  link: "/en/api/ts-config-manager",
                },
                {
                  text: "Declaration Generator",
                  link: "/en/api/declaration-generator",
                },
              ],
            },
          ],
          "/en/examples/": [
            {
              text: "Examples",
              items: [
                { text: "Basic Example", link: "/en/examples/" },
                {
                  text: "Project Structure Comparison",
                  link: "/en/examples/project-structure",
                },
              ],
            },
          ],
        },
      },
    ],
  },
});
