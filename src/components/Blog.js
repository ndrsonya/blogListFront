import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const handleOnClick = (param) => {
    setDetailsVisibility(param);
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
        <br/>
        likes: {blog.likes}
        <button>like</button>
        <br/>
        <button onClick={() => handleOnClick(false)}>Hide</button>
      </div>
        : <button onClick={() => handleOnClick(true)}>View</button>}

    </div>)
}

export default Blog