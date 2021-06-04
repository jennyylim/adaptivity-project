const express = require("express");
const router = express.Router();

router.get('/', (req, res) => res.render("product-manager"));

router.get("/error", (req, res) => res.render("404"));

router.get("/job", (req, res) => res.render("job"));

router.get("/fed", (req, res) => res.render("frontenddeveloper"));

router.get('/andrew', (req, res) => res.render('loginpage+'));

module.exports = router;