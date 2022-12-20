// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const mongoose = require('mongoose')
const uri = process.env.MONGO_URI;
const WorkClientSchema = require('../../../clientModel')

mongoose.connect(
  uri,
  {
    useNewUrlParser: true
  }
)
  .then(e => console.log('ready'))
  .catch(console.error)



const handler = async (event) => {
  const newData = JSON.parse(event.body)
  const test = "test"
  const clientSave = new WorkClientSchema({
    firstName: newData.firstName,
    lastName: newData.lastName,
    emailAddress: newData.emailAddress,
    phoneNumber: newData.phoneNumber,
    address: newData.address,
    city: newData.city,
    state: newData.state,
    zipCode: newData.zipCode,
    contractor: newData.contractor,
    invoicePaid: newData.invoicePaid,
    clientImage: newData.clientImage,
    notes: newData.notes

  })
  clientSave.save().then((result) => { console.log(result) })
  return {
    statusCode: 200
  }
}

module.exports = { handler }

