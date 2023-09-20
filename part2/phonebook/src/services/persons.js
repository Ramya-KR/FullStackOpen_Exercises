import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (id,name) => {
    if(window.confirm(`Delete ${name}?`)) {
        axios.delete(`${baseUrl}/${id}`).then(response=>response.data)
    }
}

const personService = { getAll, create, deleteEntry }

export default personService
