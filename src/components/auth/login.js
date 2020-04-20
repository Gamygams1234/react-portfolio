import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
        console.log("response", response);
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
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} />
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
