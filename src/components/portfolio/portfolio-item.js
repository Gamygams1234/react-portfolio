import React from "react";
// this is telling us that we are going to receive props
export default function (props) {
  // the h3 will revieve the title from the props that we put down
  // we can also pass in other props to make it dynamic
  return (
    <div>
      <h3>{props.title}</h3>
      <h3>{props.url}</h3>
    </div>
  );
}
