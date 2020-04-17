import React from "react";
import { Link } from "react-router-dom";
// this is telling us that we are going to receive props
export default function (props) {
  // data that we'll need :
  // background image:thumb_image_url
  // description:description
  // logo :logo
  // id :id
  // slug
  const { id, description, thumb_image_url, logo } = props.item;
  return (
    <div>
      <div>{description}</div>
      <Link to={`/portfolio/${id}`}>Link</Link>
    </div>
  );
}
// we change props.slug to the id directly
