import CountryShown from "./CountryShown"

const FilteredCountries = ({ filter, countries, setShow, selectedCountry, setSelectedCountry, temp, setTemp }) => {
    const names = countries.map((country) => country.name.common)
    const countriesFiltered = names.filter((n) => n.toLowerCase().includes(filter.toLowerCase()))
    if (countriesFiltered.length !== 0 && filter !== '' && countriesFiltered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countriesFiltered.length <= 10 && countriesFiltered.length > 1) {
        return (
            <div>
                {countriesFiltered.map((c) => (
                    <div key={c}>{c} <button onClick={() => {
                        setShow(1)
                        setSelectedCountry(c)
                    }}>show</button>
                    </div>
                ))}
                <CountryShown countries={countries} country={selectedCountry} filter={filter} temp={temp} setTemp={setTemp} />
            </div>
        )
    } else {
        return (
            <CountryShown countries={countries} country={countriesFiltered[0]} filter={filter} temp={temp} setTemp={setTemp} />
        )
    }

}

export default FilteredCountries