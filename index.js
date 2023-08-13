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

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
      response.json(notes)
    })
  })

app.post('/api/persons', (request, response) => {

    const body = request.body

    console.log(body)

    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedperson => {
        response.json(savedperson)
    })
})


app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

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