const Persons = ({ persons, filter, deleteEntry, setPersons }) => {
  if (filter.length === 0) {
    return (persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}  <button onClick={() => {
          window.confirm(`Delete ${person.name}?`)
            ? deleteEntry(person.id)
              .then(setPersons((people) => people.filter((p)=> p.id !== person.id))) 
              : console.log("cancelled delete")
        }}>delete</button>
      </div>
    )))
  } else {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter))
    console.log(filteredPersons)
    return (filteredPersons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}  <button onClick={() => deleteEntry(person.id, person.name)}>delete</button>
      </div>)))
  }
}

export default Persons