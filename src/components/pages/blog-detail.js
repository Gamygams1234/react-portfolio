import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "../blog/BlogFeaturedImage";
import axios from "axios";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
    };
  }
  getBlogItem() {
    axios
      .get(`https://gamyburgos.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`)
      .then((res) => {
        this.setState({
          blogItem: res.data.portfolio_blog,
        });
      })
      .catch((error) => {
        console.log("get Item Error", error);
      });
  }
  componentDidMount() {
    this.getBlogItem();
  }
  render() {
    const { title, content, featured_image_url } = this.state.blogItem;
    console.log("currentId", this.state.currentId);
    return (
      <div className="blog-container">
        <div className="content-container">
          <h1>{title}</h1>
          {/* checking to see if there is a featured image */}
          <BlogFeaturedImage img={featured_image_url} />
          <div className="content">{ReactHtmlParser(content)}</div>
        </div>
      </div>
    );
  }
}
