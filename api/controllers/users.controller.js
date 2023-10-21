const User = require("../models/user.models")
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => res.status(400).json(error));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        return user.checkPassword(password).then((match) => {
          if (!match) {
            res.status(401).json({ message: 'Invalid credentials' });
          } else {
            res.cookie('userId', user._id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            res.status(200).json({ message: 'Login successful' });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });

    })
}