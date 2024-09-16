import "./GigCard.scss";

const GigCard = ({ item }) => {
  return (
    <Link to="">
      <div className="gigCard">
        <img src={item.img} alt="" />
      </div>
    </Link>
  );
};

export default GigCard;
