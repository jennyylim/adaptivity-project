const express = require("express");
const router = express.Router();

router.get('/', (req, res) => res.render("recommends"));

router.get("/error", (req, res) => res.render("404"));

router.get("/job", (req, res) => res.render("job"));

module.exports = router;