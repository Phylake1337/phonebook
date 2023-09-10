const Filter = ({filter, setFilter}) => {
    return (
        <div>
            Filter numbers shown by name: <input value={filter} onChange={({ target }) => setFilter(target.value)}/>                                                                
        </div>
    )
}

export default Filter

