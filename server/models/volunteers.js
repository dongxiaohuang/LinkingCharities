const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeslotSchema = new Schema({
     date: Date,
     period:{
          start:
               { "hour": Number, "minute": Number }
          ,
          end:{ "hour": Number, "minute": Number }
          ,
          duration:{
               type: String,
               required: true
          }
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
          default:''
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
},{
     timestamps:true
})

let Volunteers = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteers;
