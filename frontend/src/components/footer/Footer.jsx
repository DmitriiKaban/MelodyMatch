import "./Footer.scss";

import logo from "../../assets/Logo.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <div className={pathname !== "/"  ? "footer active" : "footer"}>
      <div className="container">
        <div className="top">
          <div className="left">
            <div className="item">
              <h2>About</h2>
              <span>Partnerships</span>
              <span>Privacy Policy</span>
              <span>Intelectual Property Claim</span>
            </div>
            <div className="item">
              <h2>Support</h2>
              <span>Help and Support</span>
              <span>Contact Us</span>
              <span>Trust and Safety</span>
            </div>
            <div className="item">
              <h2>Community</h2>
              <span>Community Guidelines</span>
              <span>Invite a friend</span>
              <span>Frequent Questions</span>
            </div>
          </div>
          <div className="right">
            <img src="/img/icons/social.png" alt="" />
          </div>
        </div>
        <hr />
        <div className="bottom">
          <span className="copy">Copyright 2024</span>
          <img src={logo} alt="" />
          <span>
            {" "}
            <span style={{ color: "#bc11b0" }}>T</span>
            Unify
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
