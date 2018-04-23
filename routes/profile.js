const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET profile page */

router.get('/edit/:userId/edit', (req, res, next) => {
  User.findById(req.params.userId)
    .then(userDetails => {
      res.locals.userId = req.params.userId;
      res.locals.user = userDetails;
      res.render('profile/edit-profile');
    })
    .catch(err => {
      next(err);
    });
});

// router.post('/process-edit/:bookId', (req, res, next) => {
//   const {title, author, description, rating} = req.body;
//   Book.findByIdAndUpdate(
//     req.params.bookId, //which document to update
//     {title, author, description, rating}, //what toupdate
//     {runValidators: true} //extra settings
//   )
//     .then(() => {
//       res.redirect(`/book/${req.params.bookId}`);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
