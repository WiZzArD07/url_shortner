const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.post("/shorten", urlController.shorten);
router.get("/:code", urlController.redirect);
router.get("/stats/:code", urlController.stats);

module.exports = router;