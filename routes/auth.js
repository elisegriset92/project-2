const express = require('express');
const passport = require('passport');
const authRoutes = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

authRoutes.get('/login', (req, res, next) => {
  res.render('auth/login', {message: req.flash('error')});
});

authRoutes.get('/loading', (req, res, next) => {
  res.render('auth/loading');
});

authRoutes.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/loading',
    failureRedirect: '/auth/login',
    failureFlash: true,
    passReqToCallback: true,
  })
);

authRoutes.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  if (email === '' || password === '') {
    res.render('auth/signup', {message: 'Indicate email and password'});
    return;
  }

  User.findOne({email}, 'email', (err, user) => {
    if (user !== null) {
      res.render('auth/signup', {message: 'The email already exists'});
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      lastName,
      firstName,
    });

    newUser.save(err => {
      if (err) {
        res.render('auth/signup', {message: 'Something went wrong'});
      } else {
        res.redirect('/');
      }
    });
  });
});

authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.render('auth/logout');
});

module.exports = authRoutes;
