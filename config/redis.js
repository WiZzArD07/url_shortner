const { createClient } = require("redis");

let client;

async function connectRedis() {
  try {
    if (!process.env.REDIS_URL) {
      console.log("No Redis URL provided");
      return;
    }

    client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        tls: true,                 
        keepAlive: 5000,
        reconnectStrategy: (retries) => Math.min(retries * 50, 500),
      },
    });

    client.on("error", (err) => {
      console.error("Redis Error:", err.message);
    });

    client.on("connect", () => {
      console.log("🔌 Redis connecting...");
    });

    client.on("ready", () => {
      console.log("Redis Connected");
    });

    await client.connect();

  } catch (err) {
    console.error("Redis failed:", err.message);
  }
}

module.exports = { client: () => client, connectRedis };