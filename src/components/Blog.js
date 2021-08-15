import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



const Blog = ({ blog, getAllBlogs }) => {

  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const handleOnClick = (param) => {
    setDetailsVisibility(param)
  }

  const handleLike = async () => {
    blog.likes += 1
    console.log('blog to update', blog)
    await blogService.update(blog.id, blog)
    getAllBlogs()
  }

  const handleDelete = () => {
    blogService.deleteBlog(blog.id)
    window.location.reload()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }


  return (
    <div style={blogStyle} className='blog'>
      <p>{blog.title}</p>
      <p>Blog post by: {blog.author}</p>
      {detailsVisibility ?
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          likes: {blog.likes}
          <button onClick={() => handleLike()}>like</button>
          <br />
          <button onClick={() => handleDelete()}>delete</button>
          <br />
          <button onClick={() => handleOnClick(false)}>Hide</button>
        </div>
        : <button onClick={() => handleOnClick(true)}>View</button>}

    </div>)
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  getAllBlogs: PropTypes.func.isRequired
}

export default Blog