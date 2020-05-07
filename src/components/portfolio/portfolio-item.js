import React, { Component } from "react";
import { Link } from "react-router-dom";
import { relativeTimeThreshold } from "moment";
// this is telling us that we are going to receive props
export default class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioItemClass: "",
    };
  }
  handleMouseEnter(e) {
    this.setState({ portfolioItemClass: "image-blur" });
  }

  handleMouseLeave(e) {
    this.setState({ portfolioItemClass: "" });
  }
  render() {
    const { id, description, banner_image_url, logo_url } = this.props.item;
    return (
      <Link to={`/portfolio/${id}`}>
        <div className="portfolio-item-wrapper" onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>
          <div
            className={"portfolio-img-background " + this.state.portfolioItemClass}
            style={{
              backgroundImage: "url(" + banner_image_url + ")",
            }}
          />
          {/*here we pass the style in two sets of curly brackets */}

          <div className="img-text-wrapper">
            <div className="logo-wrapper">
              <img src={logo_url} />
            </div>
            <div className="subtitle">{description}</div>
          </div>
        </div>
      </Link>
    );
  }
}
// we change props.slug to the id directly
