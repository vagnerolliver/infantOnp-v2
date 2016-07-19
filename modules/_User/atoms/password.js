'use strict';
 
const AtomName = 'Password';

module.exports = {
  type: String
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: true
}
