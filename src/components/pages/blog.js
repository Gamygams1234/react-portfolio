import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

      isLoading: true,
    };
    this.activateInfiniteScroll();
  }
  getBlogItems = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
    axios
      .get(`https://gamyburgos.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true })
      .then((response) => {
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
          totalCount: response.data.meta.total_records,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  };

  // this is all vanilla javascript that you can do on any project
  onScroll = () => {
    // checking to see if we made it to the end
    if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.getBlogItems();
    }
  };

  componentWillMount() {
    this.getBlogItems();
  }

  // we have to unmount this item otherwise we will get a memory leak across the entire website
  // this is because we acre calling the window to scroll
  componentWillUnmount() {
    // this is taking away the function when it is time to unmount
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div className="blog-container">
        {/* this will have it show up if the records come in */}
        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
        <div className="content-container">{blogRecords}</div>
      </div>
    );
  }
}

export default Blog;
