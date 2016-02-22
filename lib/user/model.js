'use strict';
const mongoose = require('mongoose');

const User = mongoose.model('Users', {
  email: String
});

module.exports = User;