/* eslint-disable react/prop-types */
import "./CatCard.scss";
import { Link } from "react-router-dom";

const CatCard = ({ item }) => {
  return (
    <Link to="/gigs?genre=classical">
      <div className="catCard">
        <img src={item.img} alt="" />
        <span className="genre">{item.genre}</span>
      </div>
    </Link>
  );
};

export default CatCard;
