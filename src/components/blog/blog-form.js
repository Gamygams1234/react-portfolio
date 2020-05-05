import React, { Component } from "react";
import axios from "axios";
import RichTextEditor from "../forms/RichTextEditor";
import DropzoneComponent from "react-dropzone-component";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
      content: "",
      featured_image: "",
    };
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
  }

  handleRichTextEditorChange(content) {
    this.setState({ content });
  }
  buildForm = () => {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    return formData;
  };

  handleSubmit = (e) => {
    axios
      .post("https://gamyburgos.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), { withCredentials: true })
      .then((response) => {
        this.setState({
          title: "",
          blog_status: "",
          content: "",
        });
        this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
      })
      .catch((error) => {
        console.log("handleSubmit for blog error", error);
      });
    e.preventDefault();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // These are the DropZone functions

  handleFeaturedImageDrop = () => {
    return {
      addedfile: (file) => this.setState({ featured_image: file }),
    };
  };

  djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  };
  componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input type="text" onChange={this.handleChange} name="title" placeholder="Blog Title" value={this.state.title} />
          <input type="text" onChange={this.handleChange} name="blog_status" placeholder="Blog Status" value={this.state.blog_status} />
        </div>
        <div className="one-column">
          <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange} />
        </div>
        <div className="image-uploaders">
          <DropzoneComponent config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleFeaturedImageDrop()}>
            <div className="dz-message">Featured Image</div>
          </DropzoneComponent>
        </div>
        <button className="btn">Save</button>
      </form>
    );
  }
}
