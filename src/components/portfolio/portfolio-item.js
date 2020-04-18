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
  const { id, description, thumb_image_url, logo_url } = props.item;
  return (
    <div className="portfolio-item-wrapper">
      <div
        className="portfolio-img-background"
        style={{
          backgroundImage: "url(" + thumb_image_url + ")",
        }}
      />
      {/*here we pass the style in two sets of curly brackets */}

      <div className="img-text-wrapper">
        <div className="logo-wrapper">
          <img src={logo_url} />
        </div>
        <div className="subtitle">{description}</div>
      </div>
    </div>
  );
}
// we change props.slug to the id directly
