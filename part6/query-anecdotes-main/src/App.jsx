import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSucess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = anecdote => {
    updateVoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          notificationDispatch({
            type: 'SHOW',
            payload: `You voted: "${anecdote.content}"`,
          })
          setTimeout(() => {
            notificationDispatch({ type: 'HIDE' })
          }, 5000)
        },
      }
    )
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      refetchOnWindowFocus: false,
      retry: 1
    }
  )
  const anecdotes = result.data

  if (result.isLoading || result.isPending) {
    return (<div> Data is loading.....</div>)
  }

  if (result.isError) {
    return (<div> anecdote service not available due to problems in server </div>)
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
