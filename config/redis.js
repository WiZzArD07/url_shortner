const { createClient } = require("redis");

let client;

async function connectRedis() {
  client = createClient({
    url: process.env.REDIS_URL || "redis://redis:6379",
  });

  client.on("error", (err) => console.log("Redis Error", err));

  let connected = false;

  while (!connected) {
    try {
      await client.connect();
      console.log("Redis Connected");
      connected = true;
    } catch (err) {
      console.log("Redis not ready, retrying in 3 sec...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

module.exports = { client: () => client, connectRedis };