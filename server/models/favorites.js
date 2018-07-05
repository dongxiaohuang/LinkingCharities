const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
     user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
     },
     favorites: {
          type: Schema.Types.ObjectId,
          ref: 'Charity'
     }
})
module.exports = mongoose.model('Favorite', favoriteSchema);
