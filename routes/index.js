require('dotenv').config()
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const midleware = require('../middleware/helper')

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", (req, res) => {
  const { username } = req.body;
  const user = { name: username }
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  });
  res.redirect('/home')
});

router.get("/home", midleware.authenticationMiddleware, (req, res) => {
  res.render("home", { user: req.user });
});

router.get('/logout', midleware.authenticationMiddleware, (req, res) => {
  console.log("Evide ethi")
  res.clearCookie("token");
  res.redirect("/");
})

module.exports = router;
