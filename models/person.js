const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

// // mongo connection
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => console.log('Connected to MongoDB!'))
  .catch(error => console.log('Faild connecting to MongoDB', error.message))

// setup mongoose model/constructor
const PersonSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

// modify toJSON methodg of schema object
PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person