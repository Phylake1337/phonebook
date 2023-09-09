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
    Person.find({})
    .then(notes => {response.json(notes)})
  })

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(savedperson => {response.json(savedperson)})
})


app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})