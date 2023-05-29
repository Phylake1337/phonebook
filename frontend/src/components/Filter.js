const Filter = ({nameFilter, handleNameFilterChange}) => {
    return (
        <div>
            Filter numbers shown by name: <input value={nameFilter} onChange={handleNameFilterChange}/>
        </div>
    )
}

export default Filter

