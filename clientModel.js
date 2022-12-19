
const { model, Schema } = require('mongoose')



const WorkClientSchema = new Schema({
    
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emailAddress: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    contractor: String,
    invoicePaid: Boolean,
    clientImage: String,
    notes: String



})


module.exports = model("client", WorkClientSchema);