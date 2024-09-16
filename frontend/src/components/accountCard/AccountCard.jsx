/* eslint-disable react/prop-types */
import "./AccountCard.scss";
import { Link } from "react-router-dom";

const AccountCard = ({ item }) => {
  return (
    <Link to="/" className="link">
      <div className="accountCard">
        <img src={item.img} alt="" />
        <div className="info">
          <img src={item.pp} alt="" />
          <div className="texts">
            <h2>{item.username}</h2>
            <span>{item.genre}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;
