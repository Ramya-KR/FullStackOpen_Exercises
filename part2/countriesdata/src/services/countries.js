import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = process.env.REACT_APP_API_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const getWeatherDetails = (name) => {
    const request = axios.get(`${weatherUrl}?q=${name}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}

const countriesService = { getAll, getCountry, getWeatherDetails }

export default countriesService