import React, { Component } from "react";
import axios from "axios";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
    };
  }
  getBlogItem() {
    axios
      .get(`https://gamyburgos.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`)
      .then((res) => {
        console.log("response", res);
      })
      .catch((error) => {
        console.log("get Item Error", error);
      });
  }
  componentDidMount() {
    this.getBlogItem();
  }
  render() {
    console.log("currentId", this.state.currentId);
    return (
      <div>
        <h1>John Cena Sucks</h1>
      </div>
    );
  }
}
