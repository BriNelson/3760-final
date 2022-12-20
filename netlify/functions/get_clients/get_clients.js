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
 
  const clients = await WorkClientSchema.find()
  return {
    statusCode: 200,
    body: JSON.stringify(clients),
  }
}

module.exports = { handler }
