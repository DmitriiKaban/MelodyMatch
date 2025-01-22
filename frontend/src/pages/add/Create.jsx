import { useRef, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./Add.scss";
import { Banner } from "../../components";
import { sanitizeInput } from "../../utils/sanitize";
import newRequest from "../../utils/newRequest";

const currentUser = {
  id: 1,
  username: "killnobb@gmail.com",
  isMusician: true,
};

const Create = () => {
  const [checked, setChecked] = useState(false);
  const [qrCode, setQrCode] = useState(null);  // Store the QR code URL
  const formRef = useRef(null);
  const userIsMusician = currentUser.isMusician;

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckboxChange = async () => {
    setChecked(!checked);
    if (!checked) {
      try {
        // Use axios to send the POST request
        const response = await newRequest.post(`/qr/generate?username=${currentUser.username}`);
        
        if (response.status === 200) {
          const data = response.data; // Assuming response contains the QR code URL
          setQrCode(data.qrCodeUrl);  // Set the QR code URL to state
        } else {
          console.error("Failed to generate QR code");
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    } else {
      setQrCode(null);  // Clear QR code if unchecked
    }
  };

  return (
    <>
      <div className="banner">
        <Banner
          title={sanitizeInput(
            `Hop on your personal ${userIsMusician ? "Musician" : "Organizer"} account!`
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
                    <option value="">{sanitizeInput("Select work experience")}</option>
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
            </div>

            <div className="details">
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
                    <label htmlFor="">{sanitizeInput("Upload your resume")}</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <input type="file" />
                </>
              )}

              <div className="item">
                <label htmlFor="">{sanitizeInput("Add Two-Factor Authentication")}</label>
                <div className="checkbox-wrapper-9">
                  <input
                    className="tgl tgl-flat"
                    id="cb4-9"
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="tgl-btn" htmlFor="cb4-9"></label>
                </div>
              </div>
              <hr />
              <p>Once you check it, add us on your Google Accounts via a generated QR Code!</p>

              {qrCode && (
                <div className="qr-code-container">
                  <img src={qrCode} alt="QR Code" />
                  <p>Scan this QR code with Google Authenticator</p>
                </div>
              )}
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
