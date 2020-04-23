import React, { Component } from "react";
import axios from "axios";

export default class PortfolioManager extends Component {
  constructor() {
    super();
    this.state = {
      portfolioItems: [],
    };
  }
  getPortfolioItems() {
    axios
      .get("https://gamyburgos.devcamp.space/portfolio/portfolio_items", { withCredentials: true })
      .then((response) => {
        this.setState({
          // in order to get an array in the state, we want to use a spread operator
          portfolioItems: [...response.data.portfolio_items],
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  componentDidMount() {
    this.getPortfolioItems(); // putting the getPortfolioItems in component did mount
    // we want to get it ath the start nd load it once
  }
  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <h1>Portfolio form....</h1>
        </div>

        <div className="right-column">
          <h1>Portfolio sidebar....</h1>
        </div>
      </div>
    );
  }
}
