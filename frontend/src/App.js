import { useState, useEffect } from 'react'

import FilteredPersons from './components/Persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState({content:'', type:null})


  const handleNameChange= (event) => setNewName(event.target.value)
  const handleNumberChange= (event) => setNewNumber(event.target.value)
  const handleNameFilterChange= (event) => setNameFilter(event.target.value)

  const displayNotification= (msg, notifyType) => {
    setMessage({content:msg, type:notifyType})
    setTimeout(() => setMessage({content:'', type:null}), 5000)
  }

  const handleDeletation= (idToRemove) => {
    const personToRemove = persons.filter(person => person.id === idToRemove)[0]
    const ok = window.confirm(`Delete ${personToRemove.name}?`)
    if (ok){
      phonebookService
      .remove(idToRemove)
      .then(setPersons(persons.filter(person => person.id !== idToRemove)))
      .catch(error => {
        const errorMsg = `Information about ${personToRemove.name} has already has been removed from server`
        displayNotification(errorMsg, 'error')
      })
    }
  }

  const cleanForm = () => {
    setNewName('')
    setNewNumber('') 
  }

  const updatePerson = (duplicatedPerson,  newPerson) => {
    const ok = window.confirm((`${newName} is already added to phonebook, replace?`))
    if (ok){
      console.log(duplicatedPerson)
      console.log(newPerson)

      const idToUpdate = duplicatedPerson[0].id
      phonebookService
        .update(idToUpdate, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id === idToUpdate? response:person))
          const notifyMsg = `${newPerson.name}'s number is update successfully`
          displayNotification(notifyMsg, 'inform')
        })
      cleanForm()
    }
  }

  const addPerson = (newPerson) => {
    phonebookService
    .create(newPerson)
    .then(addedPerson => {
      setPersons(persons.concat(addedPerson))
      const notifyMsg = `Name '${newPerson.name}' and Number '${newPerson.number}' are just added`
      displayNotification(notifyMsg, 'inform')
    })
  cleanForm()
  }

  const handleSumbition= (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      number: newNumber
    }

    const duplicatedPerson = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    if (newName==='' | newNumber===''){
      alert('Cannot add empty Name/Number')

    }else if(duplicatedPerson.length!==0){
      updatePerson(duplicatedPerson, newPerson)

    }else{               
      addPerson(newPerson)
    }
  }

  const effect = () => {
    phonebookService
      .getAll()
      .then(initData => {
        setPersons(initData)
      })
  }
  useEffect(effect, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message.content} notifyType={message.type}/>

      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSumbition={handleSumbition}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Phone numbers</h3>

      <FilteredPersons 
      persons={persons} 
      nameFilter={nameFilter} 
      handleDeletation={handleDeletation}
      />

    </div>
  )
}

export default App