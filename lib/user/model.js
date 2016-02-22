'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BCRYPT_DIFFICULTY = 11;

const UserSchema = mongoose.Schema({
  email: String,
  password: String
});

UserSchema.methods.authenticate = function (pw, cb) {
  bcrypt.compare(pw, this.password, cb)
};

UserSchema.pre('save', function (next) {
  //reads the password, encrypts it, and replaces it with the hash for storage in the database
  bcrypt.hash(this.password, BCRYPT_DIFFICULTY, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    next();
  });
});


module.exports = mongoose.model('Users', UserSchema);