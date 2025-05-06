# Core API

ew-auto-import-tool provides a series of core APIs that can be used programmatically in your projects. Below are the main API functions and their usage.

## configureAutoImport

The main function for executing the entire auto-import configuration process.

### Function Signature

```typescript
async function configureAutoImport(
  library: Library,
  projectPath: string = process.cwd()
): Promise<boolean>;
```

### Parameters

- `library`: The component library to configure, type `Library` (string literal type)
- `projectPath`: Project path, defaults to the current working directory

### Return Value

- `Promise<boolean>`: Promise indicating whether the configuration was successful

### Example

```typescript
import { configureAutoImport } from "ew-auto-import-tool";

async function setup() {
  try {
    const success = await configureAutoImport(
      "element-plus",
      "/path/to/project"
    );
    if (success) {
      console.log("Configuration successful!");
    } else {
      console.log("Configuration failed!");
    }
  } catch (error) {
    console.error("Configuration error:", error);
  }
}

setup();
```

## Module APIs

In addition to the main function, ew-auto-import-tool also provides several module APIs that can be used independently:

- [Project Checker](./project-checker.md) - Check project type and structure
- [Dependency Manager](./dependency-manager.md) - Manage project dependencies
- [Vite Config Manager](./vite-config-manager.md) - Update Vite configuration
- [TypeScript Config Manager](./ts-config-manager.md) - Update TypeScript configuration
- [Declaration Generator](./declaration-generator.md) - Generate declaration files

These modules can be imported and used separately according to your needs.
