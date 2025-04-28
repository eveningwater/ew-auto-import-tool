"use strict";
/**
 * 类型定义
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIBRARY_CONFIGS = void 0;
// 组件库配置映射
exports.LIBRARY_CONFIGS = {
    "element-plus": {
        name: "element-plus",
        dependencies: [
            "element-plus",
            "unplugin-auto-import",
            "unplugin-vue-components",
        ],
        resolverImport: 'import { ElementPlusResolver } from "unplugin-vue-components/resolvers";',
        resolverName: "ElementPlusResolver",
    },
    "ant-design-vue": {
        name: "ant-design-vue",
        dependencies: [
            "ant-design-vue",
            "unplugin-auto-import",
            "unplugin-vue-components",
        ],
        resolverImport: 'import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";',
        resolverName: "AntDesignVueResolver",
    },
    "naive-ui": {
        name: "naive-ui",
        dependencies: [
            "naive-ui",
            "unplugin-auto-import",
            "unplugin-vue-components",
        ],
        resolverImport: 'import { NaiveUiResolver } from "unplugin-vue-components/resolvers";',
        resolverName: "NaiveUiResolver",
    },
    vant: {
        name: "vant",
        dependencies: ["vant", "unplugin-auto-import", "unplugin-vue-components"],
        resolverImport: 'import { VantResolver } from "unplugin-vue-components/resolvers";',
        resolverName: "VantResolver",
    },
};
