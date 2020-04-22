import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import About from "./pages/about";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

export default class App extends Component {
  // creating state indication logged in and rendering it to auth
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };
  }
  handleSuccessfulLogin = (e) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  };
  handleUnsuccessfulLogin = (e) => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  };
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            {/*Taking out the moment and the header */}
            <NavigationContainer />
            <h2>{this.state.loggedInStatus}</h2>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/auth" render={(props) => <Auth {...props} handleSuccessfulLogin={this.handleSuccessfulLogin} handleUnsuccessfulLogin={this.handleUnsuccessfulLogin} />}></Route>
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
