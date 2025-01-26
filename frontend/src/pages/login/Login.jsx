import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LoginComponent } from "../../components";
import newRequest from "../../utils/newRequest";
import accRequest from "../../utils/generalRequest"
import "../../components/login/Login.scss";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [is2FA, setIs2FA] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const navigate = useNavigate();

  const fetchAndSaveCurrentUser = async (token) => {
    try {
      console.log("Attempting to fetch user with token:", token);

      const response = await accRequest.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const userData = response.data;
      console.log("Full response data:", response);
      console.log("Fetched user data:", userData);

      try {
        const serializedUserData = JSON.stringify(userData);
        localStorage.setItem("currentUser", serializedUserData);
        console.log("Successfully saved to localStorage:", serializedUserData);
      } catch (stringifyError) {
        console.error("Error stringifying user data:", stringifyError);
      }

      const event = new CustomEvent('userDataUpdated', { detail: userData });
      window.dispatchEvent(event);

      return userData;
    } catch (err) {
      console.error("COMPLETE fetch error:", err);
      console.error("Error response:", err.response);
      console.error("Error message:", err.message);
      throw err;
    }
  };
  const handleOAuthCallback = async (provider, code) => {
    try {
      const tokenExchangeUrl = `/oauth2/token/${provider}?code=${code}`; // Backend route to exchange code for token
      const response = await accRequest.get(tokenExchangeUrl);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);

        const userData = await fetchAndSaveCurrentUser(token);
        console.log("User data retrieved via OAuth:", userData);

        navigate("/");
      } else {
        throw new Error("Failed to authenticate with OAuth provider.");
      }
    } catch (err) {
      console.error("OAuth callback error:", err);
      setError("OAuth login failed. Please try again.");
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      let redirectUri = "";
      const clientId = {
        google: import.meta.env.GOOGLE_ID,
        github: import.meta.env.GITHUB_ID,
        facebook: import.meta.env.FACEBOOK_ID
      };

      // OAuth Provider URLs
      if (provider === "google") {
        redirectUri = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId.google}&redirect_uri=http://localhost:8081/login/oauth2/code/google&response_type=code&scope=email%20profile`;
      } else if (provider === "github") {
        redirectUri = `https://github.com/login/oauth/authorize?client_id=${clientId.github}&redirect_uri=http://localhost:8081/login/oauth2/code/github&scope=read:user`;
      } else if (provider === "facebook") {
        redirectUri = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${clientId.facebook}&redirect_uri=http://localhost:8081/login/oauth2/code/facebook&scope=email,public_profile`;
      }

      // Redirect user to the OAuth provider's login page
      window.location.href = redirectUri;
    } catch (err) {
      console.error("Error during OAuth login:", err);
      setError("Failed to initiate OAuth login. Please try again.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await newRequest.post("/login", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);

        const mfaStates = JSON.parse(localStorage.getItem("mfaStates")) || {};
        const isMFAEnabled = mfaStates[username] || false;

        if (isMFAEnabled) {
          setIs2FA(true);
          return;
        }

        const userData = await fetchAndSaveCurrentUser(token);
        console.log("User data retrieved:", userData);

        navigate("/");
      }
    } catch (err) {
      if (err.response?.status === 403 || err.response?.data?.["2fa_required"]) {
        console.log("2FA required, switching to 2FA form...");
        setIs2FA(true);
      } else {
        setError(
          err.response?.data?.message ||
          err.message ||
          "An error occurred during login"
        );
      }
    }
  };

  const handle2FAValidation = async (e) => {
    e.preventDefault();
    setError(null);


    try {
      console.log("Starting 2FA validation...");
      console.log("Username:", username);
      console.log("MFA Code:", mfaCode);

      const response = await newRequest.post("/mfa/validate", null, {
        params: {
          username: username,
          code: mfaCode,
        },
      });

      console.log("Full 2FA Response:", response);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);

        const userData = await fetchAndSaveCurrentUser(token);
        console.log("User data retrieved after good MFA:", userData);

        navigate("/");
      } else {
        throw new Error("Invalid MFA code");
      }
    } catch (err) {

      console.error("Error Response Data:", err.response?.data);
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="login">
      <form onSubmit={is2FA ? handle2FAValidation : handleSubmit}>
        {!is2FA && (
          <>
            <LoginComponent
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
            <div className="oauth-buttons">
              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                className="oauth-button google"
              >
                Login with Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin("github")}
                className="oauth-button github"
              >
                Login with GitHub
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin("facebook")}
                className="oauth-button facebook"
              >
                Login with Facebook
              </button>
            </div>
            <Link to="/auth/signup" className="link">
              Don't have an account?
            </Link>
          </>
        )}
        {is2FA && (
          <div className="mfa-container">
            <label htmlFor="mfaCode">Enter your 2FA code:</label>
            <p>Check the code sent on your Passwords App.</p>
            <input
              type="text"
              id="mfaCode"
              value={mfaCode}
              placeholder="123456"
              onChange={(e) => setMfaCode(e.target.value)}
            />
            <button type="submit" className="button-85">
              Verify Code
            </button>
          </div>
        )}
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
