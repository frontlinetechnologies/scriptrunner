# Scriptrunner Scripts

This repository contains scripts that can be used in the Scriptrunner Flutter app. These scripts are designed to perform various actions and can be easily integrated into the Scriptrunner environment.

## Structure

Each script in this repository should follow this structure:

1. A TypeScript file (e.g., `index.ts`) containing the main script logic.
2. A `scriptrunner.yml` file that defines the script's metadata and parameters.

### Script File (index.ts)

The script file should:

1. Import the Scriptrunner class and necessary types.
2. Define input and output parameter interfaces.
3. Implement the main `run` function with the script logic.
4. Create a new instance of Scriptrunner and call the `run` method.

Example:

```typescript
import Scriptrunner, { type InputParams as BaseInputParams } from "..";

interface ScriptInputParams extends BaseInputParams {
  // Define your input parameters here
}

type OutputParams = {
  // Define your output parameters here
};

async function run(params: ScriptInputParams): Promise<OutputParams> {
  // Implement your script logic here
}

// Run the script
new Scriptrunner<ScriptInputParams, OutputParams>().run(run);
```

### scriptrunner.yml

The `scriptrunner.yml` file should define the script's metadata and parameters. It should include:

- `version`: The version of the script format
- `name`: The name of the script
- `language`: The programming language used (typescript)
- `entryfile`: The main script file (usually index.ts)
- `type`: The type of script (e.g., action)
- `parameters`: Input and output parameters definition

Example:

```yaml
version: 1
name: example
language: typescript
entryfile: index.ts
type: action
parameters:
  input:
    - name: paramName
      type: string
      required: true
  output:
    - name: resultName
      type: string
```

## Usage

To use these scripts in the Scriptrunner Flutter app:

1. Ensure that the script files (index.ts and scriptrunner.yml) are properly structured and located in the correct directory.
2. The Scriptrunner Flutter app will be able to discover and utilize these scripts based on the provided metadata and parameters.

## Development

When developing new scripts:

1. Create a new directory for your script.
2. Implement the script logic in an `index.ts` file.
3. Create a `scriptrunner.yml` file with the appropriate metadata and parameters.
4. Test your script thoroughly to ensure it works as expected within the Scriptrunner environment.

Remember to handle errors gracefully and provide clear output for the Scriptrunner app to interpret and display.

## License

Please refer to the LICENSE file in this repository for information on the license under which these scripts are distributed.