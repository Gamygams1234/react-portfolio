import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from "axios";

export default class PortfolioContainer extends Component {
  constructor() {
    // hanve to hit super for the constructor to work
    super();
    // this will aways be the initial state of the application
    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  getPortfolioItems() {
    axios
      .get("https://gamyburgos.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        // handle success

        this.setState({
          data: response.data.portfolio_items,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  portfolioItems() {
    // // we are going to loop over these items using map
    this.getPortfolioItems();
    return this.state.data.map((item) => {
      // here we are calling our item throught the state
      return <PortfolioItem title={item.name} url={item.url} slug={item.id} />;
    });
    // make sure you add the parenthesis at the end if you want your function to run immediately
  }
  // with this we are going through the state and filtering out what the category returns
  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter((item) => {
        return item.category === filter;
      }),
    });
  }
  // running only if state is not loading

  componentDidMount() {
    this.getPortfolioItems;
  }
  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>{this.state.pageTitle}</h2>
        <button
          onClick={() => {
            this.handleFilter("eCommerce");
          }}
        >
          eCommerce
        </button>
        <button
          onClick={() => {
            this.handleFilter("scheduling");
          }}
        >
          scheduling
        </button>
        <button
          onClick={() => {
            this.handleFilter("enterprise");
          }}
        >
          enterpise
        </button>

        {this.portfolioItems()}
      </div>
    );
  }
}
