import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();
    this.state = {
      portfolioItems: [],
      portfolioToEdit: {},
    };
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {},
    });
  }

  handleEditClick(portfolioItem) {
    this.setState({
      portfolioToEdit: portfolioItem,
    });
  }
  handleEditFormSubmission = (portfolioItem) => {
    this.getPortfolioItems();
  };

  handleNewFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems),
    });
  }
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
    axios
      .delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true })
      .then((response) => {
        this.setState({
          portfolioItems: this.state.portfolioItems.filter((item) => {
            return item.id !== portfolioItem.id;
          }),
        });
        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  };
  componentDidMount() {
    this.getPortfolioItems(); // putting the getPortfolioItems in component did mount
    // we want to get it ath the start nd load it once
  }
  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm handleEditFormSubmission={this.handleEditFormSubmission} handleNewFormSubmission={this.handleNewFormSubmission} handleFormSubmissionError={this.handleFormSubmissionError} clearPortfolioToEdit={this.clearPortfolioToEdit} portfolioToEdit={this.state.portfolioToEdit} />
        </div>

        <div className="right-column">
          {/*passing in our data from our api */}
          <PortfolioSidebarList clearPortfolioToEdit={this.clearPortfolioToEdit} handleEditClick={this.handleEditClick} handleDeleteClick={this.handleDeleteClick} data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
