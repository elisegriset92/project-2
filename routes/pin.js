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
  '/add-pin/:placeId',
  upload.single('blahUpload'),
  (req, res, next) => {
    const {username, comment, userId} = req.body;
    const {originalname, secure_url} = req.file;
    const place = req.params.placeId;

    Pin.create({
      username,
      userId,
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
  Pin.find({place: 'req.params.placeId'});

  res.render('pin/view-pin');
});

// DELETE

module.exports = router;
