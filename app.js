const express = require("express");
const { connectDB } = require("./config/db");
const { connectRedis } = require("./config/redis");

const app = express();

app.use(express.json());

// routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;

// Start server ONLY after DB + Redis ready
async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();