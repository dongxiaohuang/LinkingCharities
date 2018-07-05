const mongoose = require('mongoose');
const
const Schema = mongoose.Schema;

const commentSchema = new Schema({
     rating: {
          type: Number,
          max: 5,
          min: 1,
          required: true
     },
     author: {
          type: Schema.Types.ObjectId,
          ref: 'User'
     },
     comment: {
          type: String,
          required: true
     }
}, {
      timestamps: true
});

const charitySchema = new Schema({
     name: {
          type: String,
          required: true,
          unique: true
     },
     labels: {
          type: [String],
          required: true
     },
     image: {
          type: String,
          // default: ''
     },
     info: {
          type: String,
          required: true
     },
     location: {
          type: String,
          requierd: true
     },
     city: {
          type: String,
          required: true
     },
     address: {
          type: String,
          required: true
     },
     comments: [commentSchema]
},{
     timestamps: true
});

var Charities = mongoose.model('Charity', charitySchema);

module.exports = Charities;
