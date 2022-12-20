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
  console.log(event.queryStringParameters.invoicePaid)
  

  let clients = ''
  if (event.queryStringParameters.invoicePaid !== 'all') {
    clients = await WorkClientSchema.find(event.queryStringParameters)
  }
  if (event.queryStringParameters.invoicePaid === 'all') {
    clients = await WorkClientSchema.find()
  }
  console.log(clients)
  return {
    statusCode: 200,
    body: JSON.stringify(clients),
  }
}

module.exports = { handler }
