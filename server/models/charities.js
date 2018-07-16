const mongoose = require('mongoose');
const  mongooseAlgolia = require('mongoose-algolia');
const config = require('../config');
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
     //TODO: change it into ObjectId
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

//TODO: config to store keys
charitySchema.plugin(mongooseAlgolia, {
     appId: config.algolia.appId,
     apiKey: config.algolia.apiKey,
     indexName: config.algolia.indexName,
     selector: '_id name location city labels', //which you would like to asyn with algolia
     // populate: {},
     // defaults: {},
     // mappings: {},
     // virtuals: {},
     debug: true
});

let Charities = mongoose.model('Charity', charitySchema);
Charities.SyncToAlgolia();
Charities.SetAlgoliaSettings({
     searchableAttributes:['name', 'location','rating']
})


module.exports = Charities;
