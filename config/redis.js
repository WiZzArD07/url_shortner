const { createClient } = require("redis");

let client;

async function connectRedis() {
  try {
    //  If no Redis URL → skip (safe for production)
    if (!process.env.REDIS_URL) {
      console.log("Redis not configured, skipping...");
      return;
    }

    client = createClient({
      url: process.env.REDIS_URL,   //  IMPORTANT
    });

    client.on("error", (err) => {
      console.log("Redis Error:", err);
    });

    await client.connect();

    console.log("Redis Connected");

  } catch (err) {
    console.log("Redis failed, continuing without cache...");
  }
}

module.exports = { client: () => client, connectRedis };