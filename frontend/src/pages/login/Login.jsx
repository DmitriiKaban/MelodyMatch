import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LoginComponent } from "../../components";
import "../../components/login/Login.scss";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockUser = { id: 1, username: "Matei Basarab", token: "mockToken" };
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
    navigate("/");
  };

  const handleGoogleSuccess = (response) => {
    const mockGoogleUser = {
      id: 1,
      username: "googleUser",
      token: "mockGoogleToken",
    };
    localStorage.setItem("currentUser", JSON.stringify(mockGoogleUser));
    navigate("/");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <LoginComponent />
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google login failed")}
        />
        <Link to="/" className="link">
          I forgot my password
        </Link>
      </form>
    </div>
  );
};

export default Login;
