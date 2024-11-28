import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Add.scss";
import { Banner } from "../../components";
import { sanitizeInput } from "../../utils/sanitize";

const currentUser = {
  id: 1,
  username: "Matei Basarab",
  isMusician: false,
};

const Create = () => {
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
          title={sanitizeInput(
            `Hop on your personal ${
              userIsMusician ? "Musician" : "Organizer"
            } account!`
          )}
          subtitle1={sanitizeInput("This is your General Information.")}
          subtitle2={sanitizeInput("Complete the form below:")}
          scrollToForm={scrollToForm}
        />
      </div>
      <div className="add" ref={formRef}>
        <div className="container">
          <h1>{sanitizeInput("Create Account")}</h1>
          <div className="sections">
            <div className="info">
              <div className="item">
                <label htmlFor="">
                  {sanitizeInput(userIsMusician ? "Name" : "Organization Name")}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={sanitizeInput(
                  userIsMusician ? "Enter your name" : "Enter organization name"
                )}
              />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Email")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="email"
                placeholder={sanitizeInput("Enter your email")}
              />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Profile Picture")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" />

              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="">{sanitizeInput("Work Experience")}</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <select>
                    <option value="">
                      {sanitizeInput("Select work experience")}
                    </option>
                    <option value="1">{sanitizeInput("1 year")}</option>
                    <option value="2">{sanitizeInput("2 years")}</option>
                    <option value="3">{sanitizeInput("3 years")}</option>
                  </select>
                </>
              )}

              <div className="item">
                <label htmlFor="">{sanitizeInput("Location")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={sanitizeInput("Enter your location")}
              />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Interested in")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select>
                <option value="">{sanitizeInput("Select the genres")}</option>
                <option value="jazz">{sanitizeInput("Jazz")}</option>
                <option value="rock">{sanitizeInput("Rock")}</option>
                <option value="pop">{sanitizeInput("Pop")}</option>
              </select>
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="">{sanitizeInput("Short Description")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                placeholder={sanitizeInput(
                  userIsMusician
                    ? "Short description about yourself"
                    : "Short description about your brand"
                )}
                cols="30"
                rows="10"
              ></textarea>
              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="">
                      {sanitizeInput("Upload your resume")}
                    </label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <input type="file" />
                </>
              )}
              <div className="item">
                <label htmlFor="">
                  {sanitizeInput("Payment Card Information")}
                </label>
              </div>

              <hr />
              <p>
                {sanitizeInput(
                  "No card added. Please add your credit card information for seamless payments."
                )}
              </p>
              <div className="item ">
                <label htmlFor="">{sanitizeInput("Card Number")}</label>
              </div>
              <div className="item pay">
                <input
                  type="text"
                  placeholder={sanitizeInput("Enter card number")}
                />
              </div>
              <div
                className="item pay"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label htmlFor="">{sanitizeInput("CVV")}</label>
                <label htmlFor="">{sanitizeInput("Expiration Date")}</label>
              </div>
              <div className="item pay">
                <input type="text" placeholder={sanitizeInput("Enter CVV")} />
                <input type="text" placeholder={sanitizeInput("MM/YY")} />
              </div>
            </div>
          </div>
          <Link to="/account/user/:id" className="link">
            <div className="button-container">
              <button>{sanitizeInput("Create")}</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Create;
