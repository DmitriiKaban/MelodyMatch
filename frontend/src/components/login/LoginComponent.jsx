import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import logo from "../../assets/Logo.png";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <>
      <div className="top">
        <img src={logo} alt="" />
        <h1>Welcome back!</h1>
        <span>Sign In</span>
      </div>
      <label htmlFor="">Email</label>
      <input
        name="username"
        type="text"
        placeholder="john.doe@gmail.com"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="">Password</label>
      <input
        name="password"
        type="password"
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="signin button-85">
        Sign In
      </button>
      <Link to="/auth/signup" className="link account">
        <button type="submit">Don't have an account?</button>
      </Link>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default LoginComponent;
