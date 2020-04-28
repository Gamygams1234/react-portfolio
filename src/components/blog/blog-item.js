import React from "react";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  //here we are doing destruturing to pull in everything
  const { id, blog_status, content, title, featured_image_url } = props.blogItem;
  return (
    <div className="blog-container">
      <div className="content-container">
        <h1>{title}</h1>
        <img src={featured_image_url} />
        <div>{content}</div>
      </div>
    </div>
  );
};

export default BlogItem;
