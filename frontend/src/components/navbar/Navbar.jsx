import { useState, useEffect } from "react";
import "./Navbar.scss";
import logo from "../../assets/Logo.png";
import defaultAvatar from "../../assets/user.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActivePath = ![
    "/",
    "/add",
    "/account",
    "/auth/signup",
    "/auth/login",
  ].includes(pathname);

  useEffect(() => {
    const handleUserDataUpdate = (event) => {
      const userData = event.detail;
      console.log("User data received from event:", userData);
      if (userData) {
        setCurrentUser({
          id: userData.id || null,
          username: userData.fullName,
          email: userData.email,
          isMusician: userData.accountType === "MUSICIAN",
          profilePicture: userData.profilePicture
        });
      }
    };

    // Log stored user data on component mount
    const storedUserData = localStorage.getItem("currentUser");
    console.log("Stored user data:", storedUserData);

    if (storedUserData) {
      try {
        const user = JSON.parse(storedUserData);
        console.log("Parsed user data:", user);
        setCurrentUser({
          id: user.id || null,
          username: user.fullName,
          email: user.email,
          isMusician: user.accountType === "MUSICIAN",
          profilePicture: user.profilePicture
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  const isActive = () => {
    setActive(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setShowLogoutModal(false);
    setCurrentUser(null);
    navigate("/auth/login");
  };

  const getProfilePicture = () => {
    return currentUser?.profilePicture || defaultAvatar;
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
            <>
              <Link to="/orders" className="link">Orders</Link>
              <Link to="/myGigs" className="link">
                <span>{currentUser.isMusician ? "Gigs" : "Events"}</span>
              </Link>
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src={getProfilePicture()}
                  alt="Profile"
                  className="profile-picture"
                />
                <span>{currentUser.username}</span>

                {open && (
                  <div className="options">
                    <Link to="/account/me" className="link">Edit Account</Link>
                    <Link to="/messages" className="link">Messages</Link>
                    <Link to="/payments" className="link">Payments</Link>
                    <span
                      className="link logout-text"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      Log out
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
          {!currentUser && (
            <>
              <Link to="/auth/login" className="link">Sign In</Link>
              <Link to="/auth/signup" className="link">
                <button>Join Us</button>
              </Link>
            </>
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