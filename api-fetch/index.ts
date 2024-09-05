import fetch from "node-fetch";
import Scriptrunner, { InputParams as BaseInputParams } from "..";

interface ApiInputParams extends BaseInputParams {
  method: "GET" | "POST" | "PUT" | "DELETE";
}

type OutputParams = {
  data: any;
};

/**
 * Script to call an API using nodejs fetch
 */
async function run(params: ApiInputParams) {
  try {
    console.log("Params::", params);
    const response = await fetch(params.envVars.api_url, {
      method: params.method,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error(`Failed to fetch data: ${err}`);
  } finally {
    console.log("Done");
  }
}

// Run the script
new Scriptrunner<ApiInputParams, OutputParams>().run(run);
