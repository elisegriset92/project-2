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

// DELETE

module.exports = router;
