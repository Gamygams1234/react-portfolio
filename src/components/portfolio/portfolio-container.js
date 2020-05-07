import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from "axios";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  handleFilter(filter) {
    if (filter === "CLEAR_FILTER") {
      this.getPortfolioItems();
    } else {
      this.getPortfolioItems(filter);
    }
  }

  getPortfolioItems(filter = null) {
    axios
      .get("https://gamyburgos.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        console.log(response);
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter((item) => {
              return item.category === filter;
            }),
          });
        } else {
          this.setState({
            data: response.data.portfolio_items,
          });
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  // here this is how we are writing down the things that we will need in our application
  portfolioItems() {
    // This is all of the keys we have access to in our items
    // ["id", "name", "description", "url", "category", "position", "thumb_image_url", "banner_image_url", "logo_url", "column_names_merged_with_images"]
    return this.state.data.map((item) => {
      //debugger; We get the informathin by putting the debugger here and then we do Object.keys(item)

      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems(); // putting the getPortfolioItems in component did mount
    // we want to get it ath the start nd load it once
  }
  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="homepage-wrapper">
        <div className="filter-links">
          <button
            className="btn"
            onClick={() => {
              this.handleFilter("eCommerce");
            }}
          >
            eCommerce
          </button>
          <button
            className="btn"
            onClick={() => {
              this.handleFilter("scheduling");
            }}
          >
            Scheduling
          </button>
          <button
            className="btn"
            onClick={() => {
              this.handleFilter("Social Media");
            }}
          >
            Social Media
          </button>
          <button
            className="btn"
            onClick={() => {
              this.handleFilter("CLEAR_FILTER");
            }}
          >
            All
          </button>
        </div>
        {/*setting up a wrapper for our protfilio items*/}
        <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
      </div>
    );
  }
}
