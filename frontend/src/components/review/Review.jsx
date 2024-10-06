import React from "react";
import { Link } from "react-router-dom";

const Review = () => {
  return (
    <div className="reviews">
      <div className="item">
        <div className="user">
          <img src="/img/pp2.png" alt="" className="pp" />
          <div className="info">
            <span>Marcela Popovici</span>
            <div className="country">
              <img src="/img/flag.png" alt="" />
              <span>Romania</span>
            </div>
          </div>
        </div>
        <div className="stars">
          <img src="/img/icons/star.png" alt="" />
          <img src="/img/icons/star.png" alt="" />
          <img src="/img/icons/star.png" alt="" />
          <img src="/img/icons/star.png" alt="" />
          <img src="/img/icons/star.png" alt="" />
          <span>5</span>
        </div>
        <p>
          I had the honour of working with Matei for my wedding. He was very
          professional, talented and even written a song for my special day as a
          bonus. Could not recommend him enough!
        </p>
        <div className="helpful">
          <h1>Helpful?</h1>
          <img src="/img/icons/Thumbsup.png" alt="" />
          <span>Yes</span>
          <img src="/img/icons/Thumbsup.png" alt="" className="thumbsdown" />
          <span>No</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Review;
