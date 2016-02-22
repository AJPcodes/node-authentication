const express = require('express');
const router = express.Router();
const User = require('./model.js');

router.get('/', (req, res) => {
  res.redirect('login');
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
    console.log(user);
    if (user) {
    req.session.user = user;
    res.redirect('/home');
    }
    res.render('/login');
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {

  if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.emaul}, (err, user) => {
      if (err) throw err;

      if (user) {
        res.redirect('/login');
      } User.create(req.body, (err, user) => {
        res.redirect('/login');

      })

    })

    res.redirect('/login');
  } else {
    res.render('register', {
      email: req.body.email,
      message: "Your password inputs don't match!"
    });
  }

});

module.exports = router;