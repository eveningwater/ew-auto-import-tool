# Vite Config Manager

The Vite Config Manager module is responsible for updating the Vite configuration file to include the auto-import plugins. It provides functions to locate, parse, and modify the Vite configuration file to enable automatic component and API imports.

## API Reference

### `updateViteConfig`

**Signature:**

```typescript
function updateViteConfig(
  options: UpdateViteConfigOptions
): Promise<UpdateViteConfigResult>;
```

**Parameters:**

- `options: UpdateViteConfigOptions` - Configuration options for Vite config update
  - `path?: string` - The path to the project directory (defaults to current directory)
  - `library: string` - The component library to configure
  - `viteConfigPath?: string` - The path to the Vite configuration file (auto-detected if not specified)

**Returns:**

- `Promise<UpdateViteConfigResult>` - A promise that resolves to the update result
  - `success: boolean` - Whether the update was successful
  - `viteConfigPath: string` - The path to the updated Vite configuration file
  - `configUpdated: boolean` - Whether the configuration was actually modified

**Example:**

```typescript
import { updateViteConfig } from "ew-auto-import-tool";

async function configureVite() {
  try {
    const result = await updateViteConfig({
      path: "./my-vue-project",
      library: "element-plus",
    });

    if (result.success) {
      console.log(
        `Successfully updated Vite config at ${result.viteConfigPath}`
      );
      if (result.configUpdated) {
        console.log(
          "Configuration was modified to include auto-import plugins"
        );
      } else {
        console.log("Configuration already included auto-import plugins");
      }
    } else {
      console.error("Failed to update Vite configuration");
    }
  } catch (error) {
    console.error("Error updating Vite configuration:", error);
  }
}

configureVite();
```

## Implementation Details

The Vite Config Manager performs the following operations:

1. **Configuration File Detection**

   - Locates the Vite configuration file (vite.config.js/ts)
   - Supports both JavaScript and TypeScript configuration files

2. **AST Parsing and Transformation**

   - Parses the configuration file into an Abstract Syntax Tree (AST)
   - Analyzes the existing configuration to avoid duplicate plugins
   - Adds the necessary import statements for auto-import plugins
   - Adds plugin configurations with appropriate resolvers

3. **Code Generation**
   - Transforms the modified AST back to code
   - Preserves formatting and comments as much as possible
   - Writes the updated configuration back to the file

## Library-Specific Configurations

The module adds different resolver configurations based on the selected component library:

### Element Plus

```typescript
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    // ... existing plugins
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

### Ant Design Vue

```typescript
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    // ... existing plugins
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
```

## Source Code Analysis

The Vite Config Manager uses AST manipulation libraries to modify the configuration file. It follows these steps:

1. Read the Vite configuration file
2. Parse it into an AST using a parser like Babel or TypeScript
3. Traverse the AST to find the plugins array
4. Check if auto-import plugins are already configured
5. Add the necessary import statements and plugin configurations
6. Generate code from the modified AST
7. Write the updated code back to the file

```typescript
// Simplified implementation
async function updateViteConfig(
  options: UpdateViteConfigOptions
): Promise<UpdateViteConfigResult> {
  const projectPath = options.path || process.cwd();
  const viteConfigPath =
    options.viteConfigPath || (await findViteConfig(projectPath));

  if (!viteConfigPath) {
    throw new Error("Vite configuration file not found");
  }

  // Read the configuration file
  const configContent = fs.readFileSync(viteConfigPath, "utf-8");

  // Parse the file into an AST
  const ast = parseToAST(configContent, viteConfigPath);

  // Check if plugins are already configured
  const hasAutoImportPlugin = checkForPlugin(ast, "AutoImport");
  const hasComponentsPlugin = checkForPlugin(ast, "Components");

  if (hasAutoImportPlugin && hasComponentsPlugin) {
    return {
      success: true,
      viteConfigPath,
      configUpdated: false,
    };
  }

  // Add import statements
  addImportStatement(ast, "unplugin-auto-import/vite", "AutoImport");
  addImportStatement(ast, "unplugin-vue-components/vite", "Components");

  // Add resolver import based on library
  const resolverName = getResolverName(options.library);
  addImportStatement(
    ast,
    "unplugin-vue-components/resolvers",
    resolverName,
    true
  );

  // Add plugin configurations
  addPluginConfigurations(ast, resolverName, options.library);

  // Generate code from the modified AST
  const updatedContent = generateCode(ast);

  // Write the updated code back to the file
  fs.writeFileSync(viteConfigPath, updatedContent, "utf-8");

  return {
    success: true,
    viteConfigPath,
    configUpdated: true,
  };
}

function getResolverName(library: string): string {
  switch (library) {
    case "element-plus":
      return "ElementPlusResolver";
    case "ant-design-vue":
      return "AntDesignVueResolver";
    case "naive-ui":
      return "NaiveUiResolver";
    case "vant":
      return "VantResolver";
    default:
      throw new Error(`Unsupported library: ${library}`);
  }
}
```

## Error Handling

The Vite Config Manager includes robust error handling to provide clear feedback when issues are encountered:

- Configuration file not found errors
- Parsing errors for malformed configuration files
- AST traversal and manipulation errors
- File writing errors

These errors are propagated to the caller with descriptive messages to help users troubleshoot issues.

## Related Modules

- [Project Checker](./project-checker.md) - Provides Vite configuration file detection
- [Dependency Manager](./dependency-manager.md) - Installs the dependencies required by the Vite plugins
- [Declaration Generator](./declaration-generator.md) - Creates declaration files referenced by the Vite plugins
