const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

// // mongo connection
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => console.log('Connected to MongoDB!'))
  .catch(error => console.log('Faild connecting to MongoDB', error.message))


const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{8}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
  })

// modify toJSON method of schema object
PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// setup mongoose model/constructor
const Person = mongoose.model('Person', PersonSchema)

module.exports = Person