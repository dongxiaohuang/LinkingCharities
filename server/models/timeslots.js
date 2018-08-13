const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeslotSchema = new Schema({
     date: {
          "year": Number,
          "month": Number,
          "day": Number
     },
     period: {
          start: {
               "hour": Number,
               "minute": Number
          },
          end: {
               "hour": Number,
               "minute": Number
          },
          duration: {
               type: String,
               required: true
          }
     },
     requiredNumber: {
          type: Number,
          requierd: true
     },
     dateTimestamp: Number,
     registers: [{
          type: Schema.Types.ObjectId,
          ref: 'User',
     }]
}, {
     timestamps: true,
     toObject: {
          virtuals: true
     },
     toJSON: {
          virtuals: true
     }
});

timeslotSchema
     .virtual('registers_no')
     .get(function() {
          // console.log(this.registers)
          return this.registers.length;
     })

let Timeslots = mongoose.model('Timeslot', timeslotSchema);
module.exports = Timeslots;
