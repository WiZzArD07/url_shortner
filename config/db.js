const mysql = require("mysql2");

let db;

function connectDB() {
  return new Promise((resolve, reject) => {

    const tryConnect = () => {

      db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
      });

      db.getConnection((err, connection) => {
        if (err) {
          console.log("DB not ready, retrying in 3 sec...");
          setTimeout(tryConnect, 3000);
        } else {
          console.log("MySQL Connected");
          connection.release();
          resolve();
        }
      });
    };

    tryConnect();
  });
}

module.exports = { db: () => db, connectDB };