import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();
    this.state = {
      portfolioItems: [],
    };
  }
  handleSuccessfulFormSubmisson = (item) => {
    // TODO
    //Update portfolio Items
    // add items to the list
  };
  handleFormSubmissonError = (error) => {
    console.log("handleFormSubmissionError", error);
  };
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
          <PortfolioForm handleSuccessfulFormSubmisson={this.handleSuccessfulFormSubmisson} handleFormSubmissonError={this.handleFormSubmissonError} />
        </div>

        <div className="right-column">
          {/*passing in our data from our api */}
          <PortfolioSidebarList data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
