const express = require('express');
const router = express.Router();

const Place = require('../models/Place');

/* GET place page */
router.get('/place/add', (req, res, next) => {
  res.render('place');
});

router.post('/process-add', (req, res, next) => {
  const {name, description, latitude, longitude} = req.body;

  const location = {
    type: 'Point',
    coordinates: [latitude, longitude],
  };

  Place.create({name, description, location})
    .then(() => {
      res.redirect('/map/home-page');
    })
    .catch(err => {
      next(err);
    });
});

router.get('/place/data', (req, res, next) => {
  Place.find()
    .then(placeFromDb => {
      res.json(placeFromDb);
    })
    .catch(err => {
      next(err);
    });
});

router.get('');

module.exports = router;
