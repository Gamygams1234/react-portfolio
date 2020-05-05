import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "../blog/BlogFeaturedImage";
import BlogForm from "../blog/blog-form";
import axios from "axios";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false,
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
  handleEditClick = () => {
    console.log("handle edit clicked");
    this.setState({
      editMode: true,
    });
  };

  render() {
    const { title, content, featured_image_url } = this.state.blogItem;
    console.log("currentId", this.state.currentId);
    const contentManager = () => {
      if (this.state.editMode) {
        return <BlogForm />;
      } else {
        return (
          <div className="content-container">
            <h1 onClick={this.handleEditClick}>{title}</h1>
            {/* checking to see if there is a featured image */}
            <BlogFeaturedImage img={featured_image_url} />
            <div className="content">{ReactHtmlParser(content)}</div>
          </div>
        );
      }
    };
    return <div className="blog-container">{contentManager()}</div>;
  }
}
