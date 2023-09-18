const Persons = ({ persons, filter }) => {
    if (filter.length === 0) {
      return (persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>))
    } else {
      const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter))
      console.log(filteredPersons)
      return (filteredPersons.map((person) => <div key={person.id}>{person.name} {person.number}</div>))
    }
  }

  export default Persons