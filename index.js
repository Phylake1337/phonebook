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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    } 
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(savedPerson => {response.json(savedPerson)})
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => response.status(204).end())
  .catch(erorr => next(erorr))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  const person = {
    name : request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => response.json(updatedPerson))
  .catch(erorr => next(erorr))
})


// handles unknown routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)

//handles error
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted Id'})
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message})
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})