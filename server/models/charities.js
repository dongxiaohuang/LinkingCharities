const mongoose = require('mongoose');
const mongooseAlgolia = require('mongoose-algolia');
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
     ccn:{
          type: Number,
          default:''
     },
     rbody:{
          type: String,
          default:''
     },
     rno:{
          type:Number,
          default:''
     },
     name: {
          type: String,
          required: true,
          unique: true
     },
     tel:{
          type: Number, //TODO:
          required: true
     },
     web:{
          type: String,
          default:''
     },
     email:{
          type: String,
          required: true
     },
     //TODO: change it into ObjectId
     categories: [{
          type: Schema.Types.ObjectId,
          ref: 'Category',
          requierd:true
     }],
     image: {
          type: String,
          required:true
          // default: ''
     },
     info: {
          type: String,
          required: true
     },
     details:{
          type: String,
          required:true
     },
     postcode:{
          type: String,
          required:true
     },
     country: {
          type: String,
          requierd: true
     },
     state:{
          type:String,
          default: ''
     },
     city: {
          type: String,
          required: true
     },
     address: {
          type: String,
          required: true
     },
     comments: [commentSchema] // TODO: changed to comments TypeID
     ,
     card:{
          type: Schema.Types.ObjectId,
          ref:'PaymentDtail',
          required:true
     }}
, {
     timestamps: true,
     toObject: {
          virtuals: true
     },
     toJSON: {
          virtuals: true
     }
});

charitySchema
     .virtual('averageRating')
     .get(function(){ // cannot use arrow function
          var rating = 0;
          if (this.comments.length == 0)
               {rating = 0}
          else {
               this.comments.map((comment) => {
                    rating += comment.rating;
               });
               rating /= this.comments.length;
          }
          return rating;
     });

//TODO: config to store keys
charitySchema.plugin(mongooseAlgolia, {
     appId: config.algolia.appId,
     apiKey: config.algolia.apiKey,
     indexName: config.algolia.indexName,
     selector: '_id name location city labels image comments', //which you would like to asyn with algolia
     // populate: {},
     // defaults: {},
     // mappings: {},
     // virtuals: {
     //      averageRating: function(doc){
     //           var rating = 0;
     //           if (doc.comments.length == 0)
     //                {rating = 0}
     //           else {
     //                doc.comments.map((comment) => {
     //                     rating += comment.rating;
     //                });
     //                rating /= doc.comments.length;
     //           }
     //           return rating;
     //      }
     // },
     debug: true
});

let Charities = mongoose.model('Charity', charitySchema);
Charities.SyncToAlgolia();
Charities.SetAlgoliaSettings({
     searchableAttributes: ['name', 'location', 'rating']
})


module.exports = Charities;
