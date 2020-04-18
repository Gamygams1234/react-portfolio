import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavigationContainer extends Component {
  render() {
    return (
      <div className="nav-wrapper">
        <div className="left-side">
          {/* We are putting all of our links in a Nav Link wrapper */}
          <div className="nav-link-wrapper">
            <NavLink exact to="/" activeClassName="nav-link-active">
              Home
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/about-me" activeClassName="nav-link-active">
              About
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/blog" activeClassName="nav-link-active">
              Blog
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/contact" activeClassName="nav-link-active">
              Contact
            </NavLink>
          </div>
        </div>
        <div className="right-side">GAMALIEL BURGOS</div>
      </div>
    );
  }
}
