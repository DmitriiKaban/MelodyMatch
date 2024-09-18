import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LoginComponent } from "../../components";
import "../../components/login/Login.scss";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
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
    <div className="login">
      <form onSubmit={handleSubmit}>
        <LoginComponent />
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={(error) => setError("Google login failed")}
        />
        <Link to="/" className="link">
          I forgot my password
        </Link>
      </form>
    </div>
  );
};

export default Login;
