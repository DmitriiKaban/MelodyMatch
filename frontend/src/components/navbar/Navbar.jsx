import { useState, useEffect } from "react";
import "./Navbar.scss";
import logo from "../../assets/Logo.png";
import userMusician from "../../assets/Musician.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActivePath = ![
    "/",
    "/add",
    "/account",
    "/auth/signup",
    "/auth/login",
  ].includes(pathname);

  const isActive = () => {
    console.log("Scroll Y:", window.scrollY);
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  let currentUser = {
    id: 1,
    username: "Matei Basarab",
    isMusician: false,
  };

  // currentUser = null;

  return (
    <div className={active || isActivePath ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <img src={logo} alt="Logo" />
            <span className="text1">T</span>
            <span className="text2">Unify</span>
          </Link>
        </div>
        <div className="links">
          <Link to="/gigs?genre=all" className="link">
            Explore
          </Link>
          {!currentUser?.isMusician && (
            <Link to="/auth/signup" className="link">
              Become a Musician
            </Link>
          )}
          {currentUser && (
            <Link to="/orders" className="link">
              Orders
            </Link>
          )}
          {!currentUser && (
            <>
              <Link to="/auth/login" className="link">
                Sign In
              </Link>
              <Link to="/auth/signup" className="link">
                <button>Join Us</button>
              </Link>
            </>
          )}
          {currentUser && (
            <Link to="/myGigs" className="link">
              <span>{currentUser.isMusician ? "Gigs" : "Events"}</span>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={userMusician} alt="" />
              <span>{currentUser.username}</span>

              {open && (
                <div className="options">
                  <Link to="/account" className="link">
                    Edit Account
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link to="/payments" className="link">
                    Payments
                  </Link>
                  <Link to="/auth/login" className="link">
                    Log out
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
