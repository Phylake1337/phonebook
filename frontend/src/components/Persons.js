const Persons = ({persons, handleDeletation}) =>{
    return (
      <ul>
      {persons.map(person => 
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => handleDeletation(person.id)}> delete </button>
        </li>)}
      </ul>
    )
  }

const FilteredPersons = ({persons, nameFilter, handleDeletation}) => {
    if (nameFilter!=[]) {
      const filterdPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
      return <Persons persons={filterdPersons} handleDeletation={handleDeletation} />
    }else{
      return <Persons persons={persons} handleDeletation={handleDeletation} />
    }
  }

export default FilteredPersons