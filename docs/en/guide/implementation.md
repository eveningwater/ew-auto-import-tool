# Implementation

This page explains the implementation principles of ew-auto-import-tool and how it works under the hood.

## Architecture

ew-auto-import-tool is designed with a modular architecture, consisting of several core modules that work together to automate the configuration process:

1. **Project Checker** - Analyzes the project structure and verifies compatibility
2. **Dependency Manager** - Handles the installation of required packages
3. **Vite Config Manager** - Updates the Vite configuration file
4. **TypeScript Config Manager** - Updates the TypeScript configuration file
5. **Declaration Generator** - Generates type declaration files

## Workflow

When you run ew-auto-import-tool, it follows this workflow:

1. **Project Analysis**

   - Checks if the current directory contains a Vue project
   - Identifies the project structure and configuration files
   - Verifies compatibility with the selected component library

2. **Dependency Installation**

   - Detects the package manager (npm, yarn, or pnpm)
   - Installs the required dependencies:
     - The selected component library
     - unplugin-auto-import
     - unplugin-vue-components

3. **Vite Configuration Update**

   - Locates the Vite configuration file (vite.config.ts/js)
   - Adds the necessary plugins with appropriate resolvers
   - Preserves existing configuration

4. **TypeScript Configuration Update**

   - Locates the TypeScript configuration file (tsconfig.json)
   - Adds declaration files to the include array
   - Preserves existing configuration

5. **Declaration File Generation**
   - Creates placeholder declaration files if they don't exist
   - These files will be automatically updated by the plugins when the project runs

## Technical Details

### Auto Import Mechanism

The auto-import functionality is powered by two key plugins:

1. **unplugin-vue-components**

   - Automatically imports components used in templates
   - Generates component declaration files for TypeScript

2. **unplugin-auto-import**
   - Automatically imports APIs (like ref, reactive) used in script sections
   - Generates API declaration files for TypeScript

These plugins work by analyzing your code during the build process and automatically adding the necessary import statements.

### Resolver Configuration

Each component library requires a specific resolver configuration. For example, for Element Plus:

```typescript
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

The resolver tells the plugins which components and APIs to look for and how to import them.

### Declaration Files

Two declaration files are generated:

1. **components.d.ts** - Contains type definitions for all auto-imported components
2. **auto-imports.d.ts** - Contains type definitions for all auto-imported APIs

These files ensure that TypeScript recognizes the auto-imported components and APIs, providing proper type checking and IntelliSense in your IDE.

## Code Structure

The tool's source code is organized as follows:

```
src/
├── cli.ts              # Command-line interface
├── index.ts            # Main entry point and API
├── modules/
│   ├── declarationGenerator.ts    # Declaration file generation
│   ├── dependencyManager.ts       # Dependency installation
│   ├── tsConfigManager.ts         # TypeScript config updates
│   └── viteConfigManager.ts       # Vite config updates
├── types.ts            # Type definitions
└── utils/
    └── projectChecker.ts          # Project analysis
```

Each module is designed to be independent and reusable, allowing for easy maintenance and extension.
