import { useRef, useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Add.scss";
import { Banner } from "../../components";
import { sanitizeInput } from "../../utils/sanitize";

const Create = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");

    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser({
        id: user.id,
        username: user.fullName,
        email: user.email,
        isMusician: user.accountType === "MUSICIAN",
        profilePicture: user.profilePicture
      });

    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  const [checked, setChecked] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const formRef = useRef(null);

  const userIsMusician = currentUser?.isMusician;

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckboxChange = async () => {
    const updatedChecked = !checked;
    setChecked(updatedChecked);

    if (updatedChecked) {
      try {
        const response = await fetch(
          `http://localhost:8081/auth/qr/generate?username=${encodeURIComponent(currentUser.email)}`,
          {
            method: "GET",
            headers: {
              Accept: "image/png",
            },
          }
        );

        if (response.ok) {
          const qrCodeBlob = await response.blob();
          const imageUrl = URL.createObjectURL(qrCodeBlob);
          setQrCode(imageUrl);

          // Save MFA state for the specific user
          const mfaStates = JSON.parse(localStorage.getItem("mfaStates")) || {};
          mfaStates[currentUser.email] = true; // Save the MFA state for the current user
          localStorage.setItem("mfaStates", JSON.stringify(mfaStates));
          console.log(`MFA state saved for ${currentUser.email}: true`);
        } else {
          console.error("Failed to generate QR code. Status:", response.status);
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    } else {
      setQrCode(null);

      // Update MFA state for the specific user
      const mfaStates = JSON.parse(localStorage.getItem("mfaStates")) || {};
      mfaStates[currentUser.email] = false; // Update the MFA state for the current user
      localStorage.setItem("mfaStates", JSON.stringify(mfaStates));
      console.log(`MFA state saved for ${currentUser.email}: false`);
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
