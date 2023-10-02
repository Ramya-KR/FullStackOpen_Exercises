import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import FilteredCountries from './components/FilteredCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [temp, setTemp] = useState({})

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => { setCountries(countries) })
  }, [])


  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
    setSelectedCountry('')
  }

  return (
    <div>
      <form id="searchForm">
        find countries <input type='search' id='searchName' onChange={handleFilter} />
      </form>
      <FilteredCountries filter={filter} countries={countries} setShow={setShow} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} temp={temp} setTemp={setTemp} />
    </div>
  )

}

export default App