import React, { useState } from "react";
import "./Signup.scss";
import logo from "../../assets/Logo.png";
import newRequest from "../../utils/newRequest";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    isMusician: false,
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectRole = (role) => {
    setUser((prev) => ({
      ...prev,
      isMusician: role === "musician",
    }));
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/signup", { ...user });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const idToken = response.credential;
    try {
      const res = await newRequest.post("/auth/google-login", { idToken });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <img src={logo} alt="" />
        <h1>Thank you for choosing us</h1>
        <span>Sign Up</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="left">
            <label>Are you an organization or musician?</label>
            <div className="dropdown">
              <input
                type="text"
                readOnly
                value={user.isMusician ? "Musician" : "Organizer"}
                className="dropdown-input"
                onClick={toggleDropdown}
              />
              <button
                type="button"
                className="arrow-button"
                onClick={toggleDropdown}
              >
                <img src="/img/icons/Down_Arrow_3_.png" alt="Arrow" />
              </button>
              {open && (
                <div className="dropdown-options">
                  <button type="button" onClick={() => selectRole("musician")}>
                    Musician
                  </button>
                  <button type="button" onClick={() => selectRole("organizer")}>
                    Organizer
                  </button>
                </div>
              )}
            </div>
            <label>Name</label>
            <input
              name="username"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="right">
            <label>Password</label>
            <input name="password" type="password" onChange={handleChange} />
            <label>Repeat Password</label>
            <input
              name="repeatPassword"
              type="password"
              onChange={handleChange}
            />
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed")}
            />
          </div>
        </div>
        <button type="submit" className="button-85">
          Register
        </button>
        <Link to="/auth/login" className="link account">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
