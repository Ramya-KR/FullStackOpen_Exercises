import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(presentPersons => { setPersons(presentPersons) })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name.toLowerCase())
    if (names.includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to the phonebook,replace old number with new number?`)) {
        const person = persons.find(p => p.name === newName)
        const changedNumber = { ...person, number: newNumber }
        personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewNumber('')
            setNewName('')
          })
      } else {
        setNewNumber('')
        setNewName('')
      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewNumber('')
          setNewName('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} setPersons={setPersons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteEntry={personService.deleteEntry} setPersons={setPersons} />
    </div>
  )
}

export default App