import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorText: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      // resetting the error text
      errorText: "",
    });
  };
  handleSubmit = (e) => {
    // we are creatins a session on the server
    axios
      .post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: this.state.email,
            password: this.state.password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
        } else {
          // this will show us if somebody did something wrong
          this.setState({
            errorText: "Wrong email or password",
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch((error) => {
        // this will work for an error in the server
        this.setState({
          errorText: "An error occured",
        });
        this.props.handleUnsuccessfulAuth();
      });

    e.preventDefault();
    console.log("Handle submit", this.state.email, this.state.password);
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
        <div>{this.state.errorText}</div>
        <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
          <div className="form-group">
            <FontAwesomeIcon icon="envelope" />
            <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon="lock" />
            <input type="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div>
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
