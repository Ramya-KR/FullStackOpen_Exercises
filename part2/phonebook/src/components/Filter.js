const Filter = ({ handleFilter }) => {
    return (
      <form id="searchForm">
        filter shown with <input type='search' id='searchName' onChange={handleFilter} />
      </form>
    )
  
  }

  export default Filter