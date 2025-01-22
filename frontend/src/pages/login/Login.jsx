import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LoginComponent } from "../../components";
import newRequest from "../../utils/newRequest";
import "../../components/login/Login.scss";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [is2FA, setIs2FA] = useState(false); // To handle 2FA step
  const [mfaCode, setMfaCode] = useState(""); // To handle 6-digit 2FA code
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { email: username, password: password };
    console.log('Request data:', requestData)

    try {
      const response = await newRequest.post("/login", {
        email: username,
        password: password  // explicitly include password
      });

      if (response.status === 200) {
        // Login successful without 2FA
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate("/");
      } else if (response.status === 403 && response.data["2fa_required"]) {
        // 2FA required
        setIs2FA(true);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  const handle2FAValidation = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post(`/mfa/validate`, null, {
        params: { username, code: mfaCode },
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify({
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          accountType: response.data.accountType,
          profilePicture: response.data.profilePicture
        }));
        navigate("/");
      } else {
        throw new Error("Invalid MFA code");
      }
    } catch (err) {
      setError(err.response?.data?.message || "MFA validation failed");
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
                // Google login logic here
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
            <input
              type="text"
              id="mfaCode"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />
          </div>
        )}
        
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
