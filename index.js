require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use((cors()))
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
const customFormat = ':method :url :status :response-time ms - :body'
app.use(morgan(customFormat))

// let persons = [
//     { 
//       "id": 1,
//       "name": "Ahmed Saied", 
//       "number": "0111 022 7362"
//     },
//     { 
//       "id": 2,
//       "name": "Ali Salem", 
//       "number": "0100 1765 2324"
//     },
//     { 
//       "id": 3,
//       "name": "Asmaa Nasr", 
//       "number": "0121 100 1099"
//     }
// ]
// app.get('/api/persons', (request, response) => {
//     response.json(persons)
// })

app.get('/api/notes', (request, response) => {
    Person.find({}).then(notes => {
      response.json(notes)
    })
  })

// app.get('/api/persons/:id', (request, response) => {
//     const requestId = Number(request.params.id)
//     const person = persons.find(p => p.id === requestId)

//     if (person){
//         response.json(person)
//     }else{
//         response.status(404).end()
//     }
// })

// const infoResponse = `
//     <div> 
//         Phonebook has info for ${persons.length} people 
//     </div>
//     <div> 
//         ${Date()}
//     </div>
//     `

// app.get('/info', (request, response) => {
//     response.send(infoResponse)
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const requestId = Number(request.params.id)
//     persons = persons.filter(p => p.id !== requestId)
//     response.status(204).end()
// })

// const getRandomNum = () => Math.floor(Math.random() * 1000000000)

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     const isDuplicateEntry = persons.find(p => p.name === body.name )
    
//     if (isDuplicateEntry){
//         return response.status(400).json({
//             error: 'Person info is already stored'
//         })
        
//     }else if (body.name!==undefined & body.number!==undefined){
//         const id = getRandomNum()
//         const newPerson = {...body, id:id}
//         persons = persons.concat(newPerson)
//         response.json(newPerson)

//     }else{
//         return response.status(400).json({
//             error: 'The name, or the number is missing'
//         })
//     }

// })

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})