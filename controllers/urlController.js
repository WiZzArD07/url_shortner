const db = require("../config/db");
const urlService = require("../services/urlService");

exports.shorten = async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }
    
    const code = await urlService.createShortUrl(longUrl);
    res.json({ shortUrl: `http://localhost:3000/${code}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.redirect = async (req, res) => {
  try {
    const { code } = req.params;
    const longUrl = await urlService.getLongUrl(code);

    if (!longUrl) return res.status(404).send("Not found");

    res.redirect(longUrl);
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.stats = (req, res) => {
  const { code } = req.params;

  const query = "SELECT long_url, clicks FROM urls WHERE short_code=?";

  db.query(query, [code], (err, results) => {
    if (err) return res.status(500).send("Error");
    if (results.length === 0) return res.status(404).send("Not found");

    res.json(results[0]);
  });
};