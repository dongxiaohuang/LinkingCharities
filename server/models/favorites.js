const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
     user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          requierd: true
     },
     charities: [{
          type: Schema.Types.ObjectId,
          ref: 'Charity',
          requierd:true
     }]
},{
     timestamps:true
})
module.exports = mongoose.model('Favorite', favoriteSchema);
