const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get('/', (req, res) => res.render("index", { title: 'Index', isLoggedIn: req.user }));

router.get("/ai-recommends", ensureAuthenticated, (req, res) => res.render("ai-recommends",
    {title: 'AI-Recommends', isLoggedIn: req.user }));

router.get("/error", (req, res) => res.render('404', { title: 'Error', isLoggedIn: req.user }));

router.get("/job", (req, res) => res.render("job"));

router.get("/andrew", (req, res) => res.render("loginpage+"));

//to change after testing to official links, and add in authentications

router.get("/fed", (req, res) =>
    res.render("frontenddeveloper", {
        title: "Front End developer",
        isLoggedIn: req.user,
    })
);

router.get("/uiux", (req, res) =>
    res.render("uiux-designer", {
        title: "UI/UX Designer",
        isLoggedIn: req.user,
    })
);
//product manager
router.get("/pm", (req, res) => res.render("product-manager", { title: 'Product Manager', isLoggedIn: req.user }));
//full stack

// data engineer
router.get("/de", (req, res) =>
    res.render("data-engineer", {
        title: "Data Engineer",
        isLoggedIn: req.user,
    })
);

router.get("/fsd", (req, res) =>
    res.render("fullstack-dev", {
        title: "Full Stack Developer",
        isLoggedIn: req.user,
    })
);
module.exports = router;