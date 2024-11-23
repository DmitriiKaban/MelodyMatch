import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { sanitizeInput } from "../../utils/sanitize";
import "./Add.scss";
import { Banner } from "../../components";

const currentUser = {
  id: 1,
  username: "Matei Basarab",
  isMusician: false,
};

const Create = () => {
  const formRef = useRef(null);
  const userIsMusician = currentUser.isMusician;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    genres: "",
    description: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
  });

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value), // Sanitize input before saving to state
    });
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
                <label htmlFor="name">
                  {userIsMusician ? "Name" : "Organization Name"}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="name"
                placeholder={
                  userIsMusician ? "Enter your name" : "Enter organization name"
                }
                value={formData.name}
                onChange={handleInputChange} // Handle input change with sanitization
              />

              <div className="item">
                <label htmlFor="email">Email</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="profilePicture">Profile Picture</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" name="profilePicture" />

              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="workExperience">Work Experience</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <select
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleInputChange}
                  >
                    <option value="">Select work experience</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                  </select>
                </>
              )}

              <div className="item">
                <label htmlFor="location">Location</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="genres">Interested in</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select
                name="genres"
                value={formData.genres}
                onChange={handleInputChange}
              >
                <option value="">Select the genres</option>
                <option value="jazz">Jazz</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
              </select>
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="description">Short Description</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                name="description"
                placeholder={`${
                  userIsMusician
                    ? "Short description about yourself"
                    : "Short description about your brand"
                }`}
                cols="30"
                rows="10"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>

              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="resume">Upload your resume</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <input type="file" name="resume" />
                </>
              )}

              <div className="item">
                <label htmlFor="cardNumber">Card Number</label>
              </div>
              <hr />
              <input
                type="text"
                name="cardNumber"
                placeholder="Enter card number"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />

              <div
                className="item pay"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label htmlFor="cvv">CVV</label>
                <label htmlFor="expirationDate">Expiration Date</label>
              </div>
              <div className="item pay">
                <input
                  type="text"
                  name="cvv"
                  placeholder="Enter CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="expirationDate"
                  placeholder="MM/YY"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                />
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

export default Create;
