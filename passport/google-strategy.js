const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.google_id,
      clientSecret: process.env.google_secret,
      callbackURL: 'auth/google/success',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      const {id, displayName, emails} = profile;

      User.findOne({googleID: id})
        .then(userDetails => {
          if (userDetails) {
            // if the user exists log them in
            done(null, userDetails);
            return;
          }
          return User.create({
            googleID: id,
            username: displayName,
            email: emails[0].value,
          });
        })
        .then(newUser => {
          done(null, newUser);
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
