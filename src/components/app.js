import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import About from "./pages/about";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            {/*Taking out the moment and the header */}
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/about-me" component={About}></Route>
              <Route path="/contact" component={Contact}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
