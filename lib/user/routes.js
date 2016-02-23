'use strict';

const express = require('express');
const router = express.Router();
const User = require('./model.js');
const passport = require('passport');

require('./local');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  let message = null;
  if (req.session.messages) {
    message = req.session.messages[0];
  }
  req.session.messages = [];

  res.render('index', {message: message});
});

router.get('/login', (req, res) => {
  let message = null;
  if (req.session.messages) {
    message = req.session.messages[0];
  }
  req.session.messages = [];

  res.render('login', {message: message});
});

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      successMessage: 'Success!',
      failureRedirect: 'login',
      failureMessage: 'Invalid username or password'
    }
  )
);

router.delete('/login', (req, res) => {
  req.session.regenerate(function(err) {
    if (err) throw err;

    res.redirect('/home');
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});


router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) throw err;

      if (user) {
        res.redirect('/login');
      } else {
        User.create(req.body, (err) => {
          if (err) throw err;

          res.redirect('/login');
        });
      }
    });
  } else {
    res.render('register', {
      email: req.body.email,
      message: 'Passwords do not match'
    });
  }
});

module.exports = router;