import { Slider } from "infinite-react-carousel";
import React, { useState, useEffect } from "react";
import { GigCard, Reviews } from "../../components";
import { gigs } from "../../data/gigs";
import "./Account.scss";
import userMusician from "../../assets/Musician.png";
import defaultPic from "../../assets/user.png"

const Account = () => {
  const [reviews, setReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newReview, setNewReview] = useState({
    username: "",
    comment: "",
    rating: 5,
  });

  // Load reviews from local storage on component mount
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // Handle review submission
  const handleAddReview = (e) => {
    e.preventDefault();

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews)); // Save to local storage
    setShowPopup(false); // Close the popup
    setNewReview({ username: "", comment: "", rating: 5 }); // Reset the form
  };

  // localStorage.removeItem("reviews")

  return (
    <div className="account">
      <div className="container">
        <div className="left">
          <div className="top">
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
              <button className="link" style={{
                all: "unset",
                cursor: "pointer",
              }} onClick={() => setShowPopup(true)}>
                <h3>Add Review</h3>
              </button>
            </div>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="reviews">
                  <div className="item">
                    <div className="user">
                      <img src={defaultPic} alt="" className="pp" />
                      <div className="info">
                        <span>{review.username}</span>
                        <div className="country">
                          <img src="/img/flag.png" alt="" />
                          <span>Republic of Moldova</span>
                        </div>
                      </div>
                    </div>
                    <div className="stars">
                      {[...Array(review.rating)].map((_, i) => (
                        <img key={i} src="/img/icons/star.png" alt="" />
                      ))}
                      <span>{review.rating}</span>
                    </div>
                    <p>{review.comment}</p>
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
              ))
            ) : (
              <p>You haven't rated yet.</p>
            )}
            <Reviews />
            {/* Review Popup */}
            {showPopup && (
              <div className="popup">
                <div className="popup-inner">
                  <h3>Add Your Review</h3>
                  <form onSubmit={handleAddReview}>
                    <label>
                      Username:
                      <input
                        type="text"
                        name="username"
                        value={newReview.username}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                    <label>
                      Comment:
                      <textarea
                        name="comment"
                        value={newReview.comment}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </label>
                    <label>
                      Rating:
                      <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                        required
                      />
                    </label>
                    <div className="button-container">
                      <button type="submit">Submit</button>
                      <button type="button" onClick={() => setShowPopup(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
