import "./CatCard.scss";
import { Link } from "react-router-dom";

const CatCard = ({ item }) => {
  return (
    <Link to={`/gigs?genre=${item.genre.toLowerCase()}`}>
      <div className="catCard">
        <img src={item.img} alt={item.genre} />
        <span className="genre">{item.genre}</span>
      </div>
    </Link>
  );
};

export default CatCard;
