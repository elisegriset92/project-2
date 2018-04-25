const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Place = require('../models/Place');
const Pin = require('../models/Pin');

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'more-pin',
});

const upload = multer({storage});

/* GET my pins page */

router.get('/edit-pin', (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  res.render('pin/edit-pin');
});

//  GET add pin page for a specific place

router.get('/pin/:placeId', (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }

  Place.findById(req.params.placeId)
    .then(placeDetails => {
      res.locals.placeId = req.params.placeId;
      res.locals.place = placeDetails;
      // res.send(req.params.placeId);
      res.render('pin/add-pin');
    })
    .catch(err => {
      next(err);
    });
});

router.post(
  '/:userId/add-pin/:placeId',
  upload.single('blahUpload'),
  (req, res, next) => {
    const {username, comment} = req.body;
    const {originalname, secure_url} = req.file;
    const place = req.params.placeId;
    const userId = req.params.userId;
    console.log(userId);

    Pin.create({
      username,
      userId: userId,
      comment,
      imageName: originalname,
      imageUrl: secure_url,
      place: place,
    })
      .then(() => {
        res.redirect('/map/home-page');
      })
      .catch(err => {
        next(err);
      });
  }
);
router.get('/view/pin/:placeId', (req, res, next) => {
  Place.findById(req.params.placeId)
    .then(placeDetails => {
      res.locals.placeId = req.params.placeId;
      res.locals.place = placeDetails;
    })
    .catch(err => {
      next(err);
    });
  Pin.find({place: req.params.placeId})
    .sort({createdAt: -1})
    .populate('place')
    .then(pinsFromDb => {
      res.render('pin/view-pin', {pinList: pinsFromDb});
    })
    .catch(err => {
      next(err);
    });
});

router.get('/edit-pin/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(userDetails => {
      res.locals.userId = req.params.userId;
      res.locals.user = userDetails;
    })
    .catch(err => {
      next(err);
      Pin.find({user: req.params.userId})
        .sort({createdAt: -1})
        .populate('user')
        .then(pinsFromDb => {
          res.render('map/home-page', {pinList: pinsFromDb});
        })
        .catch(err => {
          next(err);
        });
    });
});

// DELETE

router.get('/pin/:pinId/delete', (req, res, next) => {
  Pin.findByIdAndRemove(req.params.pinId)
    .then(() => {
      res.render('map/home-page');
      // res.render(`pin/${req.params.pinId}`);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
