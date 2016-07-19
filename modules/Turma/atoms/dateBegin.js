'use strict';

const AtomName = 'DateBegin';

module.exports = {
  type: Date
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: true
}
