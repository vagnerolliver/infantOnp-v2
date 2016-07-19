const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const generateHash = require('../quarks/quark-generateHash.js')
const isValidPassword = require('../quarks/quark-isValidPassword.js')
const type = require('../atoms/type')

const local = require('./molecule-local')
const facebook = require('./molecule-facebook')
const github = require('./molecule-github')
const google = require('./molecule-google')
const twitter = require('./molecule-twitter')

const Structure = {
	type,
  local,
  facebook,
  twitter,
  google,
  github
}
const Molecule = mongoose.Schema(Structure);

Molecule.methods.generateHash = generateHash

Molecule.methods.validPassword = function(password) {
    // return isValidPassword(password, this.local)
    return isValidPassword(password, local.this)
};

module.exports = Molecule;