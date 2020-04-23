import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";

const NavigationContatiner = (props) => {
  {
    /*this dynamic Link will help us with making sure that we can put this link when  we are logged in  */
  }
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then((response) => {
        // this will take us back to the home when we sign out
        if (response.status === 200) {
          // this will only work if we have a higher order component
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        // it is proper to return something after a promise
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
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
        <div className="nav-link-wrapper">
          <NavLink to="/blog" activeClassName="nav-link-active">
            Blog
          </NavLink>
        </div>

        {/*using a ternary operator to see if we are logged in or not */}

        {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
      </div>
      <div className="right-side">
        GAMALIEL BURGOS
        {props.loggedInStatus === "LOGGED_IN" ? <a onClick={handleSignOut}> Sign Out</a> : null}
      </div>
    </div>
  );
};
// since we are in a functional component, we don't need to use the THIS keyword in our JSX

export default withRouter(NavigationContatiner); // this is where we wrap the higher order component
