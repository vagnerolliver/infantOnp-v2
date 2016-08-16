'use strict';

const AtomName = 'Link';

module.exports = {
  type: String
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: false
}
