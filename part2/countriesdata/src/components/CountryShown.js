import { useEffect } from "react"
import countriesService from "../services/countries"
const CountryShown = ({ countries, country, filter, temp, setTemp }) => {
    const countryToShow = countries.find(c => c.name.common === country)
    //const res = countriesService.getWeatherDetails(countryToShow.name.common)
    useEffect(() => {
        if (countryToShow) {
            countriesService
                .getWeatherDetails(countryToShow.capital)
                .then(res => setTemp(res))
        }
    }, [])
    let url = temp && temp.weather && temp.weather[0] ? `https://openweathermap.org/img/wn/${temp.weather[0].icon}.png` : ''
    return (
        <div>
            {filter.length > 0 ? (
                countryToShow ? (
                    <div>
                        <h1>{countryToShow.name.common}</h1>
                        <div>capital {countryToShow.capital}</div>
                        <div>area {countryToShow.area}</div>
                        <h4>languages:</h4>
                        <ul>{Object.values(countryToShow.languages).map((lang) => <li key={lang}>{lang}</li>)}</ul>
                        <img className="flag" src={countryToShow.flags.png} alt={countryToShow.flags.alt}></img>
                        <h3>Weather in {countryToShow.capital}</h3>
                        {temp && temp.main && temp.wind && temp.weather && temp.weather[0] ? <div>
                            <div>temperature {temp.main.temp} Celsius</div>
                            <img src={url} alt={temp.weather[0].description}></img>
                            <div>wind {temp.wind.speed} m/s</div></div> : 'data loading..'}
                    </div>) : ''
            ) : ''
            }
        </div>

    )
}

export default CountryShown