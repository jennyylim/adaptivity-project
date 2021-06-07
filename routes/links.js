const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get('/', (req, res) => res.render("index", {isLoggedIn: req.user}));

router.get('/graph2', (req, res) => res.render("graph2"));

router.get("/error", (req, res) => res.render("404"));

router.get("/job", (req, res) => res.render("job"));

router.get('/andrew', (req, res) => res.render('loginpage+'));

//to change after testing to official links, and add in authentications

router.get("/fed", (req, res) => res.render("frontenddeveloper", { title: 'Front End developer', isLoggedIn: req.user}));
// router.get("/uiux", (req, res) => res.render(""));
//product manager
// router.get("/pm", (req, res) => res.render(""));
//full stack
// router.get("/fsd", (req, res) => res.render(""));
// data engineer
// router.get("/de", (req, res) => res.render(""));

module.exports = router;