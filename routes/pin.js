const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET pin page */

router.get('/edit-pin', (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  res.render('pin/view-pin');
});

router.get('/views/pin/add-pin', (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  res.render('pin/add-pin');
});

// DELETE

module.exports = router;
