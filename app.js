// require("dotenv").config();
// const express = require("express");
// const app = express();

// const urlRoutes = require("./routes/urlRoutes");

// app.use(express.json());
// app.use("/", urlRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

const express = require("express");
const { connectDB } = require("./config/db");
const { connectRedis } = require("./config/redis");

const app = express();

app.use(express.json());

// routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

const PORT = 3000;

// Start server ONLY after DB + Redis ready
async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();