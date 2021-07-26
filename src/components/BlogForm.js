import React from 'react'

const BlogForm = ({ newBlog, handleBLogChange, handleBlogSubmit }) => (
  <div>
    <h2>Create a new blog</h2>

    <form
      onSubmit={handleBlogSubmit}
    >
      <h1>create new</h1>
      title:
      <input
        name="title"
        id="title"
        value={newBlog.title}
        onChange={handleBLogChange}
      />
      <br />
      author:
      <input
        name="author"
        id="author"
        value={newBlog.author}
        onChange={handleBLogChange}
      />
      <br />
       url:
      <input
        name="url"
        id="url"
        value={newBlog.url}
        onChange={handleBLogChange}
      />
      <br />
      <button type="submit">save</button>
    </form>
  </div>
)

export default BlogForm