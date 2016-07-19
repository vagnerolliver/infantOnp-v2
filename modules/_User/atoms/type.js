'use strict';
 
const AtomName = 'Type';

module.exports = {
  type: String
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: true
}
