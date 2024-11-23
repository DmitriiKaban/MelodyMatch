import { cards } from "../../data/genres";
import { accountsMusician } from "../../data/accounts";
import { Link } from "react-router-dom";
import logo from "../../assets/logoName.png";
import "./Home.scss";
import { AccountCard, Featured, Slide, CatCard } from "../../components";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <Slide
        slidesToShow={5}
        arrowsScroll={5}
        autoplay={true}
        autoplaySpeed={3000}
        pauseOnHover={true}
      >
        {cards.map((card) => {
          return <CatCard key={card.id} item={card} />;
        })}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="top">
            <img src={logo} alt="" />
            <h1 className="discover">
              {" "}
              Discover, book, and enjoy seamless music experiences tailored to
              your event’s needs.
            </h1>
          </div>
          <div className="item">
            <h1>
              A business which connects organizations with top-notch musicians
              to make every event{" "}
              <span style={{ color: "#bc11b0" }}>unforgettable.</span>
            </h1>
            <div className="title">
              <img src="/img/icons/Icon2.png" alt="" />
              Our platform makes it easy Whether you are planning a corporate
              gathering, wedding, or any special occasion.
            </div>
            <div className="title">
              <img src="/img/icons/Icon1.png" alt="" />
              Pay securely with us, with just a few clicks.
            </div>
            <div className="title">
              <img src="/img/icons/Icon3.png" alt="" />
              Explore our diverse roster of artists today and bring your vision
              to life with the perfect musical touch.
            </div>
            <Link to="/gigs?genre=all">
              <button>Explore</button>
            </Link>
          </div>
        </div>
        <h1 className="next">Take a look at some of our artists</h1>
      </div>
      <Slide
        slidesToShow={3}
        arrowsScroll={3}
        autoplay={true}
        autoplaySpeed={3000}
        pauseOnHover={true}
      >
        {accountsMusician.map((account) => {
          return <AccountCard key={account.id} item={account} />;
        })}
      </Slide>
      <div className="last"></div>
      <div className="shape"></div>
    </div>
  );
};

export default Home;
