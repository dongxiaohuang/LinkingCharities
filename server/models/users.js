const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
     firstname: {
          type: String,
     },
     lastname: {
          type: String,
     },
     country: {
          type: String,
     },
     profile: {
          type: String,
          default: 'https://linkingcharitystorage.blob.core.windows.net/userprofile/defaultuserpic.png'
     },
     type:{
          type: String,
          default:'Donator'
     },
     facebookId: String,
     blobName:String
});

//// it will automatically add username and salt-encrypted psw for model
// provide authenticate() as a local strategy
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
