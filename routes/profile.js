const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET profile page */

router.get('/edit', (req, res, next) => {
  res.render('profile/edit-profile');
});

// update profile informations

router.post('/auth/edit-profile', (req, res, next) => {
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
module.exports = router;
