import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LoginComponent } from "../../components";
import newRequest from "../../utils/newRequest";
import accRequest from "../../utils/generalRequest"
import "../../components/login/Login.scss";
import axios from "axios";

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

      // Ensure stringify works
      try {
        const serializedUserData = JSON.stringify(userData);
        localStorage.setItem("currentUser", serializedUserData);
        console.log("Successfully saved to localStorage:", serializedUserData);
      } catch (stringifyError) {
        console.error("Error stringifying user data:", stringifyError);
      }

      // Dispatch event
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
        localStorage.setItem("authToken", token);

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
        localStorage.setItem("authToken", token);

        const userData = await fetchAndSaveCurrentUser(token);
        console.log("User data retrieved after good MFA:", userData);

        navigate("/");
      } else {
        throw new Error("Invalid MFA code");
      }
    } catch (err) {
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
            <GoogleLogin
              onSuccess={(response) => {
                console.log("Google login response:", response);
              }}
              onError={() => setError("Google login failed")}
            />
            <Link to="/" className="link">
              I forgot my password
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
