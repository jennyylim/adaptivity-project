const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get('/', (req, res) => res.render("index", { title: 'Index', isLoggedIn: req.user }));

router.get("/ai-recommends", ensureAuthenticated, (req, res) => res.render("ai-recommends",
    {title: 'AI-Recommends', isLoggedIn: req.user }));

router.get("/error", (req, res) => res.render('404', { title: 'Error', isLoggedIn: req.user }));

//to change after testing to official links, and add in authentications

router.get("/frontend-developer", (req, res) =>
    res.render("frontenddeveloper", {
        title: "Front End developer",
        isLoggedIn: req.user,
    })
);

router.get("/uiux-designer", (req, res) =>
    res.render("uiux-designer", {
        title: "UI/UX Designer",
        isLoggedIn: req.user,
    })
);
//product manager
router.get("/product-manager", (req, res) => res.render("product-manager", { title: 'Product Manager', isLoggedIn: req.user }));
//full stack

// data engineer
router.get("/data-engineer", (req, res) =>
    res.render("data-engineer", {
        title: "Data Engineer",
        isLoggedIn: req.user,
    })
);

router.get("/fullstack-developer", (req, res) =>
    res.render("fullstack-dev", {
        title: "Full Stack Developer",
        isLoggedIn: req.user,
    })
);

module.exports = router;