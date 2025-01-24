import React, { useState, useEffect } from "react";
import "./Signup.scss";
import logo from "../../assets/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import newRequest from "../../utils/newRequest";

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

    if (user.password !== user.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await newRequest.post("/signup", {
        email: user.email,
        password: user.password,
        fullName: user.username,
        accountType: user.isMusician ? "musician" : "organizer",
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        const userData = {
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          accountType: response.data.accountType,
          profilePicture: response.data.profilePicture,
          token: response.data.token,
        };

        localStorage.setItem("currentUser", JSON.stringify(userData));

        window.dispatchEvent(
          new CustomEvent("userDataUpdated", {
            detail: userData,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  const handleOAuthSuccess = async (provider, profile) => {
    try {
      const { email, name } = profile;

      const redirectUrl = `/select-account-type?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(name)}&provider=${encodeURIComponent(
        provider
      )}`;

      // Redirect to backend endpoint for account type selection
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      setError(`${provider} login failed. Please try again.`);
    }
  };

  const handleGoogleSuccess = (response) => {
    const profile = {
      email: response.profileObj.email,
      name: response.profileObj.name,
    };
    handleOAuthSuccess("GOOGLE", profile);
  };

  const handleGitHubLogin = () => {
    // Redirect to GitHub OAuth authorization endpoint
    const githubOAuthUrl = "https://github.com/login/oauth/authorize";
    const clientId = "YOUR_GITHUB_CLIENT_ID"; // Replace with your GitHub Client ID
    const redirectUri = `${window.location.origin}/auth/github/callback`; // Replace with your redirect URI

    window.location.href = `${githubOAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  const handleFacebookLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'email,name' }, (profile) => {
          handleOAuthSuccess('FACEBOOK', {
            email: profile.email,
            name: profile.name
          });
        });
      } else {
        setError('Facebook login failed');
      }
    }, { scope: 'email,public_profile' });
  };

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/ro_RO/sdk.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          window.FB.init({
            appId: 'YOUR_FACEBOOK_APP_ID',
            cookie: true,
            xfbml: true,
            version: 'v22.0'
          });
        };
        document.body.appendChild(script);
      }
    };

    loadFacebookSDK();
  }, []);

  return (
    <div className="register">
      <div className="top">
        <img src={logo} alt="Logo" />
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
              placeholder="johndoe@gmail.com"
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
            <div className="google-login-container">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed")}
              />
            </div>
            <div className="social-logins">
              <button type="button" onClick={handleGitHubLogin}>
                Login with GitHub
              </button>
            </div>

            <div className="fb-login-button"
              data-width="250"
              data-size=""
              data-button-type=""
              data-layout=""
              data-auto-logout-link="false"
              data-use-continue-as="false"
              onClick={handleFacebookLogin}>
            </div>

          </div>
        </div>
        <button type="submit" className="button-85">
          Register
        </button>
        {error && <p className="error">{error}</p>}
        <Link to="/auth/login" className="link account">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
