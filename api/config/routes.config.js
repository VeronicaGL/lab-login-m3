const express = require("express");
const router = express.Router();
const User = require("../models/user.models")
const users = require ("../controllers/users.controller")
const secure = require ("../middlewares/secure.mid")
const session = require ("../config/session.config")

router.get("/patata", secure.isAuthenticated, (req, res) => {
  res.json({ message: "Patata muy buena", user: req.user.email });
});

router.post("/user", users.create)
router.post ("/login", users.login)


module.exports = router;
