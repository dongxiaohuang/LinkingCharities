const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCharitySchema = new Schema({
    regno : { type: Number},
    coyno : { type: Number},
    trustees : { type:String},
    fyend : { type: Number},
    welsh : { type:String},
    incomedate : { type:String},
    income : { type: Number},
    grouptype : { type:String},
    email : { type:String},
    web : { type:String}
});
let UKCharities = mongoose.model('UK_Charity', mainCharitySchema);
module.exports = UKCharities;
