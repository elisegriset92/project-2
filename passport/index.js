const passport = require('passport');

require('./serializers');
require('./localStrategy');

function passportSetup(app) {
  //  add properties & methods to the "req" object in routes
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    //  make "req.user" accesible inside hbs file as "blahUser"
    res.locals.blahUser = req.user;
    next();
  });
}

module.exports = passportSetup;
