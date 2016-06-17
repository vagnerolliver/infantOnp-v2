const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Molecule = {
  email: require('./../atoms/email')
, password: require('./../atoms/password')
// , type: require('./../atoms/type')
}
// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
module.exports = new Schema(Molecule);



