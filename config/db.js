const mysql = require("mysql2");

let db;
let isConnected = false;

function connectDB() {
  return new Promise((resolve) => {

    const tryConnect = () => {

      if (isConnected) return; // ✅ stop further retries

      db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      db.connect((err) => {
        if (err) {
          console.log("DB not ready, retrying in 3 sec...");
          setTimeout(tryConnect, 3000);
        } else {
          isConnected = true; // ✅ mark connected
          console.log("MySQL Connected");
          resolve();
        }
      });
    };

    tryConnect();
  });
}

module.exports = { db: () => db, connectDB };