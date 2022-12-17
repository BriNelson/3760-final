// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const mongoose = require('mongoose')
const uri = "mongodb+srv://3727137271:admin@cluster0.olv4a.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(
  uri,
  {
    useNewUrlParser: true
  }
)
  .then(e => console.log('ready'))
  .catch(console.error)


// import pkg from 'mongoose';
const { model, Schema } = require('mongoose')



const WorkClientSchema = new Schema({
    
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number,
    contractor: String,
    notes: String



})


let WorkClient = model("client", WorkClientSchema);

const handler = async (event) => {
 
  const test = "test"
  const clientSave = new WorkClient({
    firstName: test,
    lastName: test,
    phoneNumber: test,
    address: test,
    city: test,
    state: test,
    zipCode: 12,
    contractor: test,
    notes: test

  })
  clientSave.save().then((result) => { console.log(result) })
  return {
    statusCode: 200
  }
}

module.exports = { handler }

