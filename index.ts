import * as fs from "fs";
import * as dotenv from "dotenv";

// Define the InputParams interface
export interface InputParams
  extends Record<string, string | Record<string, string>> {
  envFile: string;
  envVars: Record<string, string>;
}

export default class Scriptrunner<
  I extends InputParams,
  OutputParams extends Record<string, any>
> {
  private inputParams: I;

  constructor() {}

  private extractParams(): I {
    // Usage example
    const encodedArgs = process.argv[2]; // Get the Base64-encoded JSON argument
    // Decode Base64 to JSON string
    const jsonString = Buffer.from(encodedArgs, "base64").toString("utf-8");

    // Parse JSON string to Params object
    let params: I;
    try {
      params = JSON.parse(jsonString) as I;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      params = {} as I;
    }

    params.envVars = {};
    if (params.envFile) {
      dotenv.config({ path: params.envFile });
      // Add dotenv variables to params
      const envVars = dotenv.parse(fs.readFileSync(params.envFile));
      params.envVars = envVars;
    }

    return params;
  }

  async run(func: (params: I) => Promise<any>): Promise<void> {
    try {
      this.inputParams = this.extractParams();
      const result = await func(this.inputParams);
      this.outputResult(result);
      // keep running 2 seconds
      setTimeout(() => {
        process.exit(0);
      }, 2000);
    } catch (error) {
      console.error("Error executing function:", error);
      this.outputResult({ error: "An error occurred during execution" });
    }
  }

  private outputResult(result: any): void {
    const outputPath = "output.json";
    const resultString = JSON.stringify(result, null, 2);

    fs.writeFileSync(outputPath, resultString);
    console.log(`Result written to ${outputPath}`);
  }
}
