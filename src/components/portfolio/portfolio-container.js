import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    // hanve to hit super for the constructor to work
    super();
    console.log("Portfolio container has rendered");
  }

  portfolioItems() {
    // we are going to loop over these items using map
    const data = ["Quip", "Eventbrite", "Ministry Saves"];
    return data.map((item) => {
      // we have to have a return in map
      return <PortfolioItem />;
    });
    // make sure you add the parenthesis at the end if you want your function to run immediately
  }
  render() {
    return (
      <div>
        <h2>Portfolio items go here...</h2>

        {this.portfolioItems()}
      </div>
    );
  }
}
