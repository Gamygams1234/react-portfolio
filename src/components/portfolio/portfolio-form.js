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
      category: "HTML/CSS",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
      editMode: false,
      apiUrl: "https://gamyburgos.devcamp.space/portfolio/portfolio_items",
      apiAction: "post",
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
        category: category || "HTML/CSS",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://gamyburgos.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        thumb_image_url: thumb_image_url || "",
        banner_image_url: banner_image_url || "",
        logo_url: logo_url || "",
      });
    }
  }
  deleteImage = (imageType) => {
    axios
      .delete(`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`, { withCredentials: true })
      .then((response) => {
        this.setState({
          [`${imageType}_url`]: "",
        });
      })
      .catch((error) => {
        console.log(error, "delete image error");
      });
  };
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
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true,
    })
      .then((response) => {
        // checking if there is edit mode

        if (this.state.editMode) {
          this.props.handleEditFormSubmission();
        } else {
          this.props.handleNewFormSubmission(response.data.portfolio_item);
        }
        this.setState({
          name: "",
          description: "",
          category: "HTML/CSS",
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: "",
          editMode: false,
          apiUrl: "https://gamyburgos.devcamp.space/portfolio/portfolio_items",
          apiAction: "post",
        });
        [this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
        this.setState({ name: "", description: "", category: "HTML/CSS", position: "", url: "", thumb_image: "", banner_image: "", logo: "", editMode: false, apiUrl: "https://gamyburgos.devcamp.space/portfolio/portfolio_items", apiAction: "post" });
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
            <option value="HTML/CSS">HTML/CSS</option>
            <option value="Javascript">Javascript</option>
            <option value="PHP/MySQL"> PHP/MySQL</option>
          </select>
        </div>
        <div className="one-column">
          <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className="image-uploaders">
          {/*checking to see if there is an image and we are in edit mode */}

          {this.state.thumb_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.thumb_image_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("thumb_image")}>Remove file</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent ref={this.thumbRef} config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleThumbDrop()}>
              <div className="dz-message">Thumbnail</div>
            </DropzoneComponent>
          )}

          {this.state.banner_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.banner_image_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("banner_image")}>Remove file</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleBannerDrop()} ref={this.bannerRef}>
              {" "}
              <div className="dz-message">Banner</div>
            </DropzoneComponent>
          )}

          {this.state.logo_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.logo_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("logo")}>Remove file</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleLogoDrop()} ref={this.logoRef}>
              {" "}
              <div className="dz-message">Logo</div>
            </DropzoneComponent>
          )}
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
