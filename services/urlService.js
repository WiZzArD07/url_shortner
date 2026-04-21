const { client }  = require("../config/redis");
const { db } = require("../config/db");

exports.getLongUrl = async (shortCode) => {
  try {
    //  increment clicks safely
    db().query(
      "UPDATE urls SET clicks = clicks + 1 WHERE short_code=?",
      [shortCode],
      (err) => {
        if (err) console.error("UPDATE ERROR:", err);
      }
    );

    // check Redis
    let cached;
    try {
      cached = await client().get(shortCode);
    } catch (err) {
      console.error("REDIS ERROR:", err);
    }

    if (cached) {
      console.log("Cache HIT:", shortCode);
      return cached;
    }

    console.log("Cache MISS:", shortCode);

    // fetch from DB
    return new Promise((resolve, reject) => {
      const query = "SELECT long_url FROM urls WHERE short_code=?";

      db().query(query, [shortCode], async (err, results) => {
        if (err) {
          console.error("SELECT ERROR:", err);
          return reject(err);
        }

        if (results.length === 0) {
          console.log("Not found in DB");
          return resolve(null);
        }

        const longUrl = results[0].long_url;

        console.log("Storing in Redis:", shortCode);

        try {
          await client().setEx(shortCode, 3600, longUrl);
        } catch (err) {
          console.error("REDIS SET ERROR:", err);
        }

        resolve(longUrl);
      });
    });

  } catch (err) {
    console.error("SERVICE ERROR:", err);
    throw err;
  }
};

exports.createShortUrl = async (longUrl) => {
  return new Promise((resolve, reject) => {

    // simple short code generator
    const shortCode = Math.random().toString(36).substring(2, 8);

    const query = "INSERT INTO urls (long_url, short_code) VALUES (?, ?)";

    db().query(query, [longUrl, shortCode], (err, result) => {
      if (err) {
        console.error("DB INSERT ERROR:", err);
        return reject(err);
      }

      console.log("Short URL created:", shortCode);
      resolve(shortCode);
    });
  });
};