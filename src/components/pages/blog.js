import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
// making a class component
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
    };
    this.activateInfiniteScroll();
  }
  getBlogItems = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
    axios
      .get("https://gamyburgos.devcamp.space/portfolio/portfolio_blogs")
      .then((response) => {
        this.setState({
          blogItems: response.data.portfolio_blogs,
          totalCount: response.data.meta.total_records,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  };
  activateInfiniteScroll = () => {
    // this is all vanilla javascript that you can do on any project
    window.onscroll = () => {
      //window.innerHeight = the height of the window in the browser
      // document.documentElement.scrollTop = the positon at the top of the browser when someone is scrolling .
      // offsetHeight = end of the page
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        console.log("get More posts");
      }
    };
  };

  componentWillMount() {
    this.getBlogItems();
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div className="blog-container">
        <div className="content-container">{blogRecords}</div>
      </div>
    );
  }
}

export default Blog;
