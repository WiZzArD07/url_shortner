const { createClient } = require("redis");

let client;

async function connectRedis() {
  try {
    if (!process.env.REDIS_URL) {
      console.log("⚠️ No Redis URL provided");
      return;
    }

    client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        tls: true,
        rejectUnauthorized: false, 
      },
    });

    client.on("error", (err) => {
      console.error("Redis Error:", err.message);
    });

    await client.connect();

    console.log("✅ Redis Connected");

  } catch (err) {
    console.error("❌ Redis failed:", err.message);
  }
}

module.exports = { client: () => client, connectRedis };