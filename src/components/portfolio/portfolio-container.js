import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    // hanve to hit super for the constructor to work
    super();
    // this will aways be the initial state of the application
    this.state = {
      pageTitle: "Welcome to my portfolio",
      data: [{ title: "Quip" }, { title: "Eventbrite" }, { title: "Ministry Saves" }],
    };
    // you can either use an arrow function like Net Ninja or you can bind this at the end of your code
    this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
  }

  portfolioItems() {
    // we are going to loop over these items using map

    return this.state.data.map((item) => {
      // here we are calling our item throught the state
      return <PortfolioItem title={item.title} url="google.com" />;
    });
    // make sure you add the parenthesis at the end if you want your function to run immediately
  }
  handlePageTitleUpdate() {
    this.setState({
      pageTitle: "John Cena Sucks",
    });
  }
  render() {
    return (
      <div>
        <h2>{this.state.pageTitle}</h2>

        {this.portfolioItems()}
        <hr />
        <button onClick={this.handlePageTitleUpdate}>Change Title</button>
      </div>
    );
  }
}
