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

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }


// if (process.argv.length===3){
//   Person.find({}).then(result => {
//     console.log('Phonebook: ')
//     result.forEach(person => {
//       console.log(`${person.name} ${person.number}`)
//     })
//     mongoose.connection.close()
//   })

// }else{
  
//   const name = process.argv[3]
//   const number = process.argv[4]
//   const person = new Person({name, number})
  
//   person.save().then(result => {
//     console.log(`added ${result.name} number ${result.number} to phonebook`)
//     mongoose.connection.close()
//   })
  
// }