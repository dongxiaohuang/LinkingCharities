const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extractCharitySchema = new Schema(
{
    regno : { type: String},
    subno :{ type: Number},
    name : { type:String},
    orgtype : { type:String},
    gd : { type:String},
    aob : { type:String},
    aob_defined : { type:String},
    nhs : { type:String},
    ha_no : { type:String},
    corr : { type:String},
    add1 : { type:String},
    add2 : { type:String},
    add3 : { type:String},
    add4 : { type:String},
    add5 : { type:String},
    postcode : { type:String},
    phone : { type:String},
    fax : { type:String}
});
let extractCharities = mongoose.model('All_Charity', extractCharitySchema);
module.exports = extractCharities;
