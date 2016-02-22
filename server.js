"use strict";

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const app = express();
const session = require('express-session');
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www')));
app.use(session({
  secret: SESSION_SECRET
}));

app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.redirect('login');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  res.redirect('/home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {

  if (req.body.password === req.body.verify) {
    res.redirect('/login');
  } else {
    res.render('register', {
      email: req.body.email,
      message: "Your password inputs don't match!"
    });
  }

});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('Server running on ', PORT)
})