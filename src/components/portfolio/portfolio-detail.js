import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getPortfolioItem();
  }
  getPortfolioItem = () => {
    axios
      .get(`https://gamyburgos.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, { withCredentials: true })
      .then((response) => {
        console.log("res", response);
      })
      .catch((error) => {
        console.log("get porfolioItem error Checking the git ", error);
      });
  };

  render() {
    return (
      <div>
        <h2>Portfolio Detail for {this.props.match.params.slug}</h2>
      </div>
    );
  }
}
