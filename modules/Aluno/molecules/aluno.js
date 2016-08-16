const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const Molecule = {
  user_id: require('./../atoms/userRef')(Schema)
, name: require('./../atoms/name')
, dateBirth: require('./../atoms/dateBirth')
, turmas: [ require('./../atoms/turmaRef')(Schema) ]
} 

module.exports = new Schema(Molecule); 