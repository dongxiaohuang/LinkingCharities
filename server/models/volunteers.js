const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeslotSchema = new Schema({
     date: Date,
     period:{
          start:String,
          end:String
     },
     requiredNumber:{
          type: Number,
          requierd:true
     }
});

const volunteerSchema = new Schema({
     timeslots:[timeslotSchema],
     name: {
          type: String,
          required:true
     },
     location:{
          type:String,
          requierd:true
     },
     pay:{
          type: String,
          required: true
     },
     duration:{
          type: String,
          required: true
     },
     description:{
          type: String,
          required: true
     },
     charity:{
          type: Schema.Types.ObjectId,
          ref: 'Charity',
          requierd:true
     },


})

let Volunteers = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteers;
