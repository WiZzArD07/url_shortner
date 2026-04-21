const Redis = require("ioredis");

let client;

function connectRedis() {
  try {
    if (!process.env.REDIS_URL) {
      console.log("No Redis URL provided");
      return;
    }

    client = new Redis(process.env.REDIS_URL, {
      tls: {}, //Upstash requires TLS
    });

    client.on("connect", () => {
      console.log("🔌 Redis connecting...");
    });

    client.on("ready", () => {
      console.log("Redis Connected");
    });

    client.on("error", (err) => {
      console.error("Redis Error:", err.message);
    });

  } catch (err) {
    console.error("Redis failed:", err.message);
  }
}

module.exports = { client: () => client, connectRedis };