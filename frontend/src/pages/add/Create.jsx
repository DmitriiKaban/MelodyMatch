import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Add.scss";
import { Banner } from "../../components";

const currentUser = {
  id: 1,
  username: "Matei Basarab",
  isMusician: false,
};

const Add = () => {
  const formRef = useRef(null);
  const userIsMusician = currentUser.isMusician;

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="banner">
        <Banner
          title={`Hop on your personal ${
            userIsMusician ? "Musician" : "Organizer"
          } account!`}
          subtitle1="This is your General Information."
          subtitle2="Complete the form below:"
          scrollToForm={scrollToForm}
        />
      </div>
      <div className="add" ref={formRef}>
        <div className="container">
          <h1>Create Account</h1>
          <div className="sections">
            <div className="info">
              <div className="item">
                <label htmlFor="">
                  {userIsMusician ? "Name" : "Organization Name"}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={
                  userIsMusician ? "Enter your name" : "Enter organization name"
                }
              />

              <div className="item">
                <label htmlFor="">Email</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="email" placeholder="Enter your email" />

              <div className="item">
                <label htmlFor="">Profile Picture</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" />

              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="">Work Experience</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <select>
                    <option value="">Select work experience</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                  </select>
                </>
              )}

              <div className="item">
                <label htmlFor="">Location</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="text" placeholder="Enter your location" />

              <div className="item">
                <label htmlFor="">Interested in</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select>
                <option value="">Select the genres</option>
                <option value="jazz">Jazz</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
              </select>
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="">Short Description</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                placeholder={`${
                  userIsMusician
                    ? "Short description about yourself"
                    : "Short description about your brand"
                }`}
                cols="30"
                rows="10"
              ></textarea>
              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="">Upload your resume</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <input type="file" />{" "}
                </>
              )}
              <div className="item">
                <label htmlFor="">Payment Card Information</label>
              </div>

              <hr />
              <p>
                No card added. Please add your credit card information for
                seamless payments.
              </p>
              <div className="item ">
                <label htmlFor="">Card Number</label>
              </div>
              <div className="item pay">
                <input type="text" placeholder="Enter card number" />
              </div>
              <div
                className="item pay"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label htmlFor="">CVV</label>

                <label htmlFor="">Expiration Date</label>
              </div>
              <div className="item pay">
                <input type="text" placeholder="Enter CVV" />
                <input type="text" placeholder="MM/YY" />
              </div>
            </div>
          </div>
          <Link to="/account/user/:id" className="link">
            <div className="button-container">
              <button>Create</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Add;
