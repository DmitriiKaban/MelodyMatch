import { Slider } from "infinite-react-carousel";
import { Link } from "react-router-dom";
import { GigCard, Reviews } from "../../components";
import { gigs } from "../../data/gigs";
import "./Account.scss";

const Account = () => {
  return (
    <div className="account">
      <div className="container">
        <div className="left">
          <div className="top">
            <img src="/img/pp3.png" alt="" />
            <div className="info">
              <span>Jace Smith</span>
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

          <div className="parts">
            <div className="part1">
              <h2>About This Artist</h2>
              <p>
                I’m available for bookings from October 15th through December
                10th. Feel free to reach out to discuss specific dates and event
                details. I offer solo acoustic performances perfect for intimate
                gatherings, private events, or festival slots. My set includes
                original compositions and select covers to create an engaging
                atmosphere. I’m available for bookings from October 15th through
                December 10th. Feel free to reach out to discuss specific dates
                and event details. I offer solo acoustic performances perfect
                for intimate gatherings, private events, or festival slots. My
                set includes original compositions and select covers to create
                an engaging atmosphere.
              </p>
              <button>Send Invitation</button>
            </div>
            <div className="part2">
              <div className="seller">
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
                  <p className="bottom">Click here to see Artist's Resume</p>
                </div>
              </div>
            </div>
          </div>

          <h2>My Gigs</h2>

          <Slider
            slidesToShow={4}
            arrowsScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            pauseOnHover={true}
            className="slider"
          >
            {gigs.map((gig) => {
              return <GigCard key={gig.id} item={gig} />;
            })}
          </Slider>

          <div className="reviews">
            <div className="top">
              <h2>Reviews</h2>
              <Link to="/gig/:id/reviews" className="link">
                <h3> See more </h3>
              </Link>
            </div>
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
