import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to="/gig/:id" className="link">
      <div className="gigCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p className="desc">{item.desc}</p>
          <div className="star">
            <img src="/img/icons/star.png" alt="" />
            <span>{item.star}</span>
            <span> ({item.reviews} reviews)</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <span>From </span>
          <h2> ${item.price}/hr</h2>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
