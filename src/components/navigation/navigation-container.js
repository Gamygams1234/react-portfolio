import React from "react";
import { NavLink } from "react-router-dom";

export default function NavigationContatiner(props) {
  {
    /*this dynamic Link will help us with making sure that we can put this link when  we are logged in  */
  }
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to="/blog" activeClassName="nav-link-active">
          Blog
        </NavLink>
      </div>
    );
  };

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
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>
        {/*using a ternary operator to see if we are logged in or not */}
        {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/blog", "Blog") : null}
      </div>
      <div className="right-side">GAMALIEL BURGOS</div>
    </div>
  );
}
