const express = require('express');
const router = express.Router();

/* GET pin page */

router.get('', (req, res, next) => {
  if (!req.user) {
    // res.flash('error', 'You must be logged in to see that');
    res.redirect('/auth/login');
  }
  res.render('pin/view-pin');
});

// DELETE

module.exports = router;
