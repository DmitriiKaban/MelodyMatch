import { useState, useEffect } from "react";
import "./Navbar.scss";
import logo from "../../assets/Logo.png";
import userMusician from "../../assets/Musician.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    username: "Matei Basarab",
    isMusician: true,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActivePath = ![
    "/",
    "/add",
    "/account",
    "/auth/signup",
    "/auth/login",
  ].includes(pathname);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/auth/login");
    setCurrentUser(null);
  };

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
                  <span
                    className="link logout-text"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Log out
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
            <h2>Are you sure you want to log out?</h2>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="agreed">
                Yes, log out
              </button>
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
