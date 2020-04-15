import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavigationContainer extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/about-me">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {false ? <button>Add Blog</button> : null}
      </div>
    );
  }
}
