# Dependency Manager

The Dependency Manager module is responsible for installing and managing the dependencies required for auto-import functionality. It provides functions to detect the package manager used in the project and install the necessary packages.

## API Reference

### `installDependencies`

**Signature:**

```typescript
function installDependencies(
  options: InstallDependenciesOptions
): Promise<InstallDependenciesResult>;
```

**Parameters:**

- `options: InstallDependenciesOptions` - Configuration options for dependency installation
  - `path?: string` - The path to the project directory (defaults to current directory)
  - `library: string` - The component library to install
  - `packageManager?: 'npm' | 'yarn' | 'pnpm'` - The package manager to use (auto-detected if not specified)

**Returns:**

- `Promise<InstallDependenciesResult>` - A promise that resolves to the installation result
  - `success: boolean` - Whether the installation was successful
  - `packageManager: 'npm' | 'yarn' | 'pnpm'` - The package manager used
  - `installedPackages: string[]` - The list of installed packages

**Example:**

```typescript
import { installDependencies } from "ew-auto-import-tool";

async function setupDependencies() {
  try {
    const result = await installDependencies({
      path: "./my-vue-project",
      library: "element-plus",
    });

    if (result.success) {
      console.log(
        `Successfully installed dependencies using ${result.packageManager}`
      );
      console.log("Installed packages:", result.installedPackages.join(", "));
    } else {
      console.error("Failed to install dependencies");
    }
  } catch (error) {
    console.error("Error installing dependencies:", error);
  }
}

setupDependencies();
```

## Implementation Details

The Dependency Manager performs the following operations:

1. **Package Manager Detection**

   - Detects whether the project uses npm, yarn, or pnpm based on lock files
   - Falls back to npm if no package manager is detected

2. **Dependency Resolution**

   - Determines the required packages based on the selected component library
   - Always includes core packages: unplugin-auto-import, unplugin-vue-components
   - Adds library-specific packages (e.g., element-plus for Element Plus)

3. **Installation Process**
   - Executes the appropriate install command based on the detected package manager
   - Handles installation errors and provides detailed feedback

## Package Manager Commands

The module uses different commands depending on the detected package manager:

| Package Manager | Install Command                     |
| --------------- | ----------------------------------- |
| npm             | `npm install --save-dev <packages>` |
| yarn            | `yarn add --dev <packages>`         |
| pnpm            | `pnpm add --save-dev <packages>`    |

For component libraries, the module uses the standard installation command without the `--save-dev` flag, as these are runtime dependencies.

## Source Code Analysis

The Dependency Manager uses Node.js child process execution to run package manager commands. It follows these steps:

1. Detect or use the specified package manager
2. Determine the packages to install based on the library
3. Execute the installation commands
4. Parse the output to determine success or failure

```typescript
// Simplified implementation
async function installDependencies(
  options: InstallDependenciesOptions
): Promise<InstallDependenciesResult> {
  const projectPath = options.path || process.cwd();
  const packageManager =
    options.packageManager || (await detectPackageManager(projectPath));

  // Determine packages to install
  const devDependencies = ["unplugin-auto-import", "unplugin-vue-components"];
  const dependencies = [options.library];

  // Install dev dependencies
  const devInstallCommand = getInstallCommand(
    packageManager,
    devDependencies,
    true
  );
  await executeCommand(devInstallCommand, projectPath);

  // Install runtime dependencies
  const runtimeInstallCommand = getInstallCommand(
    packageManager,
    dependencies,
    false
  );
  await executeCommand(runtimeInstallCommand, projectPath);

  return {
    success: true,
    packageManager,
    installedPackages: [...devDependencies, ...dependencies],
  };
}

function getInstallCommand(
  packageManager: string,
  packages: string[],
  isDev: boolean
): string {
  const packagesStr = packages.join(" ");
  switch (packageManager) {
    case "npm":
      return `npm install ${isDev ? "--save-dev" : ""} ${packagesStr}`;
    case "yarn":
      return `yarn add ${isDev ? "--dev" : ""} ${packagesStr}`;
    case "pnpm":
      return `pnpm add ${isDev ? "--save-dev" : ""} ${packagesStr}`;
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }
}
```

## Error Handling

The Dependency Manager includes robust error handling to provide clear feedback when issues are encountered:

- Package manager detection errors
- Network connectivity issues
- Package resolution failures
- Installation process errors

These errors are propagated to the caller with descriptive messages to help users troubleshoot issues.

## Related Modules

- [Project Checker](./project-checker.md) - Provides package manager detection used by the Dependency Manager
- [Vite Config Manager](./vite-config-manager.md) - Uses the installed packages to configure Vite
