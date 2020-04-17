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
  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter((item) => {
        return item.category === filter;
      }),
    });
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

  // here this is how we are writing down the things that we will need in our application
  portfolioItems() {
    // data that we'll need :
    // background image:thumb_image_url
    // descrioption:description
    // logo :logo
    // id :id
    // slug
    // This is all of the keys we have access to in our items
    // ["id", "name", "description", "url", "category", "position", "thumb_image_url", "banner_image_url", "logo_url", "column_names_merged_with_images"]
    return this.state.data.map((item) => {
      //debugger; We get the informathin by putting the debugger here and then we do Object.keys(item)
      console.log("portfolio item", item);

      return <PortfolioItem key={item.id} title={item.name} url={item.url} slug={item.id} />;
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
