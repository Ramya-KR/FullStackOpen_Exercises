import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { addNotification, removeNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.filter === '' ? state.anecdotes : state.anecdotes.filter(n => n.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const handleVote = (id) => {
        dispatch(vote(id))
        const anecdote = anecdotes.find(n => n.id === id)
        dispatch(addNotification(`You voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(removeNotification());
          }, 5000);

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