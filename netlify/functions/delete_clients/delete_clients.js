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
    console.log(event.queryStringParameters)
    let deletedItem = event.queryStringParameters
    await WorkClientSchema.deleteOne(deletedItem)
    return {
      statusCode: 200,
      
    }
  }
  module.exports = { handler }