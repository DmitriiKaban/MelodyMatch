import React from "react";
import featuredImage from "/img/Featured.png";
import "./Featured.scss";

const Banner = ({ title, subtitle1, subtitle2, scrollToForm }) => {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>{title}</h1>
          <span className="subtitle">{subtitle1}</span>
          <span className="subtitle">{subtitle2}</span>
          <div className="button-container">
            <button className="button-85" onClick={scrollToForm}>
              Scroll
            </button>
          </div>
        </div>
        <div className="right">
          <img src={featuredImage} alt="featured artist" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
