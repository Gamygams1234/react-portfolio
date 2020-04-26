import React, { Component } from "react";
import axios from "axios";

import DropzoneComponent from "react-dropzone-component";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
    };
    this.thumbRef = React.createRef();
    this.logoRef = React.createRef();
    this.bannerRef = React.createRef();
  }
  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const { id, name, description, category, position, url, thumb_image_url, banner_image_url, logo_url } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        category: category || "eCommerce",
        position: position || "",
        url: url || "",
      });
    }
  }
  handleThumbDrop = () => {
    return {
      addedfile: (file) => this.setState({ thumb_image: file }),
    };
  };
  handleLogoDrop = () => {
    return {
      addedfile: (file) => this.setState({ logo: file }),
    };
  };
  handleBannerDrop = () => {
    return {
      addedfile: (file) => this.setState({ banner_image: file }),
    };
  };
  handleChange = (e) => {
    // updating the state
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://gamyburgos.devcamp.space/portfolio/portfolio_items", this.buildForm(), { withCredentials: true })
      .then((res) => {
        this.props.handleSuccessfulFormSubmisson(res.data.portfolio_item);
        [this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
        this.setState({ name: "", description: "", category: "eCommerce", position: "", url: "", thumb_image: "", banner_image: "", logo: "" });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  };
  djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  };
  buildForm = () => {
    let formData = new FormData();
    // this will build our data to g to the API
    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[desccription]", this.state.desccription);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);
    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }
    return formData;
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input type="text" name="name" placeholder="Portfolio Item Name" value={this.state.name} onChange={this.handleChange} />
          <input type="text" name="url" placeholder="URL" value={this.state.url} onChange={this.handleChange} />
          <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange} />
          <select className="select-element" type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleChange}>
            {/* making a select tag with the options */}
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div className="one-column">
          <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className="image-uploaders">
          <DropzoneComponent config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleThumbDrop()} ref={this.thumbRef}>
            <div className="dz-message">Thumbnail</div>
          </DropzoneComponent>
          <DropzoneComponent config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleBannerDrop()} ref={this.bannerRef}>
            {" "}
            <div className="dz-message">Banner</div>
          </DropzoneComponent>
          <DropzoneComponent config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleLogoDrop()} ref={this.logoRef}>
            {" "}
            <div className="dz-message">Logo</div>
          </DropzoneComponent>
        </div>
        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
