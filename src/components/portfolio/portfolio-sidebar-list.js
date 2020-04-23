import React from "react";
import PortfolioItem from "./portfolio-item";

const PortfolioSidebarList = (props) => {
  // mapping over the list
  const portfolioList = props.data.map((item) => {
    return (
      <div>
        <div>
          <img src={item.thumb_image_url} />
        </div>
        <h1>{item.name}</h1>
        <h2>{item.id}</h2>
      </div>
    );
  });
  return <div>{portfolioList}</div>;
};
export default PortfolioSidebarList;
