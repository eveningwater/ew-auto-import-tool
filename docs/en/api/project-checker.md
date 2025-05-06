# Project Checker

The Project Checker module is responsible for analyzing the project structure and verifying compatibility with the selected component library. It provides functions to check if the current directory contains a valid Vue project and to identify the project's configuration files.

## API Reference

### `checkProject`

**Signature:**

```typescript
function checkProject(
  options: CheckProjectOptions
): Promise<CheckProjectResult>;
```

**Parameters:**

- `options: CheckProjectOptions` - Configuration options for project checking
  - `path?: string` - The path to the project directory (defaults to current directory)
  - `library?: string` - The component library to check compatibility with

**Returns:**

- `Promise<CheckProjectResult>` - A promise that resolves to the check result
  - `isVueProject: boolean` - Whether the directory contains a Vue project
  - `hasViteConfig: boolean` - Whether the project has a Vite configuration file
  - `hasTsConfig: boolean` - Whether the project has a TypeScript configuration file
  - `viteConfigPath?: string` - The path to the Vite configuration file (if found)
  - `tsConfigPath?: string` - The path to the TypeScript configuration file (if found)
  - `packageManager: 'npm' | 'yarn' | 'pnpm'` - The detected package manager

**Example:**

```typescript
import { checkProject } from "ew-auto-import-tool";

async function analyzeProject() {
  const result = await checkProject({
    path: "./my-vue-project",
    library: "element-plus",
  });

  if (result.isVueProject) {
    console.log("Valid Vue project detected!");
    console.log(`Package manager: ${result.packageManager}`);
    console.log(`Vite config: ${result.viteConfigPath}`);
    console.log(`TS config: ${result.tsConfigPath}`);
  } else {
    console.log("Not a valid Vue project");
  }
}

analyzeProject();
```

## Implementation Details

The Project Checker performs the following checks:

1. **Vue Project Detection**

   - Checks for the presence of `vue` in package.json dependencies
   - Verifies the existence of key Vue project files

2. **Configuration File Detection**

   - Searches for Vite configuration files (vite.config.js/ts)
   - Searches for TypeScript configuration files (tsconfig.json)

3. **Package Manager Detection**
   - Detects whether the project uses npm, yarn, or pnpm based on lock files

## Source Code Analysis

The Project Checker uses the `fs-extra` library to check for file existence and read package.json. It follows these steps:

1. Check if the specified path exists and is a directory
2. Read and parse the package.json file to verify Vue dependency
3. Look for configuration files using pattern matching
4. Determine the package manager by checking for lock files

```typescript
// Simplified implementation
async function checkProject(
  options: CheckProjectOptions
): Promise<CheckProjectResult> {
  const projectPath = options.path || process.cwd();

  // Check if directory exists
  if (!fs.existsSync(projectPath) || !fs.statSync(projectPath).isDirectory()) {
    throw new Error(`Invalid project path: ${projectPath}`);
  }

  // Read package.json
  const packageJsonPath = path.join(projectPath, "package.json");
  const hasPackageJson = fs.existsSync(packageJsonPath);

  let isVueProject = false;
  if (hasPackageJson) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    isVueProject =
      !!packageJson.dependencies?.vue || !!packageJson.devDependencies?.vue;
  }

  // Find configuration files
  const viteConfigPath = findViteConfig(projectPath);
  const tsConfigPath = findTsConfig(projectPath);

  // Detect package manager
  const packageManager = detectPackageManager(projectPath);

  return {
    isVueProject,
    hasViteConfig: !!viteConfigPath,
    hasTsConfig: !!tsConfigPath,
    viteConfigPath,
    tsConfigPath,
    packageManager,
  };
}
```

## Error Handling

The Project Checker includes robust error handling to provide clear feedback when issues are encountered:

- Invalid project path errors
- Package.json parsing errors
- Missing required dependencies

These errors are propagated to the caller with descriptive messages to help users troubleshoot issues.

## Related Modules

- [Dependency Manager](./dependency-manager.md) - Uses Project Checker results to install required dependencies
- [Vite Config Manager](./vite-config-manager.md) - Uses the detected Vite configuration path
- [TypeScript Config Manager](./ts-config-manager.md) - Uses the detected TypeScript configuration path
