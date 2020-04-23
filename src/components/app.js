import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import About from "./pages/about";
import PortfolioManager from "./pages/portfolio-manager";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import axios from "axios";

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
  // this will handle what happend to the state when we log out
  handleSuccessfulLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  };
  // checking our login with axios
  checkLoginStatus = () => {
    return axios
      .get("https://api.devcamp.space/logged_in", { withCredentials: true })
      .then((res) => {
        const loggedIn = res.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;
        //checking to see if someone is logged into our server
        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (!loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  // {/* here is s list of our authorized pages*/}
  authorizedPages = () => {
    return [<Route path="/portfolio-manager" component={PortfolioManager}></Route>];
  };
  componentDidMount() {
    this.checkLoginStatus();
  }
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            {/*Taking out the moment and the header */}
            <NavigationContainer loggedInStatus={this.state.loggedInStatus} handleSuccessfulLogout={this.handleSuccessfulLogout} />

            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/auth" render={(props) => <Auth {...props} handleSuccessfulLogin={this.handleSuccessfulLogin} handleUnsuccessfulLogin={this.handleUnsuccessfulLogin} />}></Route>
              <Route path="/about-me" component={About}></Route>
              <Route path="/contact" component={Contact}></Route>
              <Route path="/blog" component={Blog}></Route>

              {/*using a ternary operator to see if we are logged in or not  and passing the authorised pages function*/}
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}

              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
