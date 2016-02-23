const express = require('express');
const router = express.Router();
const User = require('./model.js');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) throw err;

    if (user) {
      user.authenticate(req.body.password, (err, valid) => {
        if (err) throw err;
        console.log('valid?', valid)
        if (valid) {
          req.session.user = user;
          res.redirect('/home');
        } else {
          res.message = 'Email or password incorrect';
          res.render('login', {message: res.message});
        }
      })
    } else {
      res.message = 'Email or password incorrect';
      res.render('login', {message: res.message});
    }
  });
});

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