import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const response = await axios.post(baseUrl, { content: content, votes: 0 })
    return response.data
}

const update = async (id) => {
    const content = await axios.get(`${baseUrl}/${id}`)
    const anecdote = content.data
    const anecdoteToChange = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, anecdoteToChange)
    return response.data
}

export default {
    getAll,
    create,
    update,
}