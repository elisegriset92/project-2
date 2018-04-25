const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('/map/home-page');
  }
  res.render('index');
});

module.exports = router;
