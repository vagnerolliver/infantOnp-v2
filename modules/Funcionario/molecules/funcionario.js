const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Molecule = {
  name: require('./../atoms/name')
, dateBegin: require('./../atoms/dateBegin')
, turmas: [ require('./../atoms/turmaRef')(Schema) ]
}

module.exports = new Schema(Molecule);