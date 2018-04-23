const passport = require('passport');

const User = require('../models/User');

// run the code inside these files
// require('./google-strategy');
// require('./github-strategy');

passport.serializeUser((userDetails, done) => {
  console.log('serialize (save to session)');
  done(null, userDetails._id);
});

passport.deserializeUser((idFromSession, done) => {
  console.log('deserialize (details from session)');
  User.findById(idFromSession)
    .then(userDetails => {
      done(null, userDetails);
    })
    .catch(err => {
      done(err);
    });
});

function passportSetup(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.blahUser = req.user;
    next();
  });
}

module.exports = passportSetup;
