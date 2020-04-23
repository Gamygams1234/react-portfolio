import React from "react";
import PortfolioItem from "./portfolio-item";

const PortfolioSidebarList = (props) => {
  // mapping over the list
  const portfolioList = props.data.map((item) => {
    return (
      //putting the id in the wrapper
      <div key={item.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-image">
          <img src={item.thumb_image_url} />
        </div>
        <h1 className="title">{item.name}</h1>
        <h2>{item.id}</h2>
      </div>
    );
  });
  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};
export default PortfolioSidebarList;
