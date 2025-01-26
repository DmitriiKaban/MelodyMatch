import { Link } from "react-router-dom";
import "./Login.scss";
import logo from "../../assets/Logo.png";

const LoginComponent = ({ username, setUsername, password, setPassword }) => {
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
        value={username}
        placeholder="john.doe@gmail.com"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="">Password</label>
      <input
        name="password"
        type="password"
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="signin button-85">
        Sign In
      </button>
    </>
  );
};

export default LoginComponent;