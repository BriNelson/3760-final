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




const handler = async (event) => {
  console.log(event.queryStringParameters.invoicePaid)
  
  let clients = ''


   clients = await WorkClientSchema.find(event.queryStringParameters)
 
  console.log(clients)
  return {
    statusCode: 200,
    body: JSON.stringify(clients),
  }
}

module.exports = { handler }
