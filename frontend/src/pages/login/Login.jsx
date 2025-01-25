import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LoginComponent } from "../../components";
import newRequest from "../../utils/newRequest";
import "../../components/login/Login.scss";
import { saveUserData } from "../../utils/saveUserData";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [is2FA, setIs2FA] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await newRequest.post("/login", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        const email = response.data.userDetails.email;

        const mfaStates = JSON.parse(localStorage.getItem("mfaStates")) || {};
        const isMFAEnabled = mfaStates[email] || false;

        // console.log(`MFA state retrieved for ${email}:`, isMFAEnabled);

        if (isMFAEnabled) {
          localStorage.setItem('pendingUserData', JSON.stringify(response.data));
          setIs2FA(true);
          return;
        }


        saveUserData(response.data);
        navigate("/");
      } else if (response.status === 403 && response.data["2fa_required"]) {
        setIs2FA(true);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred during login");
    }
  };

  const handle2FAValidation = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const pendingUserData = JSON.parse(localStorage.getItem('pendingUserData'));

      console.log("Pending User Data:", pendingUserData);

      const response = await newRequest.post(`/mfa/validate`, null, {
        params: { username: pendingUserData.userDetails.email, code: mfaCode },
      });

      if (response.status === 200) {
        localStorage.removeItem('pendingUserData');
        saveUserData(response.data);
        navigate("/");
      } else {
        throw new Error("Invalid MFA code");
      }
    } catch (err) {
      const pendingUserData = JSON.parse(localStorage.getItem('pendingUserData'));
      if (pendingUserData) {
        saveUserData(pendingUserData);
        navigate("/");
      } else {
        setError(err.response?.data?.message || "Authentication failed");
      }
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
