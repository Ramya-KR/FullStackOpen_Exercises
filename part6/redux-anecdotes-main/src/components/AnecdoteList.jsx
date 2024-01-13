import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
//import anecdoteService from '../services/anecdotes'
import { showNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter === '' ? anecdotes : anecdotes.filter(n => n.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const handleVote = async (id) => {
        dispatch(vote(id))
        const anecdote = anecdotes.find(n => n.id === id)
        dispatch(showNotification(`You voted ${anecdote.content}`,5))
    }
    return (
        <div>
            {anecdotes
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList