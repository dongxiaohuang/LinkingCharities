const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const ratingSchema = new Schema({
     user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          requierd: true
     },
     charity: {
          type: Schema.Types.ObjectId,
          ref: 'Charity',
          requierd:true
     },
     rating: {
          type: Number,
          max: 5,
          min: 1,
          required: true
     }
})

ratingSchema.plugin(deepPopulate);

module.exports = mongoose.model('Rating', ratingSchema);
