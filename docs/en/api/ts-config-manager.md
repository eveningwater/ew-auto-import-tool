# TypeScript Config Manager

The `tsConfigManager` module is responsible for updating the project's TypeScript configuration file, adding declaration files for auto-imported components and APIs to the `include` configuration, ensuring that TypeScript correctly recognizes these types.

## API Reference

### updateTsConfig

```typescript
async function updateTsConfig(projectPath: string): Promise<void>;
```

#### Parameters

- `projectPath: string` - Path to the project root directory

#### Return Value

- `Promise<void>` - Asynchronous operation, no return value on success

#### Exceptions

- Throws an error when updating TypeScript configuration fails

#### Usage Example

```typescript
import { updateTsConfig } from "ew-auto-import-tool";

// Update TypeScript configuration, adding declaration file references
await updateTsConfig("/path/to/your/project");
```

## Implementation Details

The `updateTsConfig` function performs the following steps:

1. **Check Configuration File Existence**: Verify if the `tsconfig.json` file exists in the project, skip configuration if it doesn't exist

2. **Read Existing Configuration**: Read the contents of the `tsconfig.json` file

3. **Check Include Configuration**: If the `include` field doesn't exist in the configuration, create an empty array

4. **Add Declaration File References**: Add `components.d.ts` and `auto-imports.d.ts` to the `include` array (if not already included)

5. **Write Updated Configuration**: If there are changes, write the updated configuration back to the `tsconfig.json` file

## Declaration Files Description

The two declaration files added by the module serve the following purposes:

- **components.d.ts** - Contains type declarations for all components in the component library, allowing TypeScript to recognize components used in templates
- **auto-imports.d.ts** - Contains type declarations for all auto-imported APIs from the component library, allowing TypeScript to recognize globally available APIs

These files are typically automatically generated and updated by the `unplugin-auto-import` and `unplugin-vue-components` plugins when the project is first started.

## Configuration Example

`tsconfig.json` before update:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

`tsconfig.json` after update:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "components.d.ts",
    "auto-imports.d.ts"
  ]
}
```

## Source Code Analysis

The `tsConfigManager` module uses the `fs-extra` library to read and write JSON files, which simplifies the process of handling configuration files:

```typescript
// Read tsconfig.json
const tsConfig = await fs.readJSON(tsConfigPath);

// Check if include configuration exists
if (!tsConfig.include) {
  tsConfig.include = [];
}

// Add declaration files to include configuration
const declarationFiles = ["components.d.ts", "auto-imports.d.ts"];
let updated = false;

for (const file of declarationFiles) {
  if (!tsConfig.include.includes(file)) {
    tsConfig.include.push(file);
    updated = true;
  }
}

// If there are updates, write to file
if (updated) {
  await fs.writeJSON(tsConfigPath, tsConfig, { spaces: 2 });
  console.log(`TypeScript configuration file updated: ${tsConfigPath}`);
}
```

## Notes

- The function automatically detects and skips configurations that already include the required declaration files
- If the `tsconfig.json` file doesn't exist in the project, the function will skip configuration without reporting an error
- The function only modifies the `include` field and doesn't change other TypeScript configurations
