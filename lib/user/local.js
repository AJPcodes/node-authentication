'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model');
const SUCCESS = {message: 'Successful login'}
const INCORRECT = {message: 'Email or password incorrect'};

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

passport.use(new LocalStrategy ({
  usernameField: 'email'
},
  (email, password, done) => {
  User.findOne({email: email}, (err, user) => {
    if (err) throw err;
    if (user) {
        user.authenticate(password, (err, valid) => {
          if (err) throw err;
          if (valid) {
            done(null, user, SUCCESS);
          } else {
            done(null, null, INCORRECT);
          }
        })
    } else {
      done(null, null, INCORRECT);
    }
    });
  })
);