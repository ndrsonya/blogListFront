/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

//Some changes
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    author: '',
    title: '',
    url: '',
    likes: 0
  })

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogVisibleButton, setNEwBlogVisibleButton] = useState(true)

  const getAllBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
      setBlogs(blogs)
    })
  }

  useEffect(() => getAllBlogs(), [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      console.log('user', user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = () => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          author: '',
          title: '',
          url: '',
          likes: 0
        })
      })
    setNEwBlogVisibleButton(true)
  }

  const handleBLogChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  const handleBlogFormVisibility = () => {
    setNEwBlogVisibleButton(false)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button
            onClick={() => handleLogout()}
          >
            logout
          </button>

          {
            newBlogVisibleButton === true
              ? <button onClick={() => handleBlogFormVisibility()}>
                create new blog
              </button>
              : <BlogForm
                newBlog={newBlog}
                handleBLogChange={handleBLogChange}
                handleBlogSubmit={addBlog}
              />

          }


          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} user={user} getAllBlogs={getAllBlogs} />
            )}
          </div>
        </div>
      }

    </div>
  )
}

export default App