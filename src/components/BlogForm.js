import React from 'react'

const BlogForm = ({ addBlog, newBlog, handleBLogChange}) => (
    <div>
        <h2>Create a new blog</h2>

        <form
            onSubmit={addBlog}
        >
            <h1>create new</h1>
      title:
        <input
                name="title"
                value={newBlog.title}
                onChange={handleBLogChange}
            />
            <br />
      author:
        <input
                name="author"
                value={newBlog.author}
                onChange={handleBLogChange}
            />
            <br />
       url:
        <input
                name="url"
                value={newBlog.url}
                onChange={handleBLogChange}
            />
            <br />
            <button type="submit">save</button>
        </form>
    </div>
)

export default BlogForm