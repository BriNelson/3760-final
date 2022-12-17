// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const mongoose = require('mongoose')
const uri = "mongodb+srv://3727137271:admin@cluster0.olv4a.mongodb.net/?retryWrites=true&w=majority";
const WorkClientSchema = require('../../../clientModel')

mongoose.connect(
  uri,
  {
    useNewUrlParser: true
  }
)
  .then(e => console.log('ready'))
  .catch(console.error)


// import pkg from 'mongoose';
// const { model, Schema } = require('mongoose')



// const WorkClientSchema = new Schema({
    
//     firstName: String,
//     lastName: String,
//     phoneNumber: String,
//     address: String,
//     city: String,
//     state: String,
//     zipCode: Number,
//     contractor: String,
//     notes: String



// })


// let WorkClient = model("client", WorkClientSchema);

const handler = async (event) => {
  const newData = JSON.parse(event.body)
  const test = "test"
  const clientSave = new WorkClientSchema({
    firstName: newData.firstName,
    lastName: newData.lastName,
    phoneNumber: newData.phoneNumber,
    address: newData.address,
    city: newData.city,
    state: newData.state,
    zipCode: newData.zipCode,
    contractor: newData.contractor,
    notes: newData.notes

  })
  clientSave.save().then((result) => { console.log(result) })
  return {
    statusCode: 200
  }
}

module.exports = { handler }

