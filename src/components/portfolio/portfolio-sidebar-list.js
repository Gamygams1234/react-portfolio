import React from "react";
import PortfolioItem from "./portfolio-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = (props) => {
  // mapping over the list
  const portfolioList = props.data.map((portfolioItem) => {
    return (
      //putting the id in the wrapper
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-image">
          <img src={portfolioItem.thumb_image_url} />
        </div>
        <h1 className="title">{portfolioItem.name}</h1>
        <h2>{portfolioItem.id}</h2>
        <a onClick={() => props.handleDeleteClick(portfolioItem)}>Delete</a>
        <FontAwesomeIcon icon="trash" />
      </div>
    );
  });
  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};
export default PortfolioSidebarList;
