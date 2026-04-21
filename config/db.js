const mysql = require("mysql2");

let db;

function connectDB() {
  return new Promise((resolve, reject) => {

    const tryConnect = () => {

      //  create NEW connection each time
      db = mysql.createConnection({
        host: process.env.DB_HOST || "db",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "url_shortener",
      });

      db.connect((err) => {
        if (err) {
          console.log("DB not ready, retrying in 3 sec...");
          setTimeout(tryConnect, 3000);
        } else {
          console.log("MySQL Connected");
          resolve();
        }
      });
    };

    tryConnect();
  });
}

module.exports = { db: () => db, connectDB };