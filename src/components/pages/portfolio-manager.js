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
  handleSuccessfulFormSubmisson = (portfolioItem) => {
    // TODO
    //Update portfolio Items
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems),
    });
    // add items to the list
  };
  handleFormSubmissonError = (error) => {
    console.log("handleFormSubmissionError", error);
  };
  getPortfolioItems() {
    axios
      // we are assing the ?order_by=created_at&direction=desc to get the order to go by newest
      .get("https://gamyburgos.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { withCredentials: true })
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
  handleDeleteClick = (portfolioItem) => {
    console.log("handleDelete", portfolioItem);
  };
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
          <PortfolioSidebarList handleDeleteClick={this.handleDeleteClick} data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
