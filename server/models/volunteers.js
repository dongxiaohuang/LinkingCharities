const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

// const timeslotSchema = new Schema({
//      date: {
//           "year": Number,
//           "month": Number,
//           "day": Number
//      },
//      period: {
//           start: {
//                "hour": Number,
//                "minute": Number
//           },
//           end: {
//                "hour": Number,
//                "minute": Number
//           },
//           duration: {
//                type: String,
//                required: true
//           }
//      },
//      requiredNumber: {
//           type: Number,
//           requierd: true
//      },
//      dateTimestamp: Number,
//      registers: [{
//           type: Schema.Types.ObjectId,
//           ref: 'User',
//      }]
// }, {
//      timestamps: true,
//      toObject: {
//           virtuals: true
//      },
//      toJSON: {
//           virtuals: true
//      }
// });

const volunteerSchema = new Schema({
     timeslots: [{
          type: Schema.Types.ObjectId,
          ref: 'Timeslot',
          requierd:true
     }],
     name: {
          type: String,
          required: true
     },
     location: {
          type: String,
          requierd: true
     },
     pay: {
          type: String,
          default: ''
     },

     description: {
          type: String,
          required: true
     },
     charity: {
          type: Schema.Types.ObjectId,
          ref: 'Charity',
          requierd: true
     },
     principal: {
          type: String,
          default: ''
     },
     restrictions: {
          Type: String,
     },
     study_type: {
          Type: String,
     }
}, {
     timestamps: true,
     toObject: {
          virtuals: true
     },
     toJSON: {
          virtuals: true
     }
})

// timeslotSchema
//      .virtual('registers_no')
//      .get(function() {
//           // console.log(this.registers)
//           return this.registers.length;
//      })

volunteerSchema.plugin(deepPopulate);
let Volunteers = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteers;
