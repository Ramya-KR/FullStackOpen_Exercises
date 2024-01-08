import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Logout from './components/Logout'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(0)

  const addBlogRef = useRef()


  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(
        { username, password, }
      )
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setMessage('wrong credentials, please check')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    addBlogRef.current.toggleVisibility()
    try {
      console.log(newBlog)
      const response = await blogService.create(newBlog)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setSuccess(1)
      setMessage(`Successfully added ${response.title} by ${response.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setSuccess(0)
      setMessage('unable to add the blog, please try again', exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLike = async (id, updatedBlog) => {
    try {
      await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }))
      setSuccess(1)
      setMessage(`You have liked the ${updatedBlog.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {

      setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setSuccess(1)
      setMessage('Successfully deleted the blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setSuccess(0)
      setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {console.log(user)}
      <Notification message={message} success={success} />
      {user === null && <LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} handleLogin={handleLogin} />}
      {user !== null &&
        <div>
          <p>{user.name} logged in <Logout id='logout' handleLogout={handleLogout} /></p>
          <Togglable showButtonLabel='add blog' hideButtonLabel='cancel' ref={addBlogRef}>
            <AddBlog createBlog={createBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} user={user} updateLike={updateLike} deleteBlog={deleteBlog} />)
          }
        </div>
      }
    </div>

  )

}

export default App