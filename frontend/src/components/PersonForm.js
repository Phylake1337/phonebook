const PersonForm = ({handleSumbition, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={handleSumbition}>
            <div>
            Name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            Number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit"> Add </button>
            </div>
      </form>
    )
}

export default PersonForm