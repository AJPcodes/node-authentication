"use strict";

const path = require('path')
const express = require('express')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';
const PORT = process.env.PORT || 3000;
const app = express();
const userRoutes = require('./lib/user/routes.js');
const bcrypt = require('bcrypt');

app.locals.user = {email: 'Guest'};

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
}));

app.use((req, res, next) => {
  app.locals.user = req.session.user || {email: 'Guest'};
  req.session.visits = req.session.visits || {};
  req.session.visits[req.url] = req.session.visits[req.url] || 0;
  req.session.visits[req.url]++
  next();
});


app.use(userRoutes);
app.use(express.static(path.join(__dirname, 'www')));



mongoose.connect('mongodb://localhost:27017/nodeauth', (err) => {
  if (err) throw err;
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('Server running on ', PORT)
  })
})