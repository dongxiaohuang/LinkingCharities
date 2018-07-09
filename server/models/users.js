const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
     firstname: {
          type: String,
          default: ''
     },
     lastname: {
          type: String,
          default: ''
     },
     facebookId: String
});

//// it will automatically add username and salt-encrypted psw for model
// provide authenticate() as a local strategy
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);