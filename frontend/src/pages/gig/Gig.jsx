import "./Gig.scss";
import { Slider } from "infinite-react-carousel";
import { Link } from "react-router-dom";
import { Review } from "../../components";
import userMusician from "../../assets/Musician.png";

const Gig = () => {
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadCrumbs">TUNIFY {">"} CLASSICAL</span>
          <h2>Open for Events</h2>
          <div className="user">
            <img src={userMusician} className="picUser" alt="" />
            <span>Matei Basarab</span>
            <div className="stars">
              <img src="/img/icons/star.png" alt="" />
              <img src="/img/icons/star.png" alt="" />
              <img src="/img/icons/star.png" alt="" />
              <img src="/img/icons/star.png" alt="" />
              <img src="/img/icons/star.png" alt="" />
              <span>5</span>
            </div>
          </div>

          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img src="/img/account1.png" alt="" />
            <img src="/img/discoCard.png" alt="" />
            <img src="/img/account8.png" alt="" />
          </Slider>

          <h2>About This Gig</h2>
          <p>
            I’m available for bookings from October 15th through December 10th.
            Feel free to reach out to discuss specific dates and event details.
            I offer solo acoustic performances perfect for intimate gatherings,
            private events, or festival slots. My set includes original
            compositions and select covers to create an engaging atmosphere.
          </p>

          <div className="seller">
            <div className="user">
              <img src={userMusician} alt="" />
              <div className="info">
                <span>Matei Basarab</span>
                <div className="stars">
                  <img src="/img/icons/star.png" alt="" />
                  <img src="/img/icons/star.png" alt="" />
                  <img src="/img/icons/star.png" alt="" />
                  <img src="/img/icons/star.png" alt="" />
                  <img src="/img/icons/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>

            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">Republic of Moldova</span>
                </div>
                <div className="item">
                  <span className="title">Experience</span>
                  <span className="desc">5 years</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English, Romanian, Russian</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">September 2024</span>
                </div>
              </div>
              <hr />
              <p>Click here to see the artist's Resume</p>
            </div>
          </div>

          <div className="reviews">
            <div className="reviews">
              <div className="top">
                <h2>Reviews</h2>
                <Link to="/account/user/:id" className="link">
                  <h3> See more </h3>
                </Link>
              </div>
              <Review />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="price">
            <h3>1 hour canto with background band</h3>
            <h2>$82</h2>
          </div>

          <div className="details">
            <div className="item">
              <img src="/img/icons/clock.png" alt="" />
              <span>replies in a few minutes</span>
            </div>
          </div>

          <div className="more">
            <div className="item">
              <img src="/img/icons/radio.png" alt="" />
              <span>individual song-writing and dedications</span>
            </div>
            <div className="item">
              <img src="/img/icons/radio.png" alt="" />
              <span>experience with multiple instruments and genres</span>
            </div>
          </div>

          <button>Order</button>
        </div>
      </div>
    </div>
  );
};

export default Gig;
