import { useState } from 'react'

const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  const [view, setView] = useState(0)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const whenLogged = { display: blog.user.username === user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setView(!view)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateLike(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    window.confirm(`Are you sure you want to delete ${blog.title}`) ? deleteBlog(blog.id) : ''
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>
        <p> {blog.author}
          <button style={hideWhenVisible} onClick={toggleView}>
            show
          </button>
          <button style={showWhenVisible} onClick={toggleView}>
            hide
          </button>
        </p>
      </div>


      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user ? blog.user.name : ''}</p>
        <button style={whenLogged} onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog