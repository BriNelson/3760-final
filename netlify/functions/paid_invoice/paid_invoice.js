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
    console.log(event.body)
    let id = event.queryStringParameters._id
    // await WorkClientSchema.deleteOne(deletedItem)


     await WorkClientSchema.findByIdAndUpdate(id,{ invoicePaid: event.body })
//     setTimeout(() => {
//   console.log("Delayed for 1 second.");
// }, "1000")
    return {
      statusCode: 200,
      
      
    }
  }
  module.exports = { handler }