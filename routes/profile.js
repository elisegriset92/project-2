const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET profile page */

router.get('/edit', (req, res, next) => {
  if (!req.user) {
    // res.flash('error', 'You must be logged in to see that');
    res.redirect('/auth/login');
  }
  res.render('profile/edit-profile');
});

// update profile informations

router.post('/auth/edit-profile', (req, res, next) => {
  if (!req.user) {
    // res.flash('error', 'You must be logged in to see that');
    res.redirect('/auth/login');
  }
  const {firstName, lastName, username, email, password} = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {firstName, lastName, username, email, password},
    {runValidators: true}
  )
    .then(() => {
      res.redirect('/map/home-page');
    })
    .catch(err => {
      next(err);
    });
});


router.get('/about-us', (req, res, next) => {
  res.render('us/about-us')
})
module.exports = router;
