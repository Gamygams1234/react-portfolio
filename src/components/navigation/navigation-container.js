import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavigationContainer extends Component {
  render() {
    return (
      <div className="nav-wrapper">
        <div className="left-side">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/about-me">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {false ? <button>Add Blog</button> : null}
        </div>
        <div className="right-side">GAMALIEL BURGOS</div>
      </div>
    );
  }
}
