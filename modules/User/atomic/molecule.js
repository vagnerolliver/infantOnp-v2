const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const type = require('../atoms/type')
const Schema = mongoose.Schema
const Molecule = {
	type,
  require('./molecule-local'),
  facebook: require('./molecule-facebook'),
  twitter: require('./molecule-twitter'),
  google: require('./molecule-google'),
  github: require('./molecule-github')
}

//define the schema for our user model
const userSchema = mongoose.Schema(Molecule)

//methods ========================
//generation a hash
const generateHash = require('./quarks/quark-generateHash')
userSchema.methods.generateHash = generateHash

// checking if a password is valid
const validPassword = require('./quarks/quark-isValidPassword')
userSchema.methods.validPassword = function(password) {
  console.log('validPassword', validPassword)
  return validPassword(password, this)
};

module.exports = userSchema