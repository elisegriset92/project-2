const express = require('express');
const router = express.Router();

/* GET map page - home page */

router.get('/map/home-page', (req, res, next) => {
  console.log('hahahahah');
  res.render('map/home-page');
});

module.exports = router;
