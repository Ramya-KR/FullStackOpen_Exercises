const Persons = ({ persons, filter,deleteEntry }) => {
  if (filter.length === 0) {
    return (persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}  <button onClick={() => deleteEntry(person.id,person.name)}>delete</button>
      </div>
    )))
  } else {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter))
    console.log(filteredPersons)
    return (filteredPersons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}  <button onClick={() => deleteEntry(person.id,person.name)}>delete</button>
      </div>)))
  }
}

export default Persons