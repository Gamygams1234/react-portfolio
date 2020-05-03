import React, { Component } from "react";
import axios from "axios";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
    };
  }

  buildForm = () => {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    return formData;
  };

  handleSubmit = (e) => {
    axios
      .post("https://gamyburgos.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), { withCredentials: true })
      .then((response) => {
        this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
      })
      .catch((error) => {
        console.log("handleSubmit for blog error", error);
      });
    e.preventDefault();
    this.setState({
      title: "",
      blog_status: "",
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input type="text" onChange={this.handleChange} name="title" placeholder="Blog Title" value={this.state.title} />
          <input type="text" onChange={this.handleChange} name="blog_status" placeholder="Blog Status" value={this.state.blog_status} />

          <button className="btn">Save</button>
        </div>
      </form>
    );
  }
}
