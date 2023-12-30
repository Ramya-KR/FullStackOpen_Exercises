import { useState } from 'react'

const AddBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const handleAdd = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    event.target.reset()
  }
  return (
    <div>
      <h1>create new blog</h1>
      <form onSubmit={handleAdd}>
        <div>
                    title
          <input type='text' name='title' placeholder='title' onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </div>
        <div>
                    author
          <input type='text' name='author' placeholder='author' onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </div>
        <div>
                    url
          <input type='text' name='url' placeholder='url' onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlog