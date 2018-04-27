const express = require('express');
const router = express.Router();

const Place = require('../models/Place');

/* GET place page */
router.get('/place/add', (req, res, next) => {
  res.render('place');
});

// ADD A PIN FROM THE SEACH BAR

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

// test 1

// if (!Place.find({name: req.body.name})) {
//   Place.create({name, description, location})
//     .then(() => {
//       res.redirect('/map/home-page');
//     })
//     .catch(err => {
//       next(err);
//     });
//   return;
// } else {
//   res.redirect('/map/home-page');
// }

//  test 2

// if (Place.find({name: req.body.name})) {
//   res.redirect('/map/home-page');
//   return;
// } else {
//   Place.create({name, description, location})
//     .then(() => {
//       res.redirect('/map/home-page');
//     })
//     .catch(err => {
//       next(err);
//     });
// }

//  test 3

// if (name) {
//   res.redirect('/map/home-page');
//   return;
// } else {
//   Place.create({name, description, location})
//     .then(() => {
//       res.redirect('/map/home-page');
//     })
//     .catch(err => {
//       next(err);
//     });
// }

// test 4

// if (!name) {
// Place.create({name, description, location})
//     .then(() => {
//       res.redirect('/map/home-page');
//     })
//     .catch(err => {
//       next(err);
//     });
//   return;
// } else {
//   res.redirect('/map/home-page')
//
// }

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
