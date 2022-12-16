import pkg from 'mongoose';
const { model, Schema } = pkg;



const Client = new Schema({
    
    title: String,
    author: String,
    key: String,
    haveRead: Boolean,
    wantRead: Boolean,



})


export default model("bookSchema", bookSchema);