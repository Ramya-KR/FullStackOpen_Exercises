import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { content: content, votes: 0 },
      {
        onSuccess: () => {
          notificationDispatch({
            type: 'SHOW',
            payload: `Anecdote "${content}" is created`,
          })
          setTimeout(() => {
            notificationDispatch({ type: 'HIDE' })
          }, 5000)
        },
        onError: (error) => {
          console.log(error)
          notificationDispatch({
            type: 'SHOW',
            payload: error.response.data.error
          })
          setTimeout(() => {
            notificationDispatch({ type: 'HIDE' })
          }, 5000)
        },
      }
    )
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
