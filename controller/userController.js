const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Job = require("../model/job");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", isLoggedIn: req.user });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", isLoggedIn: req.user });
});

router.get("/recommends", ensureAuthenticated, (req, res) => {
  Job.find()
    .then((result) => {
      res.render("recommends", {
        title: "Jobs Recommendation",
        jobs: result,
        isLoggedIn: req.user,
      });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Error", isLoggedIn: req.user });
    });
});

router.get("/assessment", ensureAuthenticated, (req, res) =>
  res.render("assessment", { title: "Assessment", isLoggedIn: req.user })
);

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.name,
  })
);
//register handle
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];
  //check required fields
  if (!name || !email || !password) {
    errors.push({ msg: "Please fill in all fields", isLoggedIn: req.user });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({
      msg: "Password have to be more than 6 letters",
      isLoggedIn: req.user,
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      title: "Register",
      errors,
      name,
      email,
      password,
      isLoggedIn: req.user,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //user exist
        errors.push({ msg: "Already registered." });
        res.render("register", {
          title: "Register",
          errors,
          name,
          email,
          password,
          isLoggedIn: req.user,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          isLoggedIn: req.user,
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            //set password to hash
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You are registered and can log in.");
                res.redirect("/users/login");
              })
              .catch((err) =>
                res
                  .status(404)
                  .render("404", { title: "Error", isLoggedIn: req.user })
              );
          })
        );
      }
    });
  }
});

//login

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/assessment",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;

// <--- How to potentially setup a link from AI Recommends page to zoom in on respective node --->

// 1. Create a route for each job that will render the "graph2" page (router.get("/product-manager") blah blah res.render("/graph2")).
// 2. Use "connect-flash" to pass an object assigned a unique field specific to the job to the "graph2" page, example: {id: "Product Manager"}.
// 3. Use a function like "onLoad" or try creating a html element like a div and make its id the unique id.
// 4. Use the "onLoad" function to trigger the zoom onto the node. Use an "if/else" to check which job node needs to be zoomed in.
