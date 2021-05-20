const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("login"));

router.get("typeform", (req, res) => {
  res.render("typeform");
});

module.exports = router;
