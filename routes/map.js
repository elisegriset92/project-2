const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET map page - home page */

router.get('/map/home-page', (req, res, next) => {
  if (!req.user) {
    // res.flash('error', 'You must be logged in to see that');
    res.redirect('/auth/login');
  }
  res.render('map/home-page');
});

module.exports = router;
