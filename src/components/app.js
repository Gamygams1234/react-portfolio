import React, { Component } from "react";
import moment from "moment";
// the name will be router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import About from "./pages/about";
import Home from "./pages/home";
// Beacause of the Route, it know what content to pull

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/about-me" component={About}></Route>
            </Switch>
          </div>
        </Router>
        <h1>DevCamp React Starter</h1>
        <div>{moment().format("MMMM Do YYYY, h:mm:ss a")}</div>

        <PortfolioContainer />
      </div>
    );
  }
}
