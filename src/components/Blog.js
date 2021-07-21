import React, { useState } from 'react'
import axios from 'axios'


const Blog = ({ blog }) => {

  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const handleOnClick = (param) => {
    setDetailsVisibility(param);
  }

  const handleLike = () => {

    const updatedLikes = blog.likes + 1
    const updatedBlog = {
      user: blog.user.id,
      likes: updatedLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    axios
      .put(`http://localhost:3003/api/addLikes/${blog.id}`, updatedBlog)
    window.location.reload();
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {detailsVisibility ?
        <div>
          {blog.url}
          <br />
          likes: {blog.likes}
          <button onClick={() => handleLike()}>like</button>
          <br />
          <button onClick={() => handleOnClick(false)}>Hide</button>
        </div>
        : <button onClick={() => handleOnClick(true)}>View</button>}

    </div>)
}

export default Blog