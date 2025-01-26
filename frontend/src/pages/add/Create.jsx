import { useRef, useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Add.scss";
import { Banner } from "../../components";
import { sanitizeInput } from "../../utils/sanitize";
import accRequest from "../../utils/generalRequest"
import imageCompression from "browser-image-compression";

const Create = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");


    console.log("All localStorage items:", {
      token: localStorage.getItem("token"),
      currentUser: localStorage.getItem("currentUser")
    });

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const updateName = async () => {
    try {
      const response = await accRequest.post(
        "/update-name",
        { name }, // Or `name` if raw string is needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Assuming the response indicates success
      if (response.status !== 200) {
        throw new Error("Failed to update name.");
      }

      const sanitizedName = name.replace(/^"|"$/g, ""); // Remove extra quotes
      const updatedUser = {
        ...currentUser,
        fullName: sanitizedName, // Updated name
        isMusician: currentUser?.isMusician, // Ensure isMusician is preserved
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      // Dispatch the custom event
      const event = new CustomEvent('userDataUpdated', {
        detail: updatedUser, // Pass updated user data in event
      });
      window.dispatchEvent(event);

      alert("Name updated successfully!");
    } catch (error) {
      console.error("Full Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      alert("Failed to update name.");
    }
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) {
      alert("Please select a profile picture to upload.");
      return;
    }

    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 100,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(profilePicture, options);
      const formData = new FormData();
      formData.append("profilePicture", compressedFile);

      const response = await accRequest.post("/upload-pfp", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedUser = { ...currentUser, profilePicture: compressedFile };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Full upload error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(`Upload failed: ${error.message}`);
    }
  };


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

      const mfaStates = JSON.parse(localStorage.getItem("mfaStates")) || {};
      mfaStates[currentUser.email] = false;
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
          <h1>{sanitizeInput("Edit Account")}</h1>
          <div className="sections">
            <div className="info">
              <div className="item">
                <label htmlFor="">
                  {sanitizeInput(userIsMusician ? "Name" : "Organization Name")}
                </label>
                <button type="button" onClick={updateName} style={{
                  all: "unset",
                  cursor: "pointer",
                }}
                > <img src="/img/icons/Edit.png" alt="" />  </button>
              </div>
              <hr />
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder={sanitizeInput(
                  currentUser?.isMusician ? "Enter your name" : "Enter organization name"
                )}
              />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Email")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="email"
                placeholder={"Enter new email"}
              />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Profile Picture")}</label>
                <button type="button" onClick={uploadProfilePicture} style={{
                  all: "unset",
                  cursor: "pointer",
                }}
                > <img src="/img/icons/Edit.png" alt="" /> </button>
              </div>
              <hr />
              <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />


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
