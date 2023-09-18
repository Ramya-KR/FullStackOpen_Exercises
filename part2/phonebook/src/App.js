import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => 
      setPersons(response.data))
  },[])

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
      window.alert(`${newName} is already added to the phonebook`)
      setNewNumber('')
      setNewName('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: names.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewNumber('')
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} setPersons={setPersons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App