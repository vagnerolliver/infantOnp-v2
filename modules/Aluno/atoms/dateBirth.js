'use strict';
 
const AtomName = 'DateBirth';

module.exports = {
  type: Date
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: true
}
