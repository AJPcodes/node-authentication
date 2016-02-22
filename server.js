"use strict";

const express = require('express')

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('Server running on ', PORT)
})