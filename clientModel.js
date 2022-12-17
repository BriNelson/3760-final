
const { model, Schema } = require('mongoose')



const WorkClientSchema = new Schema({
    
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    contractor: String,
    notes: String



})


module.exports = model("client", WorkClientSchema);