import Scriptrunner, { type InputParams as BaseInputParams } from "..";

interface ExampleInputParams extends BaseInputParams {
  message: string;
}

type OutputParams = {
  result: string;
};

/**
 * Example script to demonstrate Scriptrunner functionality
 */
async function run(params: ExampleInputParams): Promise<OutputParams> {
  try {
    return { result: `Hello, ${params.message}!` };
  } catch (err) {
    throw new Error(`Failed to process: ${err}`);
  } finally {
    console.log("Done");
  }
}

// Run the script
new Scriptrunner<ExampleInputParams, OutputParams>().run(run);
