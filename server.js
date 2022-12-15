const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://3727137271:4N5usueK6KJz2R@cluster0.olv4a.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        userUnifiedTopology: true
    }
)
// model 26:43
