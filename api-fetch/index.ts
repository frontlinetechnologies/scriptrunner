import fetch from "node-fetch";

/**
 * Script to call an API using nodejs fetch
 */

async function run(params: Params) {
  try {
    const response = await fetch(params.url, {
      method: params.method,
    });
  } catch (err) {
    throw new Error(`Failed to fetch data: ${err}`);
  } finally {
    console.log("Done");
  }
}

// Input parameters
const args = process.argv.slice(2) as unknown as Params;
type Params = {
  url: string;
  method: string;
};

// Run the script
run(args)
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
