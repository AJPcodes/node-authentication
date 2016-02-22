"use strict";

const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('Server running on ', PORT)
})